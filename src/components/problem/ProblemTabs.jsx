import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ClipboardList, Bot } from "lucide-react";
import ProblemDetail from './ProblemDetail';
import Chatbot from '@/components/chatbot/Chatbot';

export const ProblemTabs = ({ activeTab, setActiveTab, problem }) => {
  const [messageHistory, setMessageHistory] = useState([]);

  useEffect(() => {
    // Reset or update when problem ID changes
  }, [problem?._id]);

  return (
    <div className="w-full h-full flex flex-col rounded-lg border border-neutral-200 dark:border-[#333333] bg-white dark:bg-[#282828] shadow-xs overflow-hidden transition-colors">
      <Tabs defaultValue="description" className="w-full h-full flex flex-col">

        {/* LeetCode Header Tab Bar */}
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

        {/* Scrollable Content Container */}
        <div className="flex-1 p-5 overflow-y-auto custom-scrollbar">
          <TabsContent value="description" className="mt-0 outline-none">
            <ProblemDetail problem={problem} />
          </TabsContent>
          <TabsContent value="submissions" className="mt-0 outline-none">
            <div className="py-16 text-center text-neutral-400 dark:text-neutral-500 text-xs">
              <ClipboardList className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="font-medium text-neutral-700 dark:text-neutral-300 text-sm">No Submissions Yet</p>
              <p className="mt-1">When you submit your code, your result and execution stats will be saved here.</p>
            </div>
          </TabsContent>
          <TabsContent value="chat_ai" className="mt-0 outline-none h-full">
            <Chatbot problemId={problem?._id} messageHistory={messageHistory} setMessageHistory={setMessageHistory} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ProblemTabs;
