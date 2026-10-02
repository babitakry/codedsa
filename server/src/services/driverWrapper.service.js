/**
 * Helper utility to automatically wrap LeetCode-style class/functions with driver harnesses
 * so users can return values in memory (e.g. return {0, 1};) and have the server print the output
 */

export const parseInputTokens = (inputStr) => {
  if (!inputStr || typeof inputStr !== 'string') return [];

  const trimmed = inputStr.trim();
  if (!trimmed) return [];

  // 1. Check if formatted as named parameters: "nums = [2,7,11,15], target = 9"
  if (trimmed.includes('=')) {
    const parts = trimmed.split(/,\s*(?=[a-zA-Z_]\w*\s*=)/);
    const tokens = parts.map((part) => {
      const eqIdx = part.indexOf('=');
      if (eqIdx !== -1) {
        return part.slice(eqIdx + 1).trim();
      }
      return part.trim();
    });
    if (tokens.length > 0) return tokens;
  }

  // 2. Check newline separation: "[2,7,11,15]\n9"
  if (trimmed.includes('\n')) {
    return trimmed
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  // 3. Check JSON array of arguments or single value
  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed) && trimmed.startsWith('[[')) {
      return parsed.map((p) => JSON.stringify(p));
    }
  } catch {
    // not json
  }

  return [trimmed];
};

/**
 * Detects if user C++ code is a LeetCode-style class Solution
 */
const detectCppMethod = (code) => {
  if (!code.includes('class Solution') && !code.includes('struct Solution')) {
    return null;
  }

  // Regex to match a method inside Solution: returnType methodName(arg1, arg2...)
  const methodRegex =
    /(?:vector<[\w\s,<>]+>|int|long long|double|float|string|bool|void|TreeNode\*|ListNode\*)\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)/;
  const match = code.match(methodRegex);

  if (match) {
    const methodName = match[1];
    const rawArgs = match[2].trim();
    const args = rawArgs
      ? rawArgs.split(',').map((a) => {
        const parts = a.trim().split(/\s+/);
        const name = parts[parts.length - 1].replace(/[&*]/g, '');
        const type = parts.slice(0, -1).join(' ').replace(/[&*]/g, '').trim() || parts[0];
        return { name, type };
      })
      : [];
    return { methodName, args };
  }

  return null;
};

/**
 * Wraps C++ code with LeetCode test harness
 */
export const wrapCppCode = (userCode, inputStr) => {
  // If user already wrote their own main(), don't double wrap
  if (userCode.includes('int main') || userCode.includes('void main') || userCode.includes('main(')) {
    let prepared = userCode;
    if (!prepared.includes('#include <iostream>')) {
      prepared = `#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n#include <map>\n#include <unordered_map>\n#include <set>\n#include <unordered_set>\n#include <queue>\n#include <stack>\nusing namespace std;\n\n${prepared}`;
    }
    return prepared;
  }

  const methodInfo = detectCppMethod(userCode);
  const inputTokens = parseInputTokens(inputStr);

  const headerBlock = `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <map>
#include <unordered_map>
#include <set>
#include <unordered_set>
#include <queue>
#include <stack>
#include <sstream>
using namespace std;

// Result printer templates
template <typename T>
void printResult(const T& val) {
    cout << val << endl;
}

void printResult(bool val) {
    cout << (val ? "true" : "false") << endl;
}

template <typename T>
void printResult(const vector<T>& vec) {
    cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        cout << vec[i] << (i + 1 < vec.size() ? "," : "");
    }
    cout << "]" << endl;
}

template <typename T>
void printResult(const vector<vector<T>>& mat) {
    cout << "[";
    for (size_t i = 0; i < mat.size(); ++i) {
        cout << "[";
        for (size_t j = 0; j < mat[i].size(); ++j) {
            cout << mat[i][j] << (j + 1 < mat[i].size() ? "," : "");
        }
        cout << "]" << (i + 1 < mat.size() ? "," : "");
    }
    cout << "]" << endl;
}

// Helpers for input parsing
vector<int> parseVectorInt(string s) {
    vector<int> res;
    for (char& c : s) {
        if (c == '[' || c == ']' || c == ',') c = ' ';
    }
    stringstream ss(s);
    int num;
    while (ss >> num) {
        res.push_back(num);
    }
    return res;
}

vector<string> parseVectorString(string s) {
    vector<string> res;
    for (char& c : s) {
        if (c == '[' || c == ']' || c == ',' || c == '"' || c == '\\\'') c = ' ';
    }
    stringstream ss(s);
    string str;
    while (ss >> str) {
        res.push_back(str);
    }
    return res;
}
`;

  // Build arguments invocation
  let driverBody = '    Solution sol;\n';

  if (methodInfo && methodInfo.args.length > 0) {
    const callArgs = [];
    methodInfo.args.forEach((arg, idx) => {
      const token = inputTokens[idx] !== undefined ? inputTokens[idx] : '';
      const varName = `arg_${idx}`;

      if (arg.type.includes('vector<int>') || arg.type.includes('vector<long')) {
        const formattedArray = token.replace(/\[/g, '{').replace(/\]/g, '}');
        if (formattedArray.startsWith('{')) {
          driverBody += `    ${arg.type} ${varName} = ${formattedArray};\n`;
        } else {
          driverBody += `    ${arg.type} ${varName} = parseVectorInt("${token.replace(/"/g, '\\"')}");\n`;
        }
      } else if (arg.type.includes('vector<string>')) {
        driverBody += `    ${arg.type} ${varName} = parseVectorString("${token.replace(/"/g, '\\"')}");\n`;
      } else if (arg.type.includes('int') || arg.type.includes('long')) {
        const numVal = parseInt(token, 10) || 0;
        driverBody += `    ${arg.type} ${varName} = ${numVal};\n`;
      } else if (arg.type.includes('double') || arg.type.includes('float')) {
        const floatVal = parseFloat(token) || 0.0;
        driverBody += `    ${arg.type} ${varName} = ${floatVal};\n`;
      } else if (arg.type.includes('bool')) {
        const boolVal = token.toLowerCase() === 'true' || token === '1';
        driverBody += `    bool ${varName} = ${boolVal ? 'true' : 'false'};\n`;
      } else if (arg.type.includes('string')) {
        const cleanStr = token.replace(/^["']|["']$/g, '');
        driverBody += `    string ${varName} = "${cleanStr}";\n`;
      } else {
        driverBody += `    auto ${varName} = ${token || '0'};\n`;
      }

      callArgs.push(varName);
    });

    driverBody += `    auto res = sol.${methodInfo.methodName}(${callArgs.join(', ')});\n`;
    driverBody += `    printResult(res);\n`;
  } else if (methodInfo) {
    driverBody += `    auto res = sol.${methodInfo.methodName}();\n`;
    driverBody += `    printResult(res);\n`;
  } else {
    driverBody += `    // No method detected\n`;
  }

  driverBody += '    return 0;\n';

  return `${headerBlock}\n${userCode}\n\nint main() {\n${driverBody}}`;
};

/**
 * Wraps JavaScript code with LeetCode test harness
 */
export const wrapJavaScriptCode = (userCode, inputStr) => {
  const inputTokens = parseInputTokens(inputStr);

  const parsedArgsCode = inputTokens
    .map((token) => {
      try {
        JSON.parse(token);
        return token;
      } catch {
        return JSON.stringify(token);
      }
    })
    .join(', ');

  const wrapperHarness = `
${userCode}

// Automated LeetCode Output Driver
try {
  const args = [${parsedArgsCode}];
  let result;
  
  if (typeof Solution === 'function') {
    const sol = new Solution();
    const methods = Object.getOwnPropertyNames(Solution.prototype).filter(m => m !== 'constructor');
    if (methods.length > 0) {
      result = sol[methods[0]](...args);
    }
  } else if (typeof solve === 'function') {
    result = solve(...args);
  } else if (typeof twoSum === 'function') {
    result = twoSum(...args);
  } else {
    // Find first exported or defined user function
    const fnNames = Object.keys(globalThis).filter(k => typeof globalThis[k] === 'function' && !['fetch', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'structuredClone'].includes(k));
    if (fnNames.length > 0) {
      result = globalThis[fnNames[0]](...args);
    }
  }

  if (result !== undefined) {
    console.log(JSON.stringify(result));
  }
} catch (err) {
  console.error(err);
}
`;

  return wrapperHarness;
};

/**
 * Wraps Python code with LeetCode test harness
 */
export const wrapPythonCode = (userCode, inputStr) => {
  const inputTokens = parseInputTokens(inputStr);

  const parsedArgsCode = inputTokens
    .map((token) => {
      try {
        JSON.parse(token);
        return token;
      } catch {
        return JSON.stringify(token);
      }
    })
    .join(', ');

  const wrapperHarness = `
${userCode}

# Automated LeetCode Output Driver
import json
import sys

try:
    args = [${parsedArgsCode}]
    result = None
    if 'Solution' in globals():
        sol = Solution()
        methods = [m for m in dir(sol) if not m.startswith('__') and callable(getattr(sol, m))]
        if methods:
            func = getattr(sol, methods[0])
            result = func(*args)
    elif 'solve' in globals():
        result = solve(*args)
    elif 'twoSum' in globals():
        result = twoSum(*args)

    if result is not None:
        print(json.dumps(result))
except Exception as e:
    print(e, file=sys.stderr)
`;

  return wrapperHarness;
};

/**
 * Main dispatcher to prepare and wrap source code
 */
export const wrapCodeForExecution = (language, code, inputStr = '') => {
  if (!code) return '';
  const lang = (language || '').toString().toLowerCase().trim();

  if (lang === 'cpp' || lang === 'c++' || lang === 'c') {
    return wrapCppCode(code, inputStr);
  }
  if (lang === 'javascript' || lang === 'js' || lang === 'node') {
    return wrapJavaScriptCode(code, inputStr);
  }
  if (lang === 'python' || lang === 'python3' || lang === 'py') {
    return wrapPythonCode(code, inputStr);
  }

  return code;
};
