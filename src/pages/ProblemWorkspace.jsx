import React, { useEffect, useState } from "react";
import CodeEditor from "@/components/problem/CodeEditor";
import ProblemTabs from "@/components/problem/ProblemTabs";
import ProblemHeader from "@/components/problem/ProblemHeader";
import TestCase from "@/components/problem/TestCase";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { problemEndpoints, judgeEndpoints } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Cpu,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const ProblemWorkspace = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [problem, setProblem] = useState({});
  const [size, setSize] = useState(50);
  const location = useLocation();
  const params = useParams();
  const { isAuthenticated } = useAuth();

  // Code & Language state
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  // Testcase & Run state
  const [customInput, setCustomInput] = useState("");
  const [useCustomInput, setUseCustomInput] = useState(false);
  const [activePanelTab, setActivePanelTab] = useState("testcase");
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [latestSubmission, setLatestSubmission] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  // 1. Fetch Problem data
  const fetchProblem = async () => {
    try {
      let targetId = location.state;

      // If directly navigated or reloaded via URL param
      if (!targetId && params.name) {
        const allRes = await axios.get(problemEndpoints.GET_ALL_PROBLEM);
        const matched = allRes.data.data?.find(
          (p) =>
            p.title?.toLowerCase() === decodeURIComponent(params.name).toLowerCase()
        );
        if (matched) {
          targetId = matched._id;
        }
      }

      if (!targetId) return;

      const response = await axios.get(problemEndpoints.GET_PROBLEM_BY_ID(targetId));
      const probData = response.data.data;
      setProblem(probData || {});

      // Initialize boilerplate code
      if (probData?.boiler_plate_code && probData.boiler_plate_code.length > 0) {
        const defaultLangObj = probData.boiler_plate_code[0];
        setLanguage(defaultLangObj.lang);
        setCode(defaultLangObj.code);
      }
    } catch (error) {
      console.error("Error fetching problem:", error);
    }
  };

  // 2. Fetch User Problem Submissions
  const fetchSubmissions = async () => {
    if (!problem?._id || !isAuthenticated) return;
    try {
      setLoadingSubmissions(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(judgeEndpoints.GET_PROBLEM_SUBMISSIONS(problem._id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubmissions(res.data.data || []);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    fetchProblem();
  }, [location.state, params.name]);

  useEffect(() => {
    if (problem?._id && isAuthenticated) {
      fetchSubmissions();
    }
  }, [problem?._id, isAuthenticated]);

  // Auth prompt modal state
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // 3. Run Code Handler
  const handleRunCode = async () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }

    if (!code || isRunning || isSubmitting) return;

    try {
      setIsRunning(true);
      setActivePanelTab("result");

      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const payload = {
        problemId: problem?._id,
        language,
        code,
        customInput: useCustomInput ? customInput : undefined,
      };

      const res = await axios.post(judgeEndpoints.RUN_CODE, payload, { headers });
      setRunResult(res.data.data);
    } catch (err) {
      console.error("Error running code:", err);
      if (err.response?.status === 400 || err.response?.status === 401) {
        setAuthModalOpen(true);
      }
      setRunResult({
        overallStatus: "Authentication Required",
        compileOutput: err.response?.data?.message || "Please sign in to execute code.",
        passedTestCases: 0,
        totalTestCases: 1,
        runtime: "0.00",
        memory: 0,
        results: [],
      });
    } finally {
      setIsRunning(false);
    }
  };

  // 4. Submit Code Handler
  const handleSubmitCode = async () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }

    if (!code || isRunning || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const payload = {
        problemId: problem?._id,
        language,
        code,
      };

      const res = await axios.post(judgeEndpoints.SUBMIT_CODE, payload, { headers });
      const subResult = res.data.data;

      setLatestSubmission(subResult);
      setSubmissionModalOpen(true);

      // Refresh submissions
      if (isAuthenticated) {
        fetchSubmissions();
      }
    } catch (err) {
      console.error("Error submitting code:", err);
      if (err.response?.status === 400 || err.response?.status === 401) {
        setAuthModalOpen(true);
      }
      setLatestSubmission({
        overallStatus: "Authentication Required",
        compileOutput: err.response?.data?.message || "Please sign in to submit solutions.",
        passedTestCases: 0,
        totalTestCases: 1,
        runtime: "0.00",
        memory: 0,
      });
      setSubmissionModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-[#f0f0f0] dark:bg-[#1a1a1a] text-neutral-800 dark:text-neutral-200 transition-colors overflow-hidden font-sans">
      <ProblemHeader
        onRun={handleRunCode}
        onSubmit={handleSubmitCode}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
      />

      <div className="flex-1 p-2 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="w-full h-full gap-1.5">
          {/* Left Panel: Tabs (Description, Submissions, AI) */}
          <ResizablePanel defaultSize={50} minSize={25}>
            <div className="h-full overflow-hidden">
              <ProblemTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                problem={problem}
                submissions={submissions}
                loadingSubmissions={loadingSubmissions}
                fetchSubmissions={fetchSubmissions}
                isAuthenticated={isAuthenticated}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle className="w-1 rounded bg-transparent hover:bg-[#00b8a3]/60 transition-colors cursor-col-resize" />

          {/* Right Panel: Code Editor & Test Case Results */}
          <ResizablePanel key={size} defaultSize={size} minSize={25}>
            <ResizablePanelGroup direction="vertical" className="gap-1.5">
              {/* Monaco Editor */}
              <ResizablePanel defaultSize={65} minSize={25}>
                <div className="h-full overflow-hidden">
                  <CodeEditor
                    setSize={setSize}
                    initialCode={problem?.boiler_plate_code}
                    code={code}
                    setCode={setCode}
                    language={language}
                    setLanguage={setLanguage}
                    onRun={handleRunCode}
                    onSubmit={handleSubmitCode}
                    isRunning={isRunning}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </ResizablePanel>

              <ResizableHandle className="h-1 rounded bg-transparent hover:bg-[#00b8a3]/60 transition-colors cursor-row-resize" />

              {/* Testcases & Execution Console */}
              <ResizablePanel defaultSize={35} minSize={15}>
                <div className="w-full h-full overflow-hidden">
                  <TestCase
                    examples={problem?.examples || []}
                    customInput={customInput}
                    setCustomInput={setCustomInput}
                    useCustomInput={useCustomInput}
                    setUseCustomInput={setUseCustomInput}
                    runResult={runResult}
                    isRunning={isRunning}
                    activePanelTab={activePanelTab}
                    setActivePanelTab={setActivePanelTab}
                    onRun={handleRunCode}
                  />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Submission Result Modal */}
      {latestSubmission && (
        <Dialog open={submissionModalOpen} onOpenChange={setSubmissionModalOpen}>
          <DialogContent className="max-w-md bg-white dark:bg-[#202020] border-neutral-200 dark:border-[#383838] text-neutral-800 dark:text-neutral-200 font-sans">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base font-semibold">
                {latestSubmission.overallStatus === "Accepted" ? (
                  <>
                    <div className="p-2 rounded-full bg-[#00b8a3]/15 text-[#00b8a3]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[#00b8a3] text-lg font-bold">Accepted</span>
                      <p className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                        All test cases passed!
                      </p>
                    </div>
                  </>
                ) : latestSubmission.overallStatus === "Compilation Error" ? (
                  <>
                    <div className="p-2 rounded-full bg-amber-500/15 text-amber-500">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-amber-500 text-lg font-bold">Compilation Error</span>
                      <p className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                        Check your code syntax and types.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-2 rounded-full bg-red-500/15 text-red-500">
                      <XCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-red-500 text-lg font-bold">
                        {latestSubmission.overallStatus || "Wrong Answer"}
                      </span>
                      <p className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                        Test case failed. Inspect expected output.
                      </p>
                    </div>
                  </>
                )}
              </DialogTitle>
            </DialogHeader>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-neutral-100 dark:border-[#333333]">
              <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-[#383838] text-center">
                <span className="text-[11px] text-neutral-400 flex items-center justify-center gap-1">
                  <Clock size={12} /> Runtime
                </span>
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                  {latestSubmission.runtime || "0.00"}s
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-[#383838] text-center">
                <span className="text-[11px] text-neutral-400 flex items-center justify-center gap-1">
                  <Cpu size={12} /> Memory
                </span>
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                  {Math.round(latestSubmission.memory || 0)} KB
                </p>
              </div>
            </div>

            {/* Test Cases Count */}
            {latestSubmission.totalTestCases > 0 && (
              <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-300">
                <span>Test cases passed:</span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {latestSubmission.passedTestCases} / {latestSubmission.totalTestCases}
                </span>
              </div>
            )}

            {/* Compiler error block if any */}
            {latestSubmission.compileOutput && (
              <pre className="p-2.5 rounded bg-red-950/20 text-red-400 border border-red-900/30 text-[11px] font-mono whitespace-pre-wrap max-h-36 overflow-y-auto custom-scrollbar">
                {latestSubmission.compileOutput}
              </pre>
            )}

            <DialogFooter className="gap-2 sm:gap-0">
              <button
                onClick={() => {
                  setSubmissionModalOpen(false);
                  setActiveTab("submissions");
                }}
                className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-[#00b8a3] hover:bg-[#00a390] text-white text-xs font-semibold transition cursor-pointer"
              >
                <span>View All Submissions</span>
                <ArrowRight size={13} />
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Authentication Required Modal */}
      <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
        <DialogContent className="max-w-md bg-white dark:bg-[#202020] border-neutral-200 dark:border-[#383838] text-neutral-800 dark:text-neutral-200 font-sans">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-base font-semibold">
              <div className="p-2.5 rounded-full bg-amber-500/15 text-amber-500">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  Authentication Required
                </span>
                <p className="text-xs font-normal text-neutral-500 dark:text-neutral-400 mt-0.5">
                  You must be signed in to run and submit code.
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="py-2 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Create a free account or log in to compile code on Judge0, test solutions against test cases, and save your submission history.
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
            <a
              href="/signin"
              className="flex-1 py-2 text-center rounded-lg bg-[#00b8a3] hover:bg-[#00a390] text-white text-xs font-semibold transition cursor-pointer"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="flex-1 py-2 text-center rounded-lg bg-neutral-100 dark:bg-[#333333] hover:bg-neutral-200 dark:hover:bg-[#3e3e3e] text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition cursor-pointer border border-neutral-200 dark:border-neutral-700"
            >
              Create Account
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProblemWorkspace;
