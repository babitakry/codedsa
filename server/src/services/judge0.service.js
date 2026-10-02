import dotenv from 'dotenv';
import path from 'path';

// Load environment variables if not already loaded
dotenv.config();

const DEFAULT_CE_URL = 'https://ce.judge0.com';
const RAPIDAPI_CE_URL = 'https://judge0-ce.p.rapidapi.com';

export const getJudgeConfig = () => {
  const customUrl = process.env.JUDGE0_API_URL;
  const apiKey = process.env.JUDGE0_API_KEY || '';
  const apiHost = process.env.JUDGE0_API_HOST || 'judge0-ce.p.rapidapi.com';

  // If customUrl is specified, use that
  let apiUrl = customUrl || (apiKey ? RAPIDAPI_CE_URL : DEFAULT_CE_URL);
  apiUrl = apiUrl.replace(/\/+$/, '');

  return { apiUrl, apiKey, apiHost };
};

// Judge0 Language IDs mapping
export const LANGUAGE_IDS = {
  cpp: 54,        // C++ (GCC 9.2.0)
  'c++': 54,
  c: 50,          // C (GCC 9.2.0)
  python: 71,     // Python (3.8.1)
  python3: 71,
  py: 71,
  javascript: 63, // JavaScript (Node.js 12.14.0)
  js: 63,
  node: 63,
  java: 62,       // Java (OpenJDK 13.0.1)
  typescript: 74, // TypeScript (3.7.4)
  ts: 74,
};

export const getLanguageId = (lang) => {
  if (!lang) return 63; // default javascript
  if (typeof lang === 'number') return lang;
  const normalized = lang.toString().trim().toLowerCase();
  return LANGUAGE_IDS[normalized] || 63;
};

// Base64 Helpers
export const encodeBase64 = (str) => {
  if (str === null || str === undefined) return '';
  return Buffer.from(String(str), 'utf-8').toString('base64');
};

export const decodeBase64 = (str) => {
  if (!str) return '';
  try {
    return Buffer.from(str, 'base64').toString('utf-8');
  } catch {
    return str;
  }
};

const getHeaders = (useRapidApi = true) => {
  const { apiKey, apiHost } = getJudgeConfig();
  const headers = {
    'Content-Type': 'application/json',
  };
  if (useRapidApi && apiKey) {
    headers['x-rapidapi-key'] = apiKey;
    if (apiHost) {
      headers['x-rapidapi-host'] = apiHost;
    }
  }
  return headers;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Pre-processes code to ensure standard competitive programming headers and entry points exist
 */
export const prepareSourceCode = (language, code) => {
  if (!code) return '';
  const lang = language ? language.toString().toLowerCase().trim() : '';

  if (lang === 'cpp' || lang === 'c++' || lang === 'c') {
    let prepared = code;
    // If standard includes are missing, add them
    if (!prepared.includes('#include <iostream>') && !prepared.includes('#include<iostream>')) {
      prepared = `#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n#include <map>\n#include <unordered_map>\n#include <set>\n#include <unordered_set>\n#include <queue>\n#include <stack>\nusing namespace std;\n\n${prepared}`;
    } else if (!prepared.includes('using namespace std')) {
      prepared = `#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\n${prepared}`;
    }

    // If main function is missing (e.g. LeetCode style class Solution), add dummy main
    if (!prepared.includes('int main') && !prepared.includes('void main') && !prepared.includes('main(')) {
      prepared = `${prepared}\n\nint main() {\n    // Solution driver\n    return 0;\n}`;
    }
    return prepared;
  }

  if (lang === 'java') {
    let prepared = code;
    if (!prepared.includes('import java.util')) {
      prepared = `import java.util.*;\nimport java.io.*;\n\n${prepared}`;
    }
    if (!prepared.includes('public static void main') && !prepared.includes('static void main')) {
      if (prepared.includes('class Solution') && !prepared.includes('class Main')) {
        prepared = `${prepared}\n\nclass Main {\n    public static void main(String[] args) {\n        // Solution driver\n    }\n}`;
      }
    }
    return prepared;
  }

  return code;
};

import { wrapCodeForExecution } from './driverWrapper.service.js';

/**
 * Executes a single submission against Judge0
 */
export const executeSingleSubmission = async ({
  language,
  code,
  stdin = '',
  expectedOutput = '',
  cpuTimeLimit = 5,
  memoryLimit = 128000,
}) => {
  const languageId = getLanguageId(language);
  const finalCode = wrapCodeForExecution(language, code, stdin);

  const payload = {
    source_code: encodeBase64(finalCode),
    language_id: languageId,
    stdin: encodeBase64(stdin || ''),
    cpu_time_limit: cpuTimeLimit,
    memory_limit: memoryLimit,
  };

  if (expectedOutput) {
    payload.expected_output = encodeBase64(expectedOutput);
  }

  const { apiUrl, apiKey } = getJudgeConfig();

  // Try primary target first, and fall back to ce.judge0.com if rapidapi fails (401/429)
  const targets = [];
  if (apiKey) {
    targets.push({ url: apiUrl, useRapidApi: true });
  }
  // Always include public CE as primary (if no key) or fallback
  targets.push({ url: DEFAULT_CE_URL, useRapidApi: false });

  let lastError = null;

  for (const target of targets) {
    try {
      // Step 1: Submit with wait=true for fast synchronous completion
      const submitRes = await fetch(
        `${target.url}/submissions?base64_encoded=true&wait=true`,
        {
          method: 'POST',
          headers: getHeaders(target.useRapidApi),
          body: JSON.stringify(payload),
        }
      );

      if (!submitRes.ok) {
        const errText = await submitRes.text();
        // If 401 or 429, try next target (fallback to ce.judge0.com)
        if (submitRes.status === 401 || submitRes.status === 429) {
          lastError = new Error(`Judge0 target [${submitRes.status}]: ${errText}`);
          continue;
        }
        throw new Error(`Judge0 request failed [${submitRes.status}]: ${errText}`);
      }

      let result = await submitRes.json();

      // Step 2: If result is still processing (status.id < 3), poll for completion
      if (result.token && (!result.status || result.status.id < 3)) {
        const maxRetries = 12;
        let attempts = 0;

        while (attempts < maxRetries) {
          await sleep(1000);
          attempts++;

          const pollRes = await fetch(
            `${target.url}/submissions/${result.token}?base64_encoded=true&fields=*`,
            {
              method: 'GET',
              headers: getHeaders(target.useRapidApi),
            }
          );

          if (pollRes.ok) {
            result = await pollRes.json();
            if (result.status && result.status.id >= 3) {
              break;
            }
          }
        }
      }

      // Format & decode response
      const rawStdout = decodeBase64(result.stdout || '');
      const rawStderr = decodeBase64(result.stderr || '');
      const rawCompileOutput = decodeBase64(result.compile_output || '');
      const rawMessage = decodeBase64(result.message || '');

      const cleanStdout = rawStdout.trim();
      const cleanExpected = (expectedOutput || '').trim();

      let passed = false;
      let statusDescription = result.status?.description || 'Unknown';

      if (result.status?.id === 3) {
        // Judge0 says Accepted
        if (cleanExpected) {
          passed = cleanStdout === cleanExpected;
          if (!passed) {
            statusDescription = 'Wrong Answer';
          }
        } else {
          passed = true;
        }
      } else if (cleanExpected && cleanStdout === cleanExpected) {
        passed = true;
        statusDescription = 'Accepted';
      }

      return {
        token: result.token || null,
        statusId: result.status?.id || 3,
        status: statusDescription,
        stdout: rawStdout,
        stderr: rawStderr,
        compile_output: rawCompileOutput || rawMessage,
        time: result.time || '0.00',
        memory: result.memory || 0,
        passed,
        stdin,
        expectedOutput,
      };
    } catch (err) {
      lastError = err;
      console.warn(`Attempt with ${target.url} failed: ${err.message}. Trying fallback if available.`);
    }
  }

  // All targets failed
  console.error('All Judge0 targets failed:', lastError);
  return {
    token: null,
    statusId: 13,
    status: 'Internal Error',
    stdout: '',
    stderr: lastError?.message || 'Error communicating with Judge0 execution engine',
    compile_output: '',
    time: '0.00',
    memory: 0,
    passed: false,
    stdin,
    expectedOutput,
  };
};

/**
 * Runs code against multiple test cases and aggregates results
 */
export const executeBatchSubmissions = async ({ language, code, testCases = [] }) => {
  if (!testCases || testCases.length === 0) {
    testCases = [{ input: '', output: '' }];
  }

  // Execute all test cases concurrently
  const executionPromises = testCases.map(async (tc, index) => {
    const input = typeof tc === 'string' ? tc : (tc.input || '');
    const expected = typeof tc === 'string' ? '' : (tc.output || tc.expectedOutput || '');

    const res = await executeSingleSubmission({
      language,
      code,
      stdin: input,
      expectedOutput: expected,
    });

    return {
      testCaseNumber: index + 1,
      input,
      expectedOutput: expected,
      actualOutput: res.stdout,
      status: res.status,
      passed: res.passed,
      time: res.time,
      memory: res.memory,
      stderr: res.stderr,
      compile_output: res.compile_output,
    };
  });

  const results = await Promise.all(executionPromises);

  // Determine overall status
  let overallStatus = 'Accepted';
  let maxTime = '0.00';
  let maxMemory = 0;
  let compileError = '';
  let passedCount = 0;

  for (const r of results) {
    if (parseFloat(r.time) > parseFloat(maxTime)) {
      maxTime = r.time;
    }
    if (r.memory > maxMemory) {
      maxMemory = r.memory;
    }

    if (r.passed) {
      passedCount++;
    }

    if (r.compile_output && !compileError) {
      compileError = r.compile_output;
    }
  }

  if (compileError || results.some((r) => r.status.includes('Compilation Error'))) {
    overallStatus = 'Compilation Error';
  } else if (results.some((r) => r.status.includes('Time Limit Exceeded'))) {
    overallStatus = 'Time Limit Exceeded';
  } else if (results.some((r) => r.status.includes('Runtime Error'))) {
    overallStatus = 'Runtime Error';
  } else if (results.some((r) => r.status.includes('Memory Limit Exceeded'))) {
    overallStatus = 'Memory Limit Exceeded';
  } else if (passedCount < results.length) {
    overallStatus = 'Wrong Answer';
  } else {
    overallStatus = 'Accepted';
  }

  return {
    overallStatus,
    passedTestCases: passedCount,
    totalTestCases: results.length,
    runtime: maxTime,
    memory: maxMemory,
    compileOutput: compileError,
    results,
  };
};
