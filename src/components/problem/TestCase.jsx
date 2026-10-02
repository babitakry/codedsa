import React, { useEffect, useState } from "react";
import {
  Terminal,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Cpu,
  Play,
  Loader2,
  Code,
} from "lucide-react";

const TestCase = ({
  examples = [],
  customInput,
  setCustomInput,
  useCustomInput,
  setUseCustomInput,
  runResult,
  isRunning,
  activePanelTab,
  setActivePanelTab,
  onRun,
}) => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [selectedResultCaseIdx, setSelectedResultCaseIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  // Auto-switch to test result tab when run completes
  useEffect(() => {
    if (runResult) {
      setActivePanelTab("result");
      setSelectedResultCaseIdx(0);
    }
  }, [runResult]);

  const currentExample = examples[selectedCaseIdx] || {};

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentResultCase =
    runResult?.results && runResult.results[selectedResultCaseIdx]
      ? runResult.results[selectedResultCaseIdx]
      : null;

  const isAccepted = runResult?.overallStatus === "Accepted";
  const isCompileError =
    runResult?.overallStatus === "Compilation Error" || Boolean(runResult?.compileOutput);
  const isRuntimeError = runResult?.overallStatus?.includes("Runtime Error");
  const isTLE = runResult?.overallStatus?.includes("Time Limit");

  return (
    <div className="w-full h-full p-3 bg-white dark:bg-[#202020] rounded-lg shadow-xs border border-neutral-200 dark:border-[#333333] text-neutral-800 dark:text-neutral-200 transition-colors flex flex-col overflow-hidden font-sans">
      {/* Top Header: Switch between "Testcase" and "Test Result" */}
      <div className="flex items-center justify-between gap-2 border-b border-neutral-200 dark:border-[#333333] pb-2 mb-2 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActivePanelTab("testcase")}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition cursor-pointer ${
              activePanelTab === "testcase"
                ? "bg-neutral-100 dark:bg-[#333333] text-neutral-900 dark:text-white font-semibold shadow-xs"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-[#282828]"
            }`}
          >
            <Terminal size={13} className="text-[#00b8a3]" />
            <span>Testcase</span>
          </button>

          <button
            onClick={() => setActivePanelTab("result")}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition cursor-pointer ${
              activePanelTab === "result"
                ? "bg-neutral-100 dark:bg-[#333333] text-neutral-900 dark:text-white font-semibold shadow-xs"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-[#282828]"
            }`}
          >
            <span>Test Result</span>
            {runResult && (
              <span
                className={`w-2 h-2 rounded-full ${
                  isAccepted
                    ? "bg-[#00b8a3]"
                    : isCompileError
                    ? "bg-amber-500"
                    : "bg-red-500"
                }`}
              />
            )}
          </button>
        </div>

        {/* Action button in header */}
        {activePanelTab === "testcase" && !useCustomInput && (
          <button
            onClick={() =>
              handleCopy(
                `Input: ${currentExample.input || ""}\nOutput: ${
                  currentExample.output || ""
                }`
              )
            }
            className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition cursor-pointer flex-shrink-0"
            title="Copy testcase"
          >
            {copied ? (
              <>
                <Check size={12} className="text-[#00b8a3]" />
                <span className="text-[#00b8a3]">Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto space-y-2 text-xs">
        {/* TAB 1: TESTCASE SPECIFICATION */}
        {activePanelTab === "testcase" && (
          <div className="space-y-3 h-full flex flex-col">
            {/* Case Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
              {examples.map((_, ind) => (
                <button
                  key={ind}
                  onClick={() => {
                    setSelectedCaseIdx(ind);
                    setUseCustomInput(false);
                  }}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition cursor-pointer select-none ${
                    !useCustomInput && selectedCaseIdx === ind
                      ? "bg-neutral-100 dark:bg-[#383838] text-neutral-900 dark:text-white font-semibold shadow-xs"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-[#282828]"
                  }`}
                >
                  Case {ind + 1}
                </button>
              ))}

              <button
                onClick={() => setUseCustomInput(true)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition cursor-pointer select-none flex items-center gap-1 ${
                  useCustomInput
                    ? "bg-[#00b8a3]/10 text-[#00b8a3] font-semibold border border-[#00b8a3]/30"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-[#282828]"
                }`}
              >
                <span>+ Custom Input</span>
              </button>
            </div>

            {/* Case Details */}
            {useCustomInput ? (
              <div className="flex-1 flex flex-col space-y-1.5 min-h-[120px]">
                <div className="text-[11px] font-sans font-semibold text-neutral-500 dark:text-neutral-400">
                  Custom stdin payload:
                </div>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Enter custom inputs (e.g. 5&#10;1 2 3 4 5)"
                  className="flex-1 w-full p-2.5 rounded bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-[#383838] text-neutral-900 dark:text-neutral-100 font-mono text-xs focus:outline-none focus:border-[#00b8a3] resize-none"
                  rows={4}
                />
              </div>
            ) : (
              <div className="space-y-2 font-mono">
                <div>
                  <div className="text-[11px] font-sans font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                    Input:
                  </div>
                  <div className="p-2 rounded bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-[#383838] text-neutral-800 dark:text-neutral-200 break-all select-text">
                    {currentExample.input || "No input provided"}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-sans font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                    Expected Output:
                  </div>
                  <div className="p-2 rounded bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-[#383838] text-neutral-800 dark:text-neutral-200 break-all select-text">
                    {currentExample.output || "No output provided"}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TEST RESULT */}
        {activePanelTab === "result" && (
          <div className="space-y-3">
            {isRunning ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
                <Loader2 className="w-6 h-6 animate-spin text-[#00b8a3]" />
                <p className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                  Executing your code on Judge0...
                </p>
                <p className="text-[11px] text-neutral-400">Compiling & evaluating test cases</p>
              </div>
            ) : !runResult ? (
              <div className="py-10 text-center space-y-3">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  You must run your code first to view the test results.
                </p>
                <button
                  onClick={onRun}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-100 dark:bg-[#333333] hover:bg-neutral-200 dark:hover:bg-[#3e3e3e] text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition cursor-pointer"
                >
                  <Play className="w-3 h-3 text-[#00b8a3] fill-[#00b8a3]" />
                  <span>Run Code</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Result Status Banner */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-[#333333]">
                  <div className="flex items-center gap-2">
                    {isAccepted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#00b8a3]" />
                        <span className="font-bold text-sm text-[#00b8a3]">Accepted</span>
                      </>
                    ) : isCompileError ? (
                      <>
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <span className="font-bold text-sm text-amber-500">
                          Compilation Error
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="font-bold text-sm text-red-500">
                          {runResult.overallStatus || "Wrong Answer"}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Execution Metrics */}
                  <div className="flex items-center gap-3 text-[11px] text-neutral-500 dark:text-neutral-400">
                    {runResult.runtime && (
                      <span className="flex items-center gap-1" title="Execution Time">
                        <Clock size={12} className="text-neutral-400" />
                        <span>{runResult.runtime}s</span>
                      </span>
                    )}
                    {runResult.memory > 0 && (
                      <span className="flex items-center gap-1" title="Memory Used">
                        <Cpu size={12} className="text-neutral-400" />
                        <span>{Math.round(runResult.memory)} KB</span>
                      </span>
                    )}
                    {runResult.totalTestCases > 0 && (
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">
                        {runResult.passedTestCases}/{runResult.totalTestCases} Cases Passed
                      </span>
                    )}
                  </div>
                </div>

                {/* Compilation / Syntax Error Terminal View */}
                {runResult.compileOutput && (
                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold text-red-500 dark:text-red-400">
                      Compiler Output / Errors:
                    </div>
                    <pre className="p-3 rounded-lg bg-neutral-900 text-red-300 border border-red-900/40 text-xs font-mono whitespace-pre-wrap max-h-48 overflow-y-auto custom-scrollbar leading-relaxed">
                      {runResult.compileOutput}
                    </pre>
                  </div>
                )}

                {/* Per-case result inspector */}
                {runResult.results && runResult.results.length > 0 && !runResult.compileOutput && (
                  <div className="space-y-2">
                    {/* Case tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                      {runResult.results.map((r, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedResultCaseIdx(idx)}
                          className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition cursor-pointer select-none ${
                            selectedResultCaseIdx === idx
                              ? "bg-neutral-100 dark:bg-[#383838] text-neutral-900 dark:text-white font-semibold shadow-xs"
                              : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-[#282828]"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              r.passed ? "bg-[#00b8a3]" : "bg-red-500"
                            }`}
                          />
                          <span>Case {idx + 1}</span>
                        </button>
                      ))}
                    </div>

                    {currentResultCase && (
                      <div className="space-y-2 font-mono text-xs">
                        {/* Input */}
                        <div>
                          <div className="text-[11px] font-sans font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                            Input:
                          </div>
                          <div className="p-2 rounded bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-[#383838] text-neutral-800 dark:text-neutral-200 break-all select-text">
                            {currentResultCase.input || "(No stdin)"}
                          </div>
                        </div>

                        {/* Actual Output vs Expected Output */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <div className="text-[11px] font-sans font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                              Your Output (Stdout):
                            </div>
                            <div
                              className={`p-2 rounded border break-all select-text min-h-[38px] ${
                                currentResultCase.passed
                                  ? "bg-neutral-50 dark:bg-[#1a1a1a] border-neutral-200 dark:border-[#383838] text-neutral-800 dark:text-neutral-200"
                                  : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400"
                              }`}
                            >
                              {currentResultCase.actualOutput || "(Empty output)"}
                            </div>
                          </div>

                          {currentResultCase.expectedOutput && (
                            <div>
                              <div className="text-[11px] font-sans font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
                                Expected Output:
                              </div>
                              <div className="p-2 rounded bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-[#383838] text-neutral-800 dark:text-neutral-200 break-all select-text min-h-[38px]">
                                {currentResultCase.expectedOutput}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Stderr if any */}
                        {currentResultCase.stderr && (
                          <div>
                            <div className="text-[11px] font-sans font-semibold text-red-500 mb-1">
                              Stderr:
                            </div>
                            <div className="p-2 rounded bg-red-900/15 border border-red-900/30 text-red-400 break-all">
                              {currentResultCase.stderr}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCase;
