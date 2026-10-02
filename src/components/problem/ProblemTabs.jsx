import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  ClipboardList,
  Bot,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Cpu,
  Code2,
  Eye,
  Calendar,
  Loader2,
} from "lucide-react";
import ProblemDetail from "./ProblemDetail";
import Chatbot from "@/components/chatbot/Chatbot";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const ProblemTabs = ({
  activeTab = "description",
  setActiveTab,
  problem,
  submissions = [],
  loadingSubmissions = false,
  fetchSubmissions,
  isAuthenticated = false,
}) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    if (activeTab === "submissions" && problem?._id && fetchSubmissions) {
      fetchSubmissions();
    }
  }, [activeTab, problem?._id]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#00b8a3]">
            <CheckCircle2 size={13} />
            Accepted
          </span>
        );
      case "Compilation Error":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
            <AlertTriangle size={13} />
            Compile Error
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-500">
            <XCircle size={13} />
            {status || "Wrong Answer"}
          </span>
        );
    }
  };

  return (
    <div className="w-full h-full flex flex-col rounded-lg border border-neutral-200 dark:border-[#333333] bg-white dark:bg-[#282828] shadow-xs overflow-hidden transition-colors">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full h-full flex flex-col"
      >
        {/* Tab Bar */}
        <div className="px-3 py-1.5 bg-neutral-50 dark:bg-[#202020] border-b border-neutral-200 dark:border-[#333333] flex items-center justify-between">
          <TabsList className="bg-transparent p-0 h-auto gap-1">
            <TabsTrigger
              value="description"
              className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-[#333333] data-[state=active]:text-neutral-900 dark:data-[state=active]:text-white text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer shadow-none data-[state=active]:shadow-xs"
            >
              <FileText size={14} className="text-[#00b8a3]" />
              <span>Description</span>
            </TabsTrigger>

            <TabsTrigger
              value="submissions"
              className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-[#333333] data-[state=active]:text-neutral-900 dark:data-[state=active]:text-white text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer shadow-none data-[state=active]:shadow-xs"
            >
              <ClipboardList size={14} className="text-amber-500" />
              <span>Submissions</span>
              {submissions.length > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold">
                  {submissions.length}
                </span>
              )}
            </TabsTrigger>

            <TabsTrigger
              value="chat_ai"
              className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-[#333333] data-[state=active]:text-neutral-900 dark:data-[state=active]:text-white text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer shadow-none data-[state=active]:shadow-xs"
            >
              <Bot size={14} className="text-purple-400" />
              <span>AI Assistant</span>
              <span className="text-[10px] bg-purple-500/15 text-purple-600 dark:text-purple-300 font-semibold px-1 rounded">
                AI
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Scrollable Tab Content Container */}
        <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
          <TabsContent value="description" className="mt-0 outline-none">
            <ProblemDetail problem={problem} />
          </TabsContent>

          <TabsContent value="submissions" className="mt-0 outline-none">
            {loadingSubmissions ? (
              <div className="py-16 flex flex-col items-center justify-center space-y-2 text-center text-xs text-neutral-400">
                <Loader2 className="w-6 h-6 animate-spin text-[#00b8a3]" />
                <p>Loading submission history...</p>
              </div>
            ) : !isAuthenticated ? (
              <div className="py-16 text-center text-neutral-400 dark:text-neutral-500 text-xs space-y-2">
                <ClipboardList className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="font-medium text-neutral-700 dark:text-neutral-300 text-sm">
                  Sign in to view your submissions
                </p>
                <p>Your submission history, runtime, and memory stats will be tracked here.</p>
              </div>
            ) : submissions.length === 0 ? (
              <div className="py-16 text-center text-neutral-400 dark:text-neutral-500 text-xs">
                <ClipboardList className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="font-medium text-neutral-700 dark:text-neutral-300 text-sm">
                  No Submissions Yet
                </p>
                <p className="mt-1">
                  When you submit your solution, your results and execution stats will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3 font-sans">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-[#333333]">
                  <h3 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    All Submissions ({submissions.length})
                  </h3>
                  <button
                    onClick={fetchSubmissions}
                    className="text-xs text-[#00b8a3] hover:underline cursor-pointer font-medium"
                  >
                    Refresh
                  </button>
                </div>

                <div className="divide-y divide-neutral-100 dark:divide-[#333333] border border-neutral-200 dark:border-[#383838] rounded-lg overflow-hidden bg-white dark:bg-[#202020]">
                  {submissions.map((sub, idx) => (
                    <div
                      key={sub._id || idx}
                      onClick={() => setSelectedSubmission(sub)}
                      className="p-3 hover:bg-neutral-50 dark:hover:bg-[#282828] cursor-pointer transition flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(sub.status)}
                          <span className="capitalize px-1.5 py-0.5 rounded text-[11px] font-mono bg-neutral-100 dark:bg-[#333333] text-neutral-600 dark:text-neutral-300">
                            {sub.language}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={11} />
                            {new Date(sub.createdAt).toLocaleString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {sub.totalTestCases > 0 && (
                            <span>
                              {sub.passedTestCases}/{sub.totalTestCases} cases
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-neutral-500 dark:text-neutral-400">
                        {sub.runtime && (
                          <span className="flex items-center gap-1">
                            <Clock size={11} className="text-neutral-400" />
                            <span>{sub.runtime}s</span>
                          </span>
                        )}
                        {sub.memory > 0 && (
                          <span className="flex items-center gap-1 hidden sm:flex">
                            <Cpu size={11} className="text-neutral-400" />
                            <span>{Math.round(sub.memory)} KB</span>
                          </span>
                        )}
                        <Eye size={14} className="text-neutral-400 hover:text-neutral-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="chat_ai" className="mt-0 outline-none h-full">
            <Chatbot
              problemId={problem?._id}
              messageHistory={messageHistory}
              setMessageHistory={setMessageHistory}
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <Dialog open={Boolean(selectedSubmission)} onOpenChange={() => setSelectedSubmission(null)}>
          <DialogContent className="max-w-2xl bg-white dark:bg-[#202020] border-neutral-200 dark:border-[#383838] text-neutral-800 dark:text-neutral-200">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between text-base font-semibold border-b border-neutral-100 dark:border-[#333333] pb-2.5">
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedSubmission.status)}
                  <span className="text-xs font-normal text-neutral-400">
                    ({selectedSubmission.language})
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-500 font-normal">
                  <span>Runtime: {selectedSubmission.runtime}s</span>
                  <span>Memory: {Math.round(selectedSubmission.memory || 0)} KB</span>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-3 pt-2 text-xs font-sans">
              <div>
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  Submitted Code:
                </span>
                <pre className="mt-1 p-3 rounded-lg bg-neutral-900 text-neutral-100 border border-neutral-800 text-xs font-mono overflow-x-auto custom-scrollbar max-h-72 leading-relaxed">
                  {selectedSubmission.code}
                </pre>
              </div>

              {selectedSubmission.compileOutput && (
                <div>
                  <span className="text-xs font-semibold text-red-500">
                    Compiler Output:
                  </span>
                  <pre className="mt-1 p-2.5 rounded-lg bg-red-950/30 text-red-300 border border-red-900/40 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                    {selectedSubmission.compileOutput}
                  </pre>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProblemTabs;
