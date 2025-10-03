import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, PenTool, Lightbulb, ClipboardList, Bot } from "lucide-react";
import ProblemDetail from './ProblemDetail';
import Chatbot from '@/pages/Chatbot';

export const LeftSide = ({ activeTab, setActiveTab, problem }) => {
  const [messageHistory, setMessageHistory] = useState([]); // {role: "system | user", message: "string"}
  console.log("Problem :", problem);
  const openChatAI = (tab) => {
    setActiveTab(tab);
  }
  return (
    <div className="w-full relative">
  <Tabs defaultValue="description" className="w-full max-w-4xl mx-auto">
    
    {/* Tabs List */}
    <TabsList className="flex overflow-x-auto no-scrollbar gap-2 w-full h-14 p-2 shadow-sm sticky top-0 bg-white z-20 border-t-2">
      <TabsTrigger
        value="description"
        className="flex items-center justify-center gap-1 px-3 py-2 min-w-[100px] rounded-md text-sm font-medium transition-all duration-150 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm hover:bg-gray-100 text-gray-600"
      >
        <FileText size={16} /> Description
      </TabsTrigger>

      {/* <TabsTrigger
        value="editorial"
        className="flex items-center justify-center gap-1 px-3 py-2 min-w-[100px] rounded-md text-sm font-medium transition-all duration-150 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm hover:bg-gray-100 text-gray-600"
      >
        <PenTool size={16} /> Editorial
      </TabsTrigger>

      <TabsTrigger
        value="solutions"
        className="flex items-center justify-center gap-1 px-3 py-2 min-w-[100px] rounded-md text-sm font-medium transition-all duration-150 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm hover:bg-gray-100 text-gray-600"
      >
        <Lightbulb size={16} /> Solutions
      </TabsTrigger> */}

      <TabsTrigger
        value="submissions"
        className="flex items-center justify-center gap-1 px-3 py-2 min-w-[100px] rounded-md text-sm font-medium transition-all duration-150 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm hover:bg-gray-100 text-gray-600"
      >
        <ClipboardList size={16} /> Submissions
      </TabsTrigger>

      <TabsTrigger
        value="chat_ai"
        className="flex items-center justify-center gap-1 px-3 py-2 min-w-[100px] rounded-md text-sm font-medium transition-all duration-150 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm hover:bg-gray-100 text-gray-600"
      >
        <Bot size={16} /> Chat AI
      </TabsTrigger>
    </TabsList>

    {/* Tabs Content */}
    <div className="h-[calc(100vh-140px)] relative overflow-y-auto">
      <TabsContent value="description">
        <ProblemDetail problem={problem} />
      </TabsContent>
      <TabsContent value="editorial">
        <p className="text-gray-700">Editorial coming soon.</p>
      </TabsContent>
      <TabsContent value="solutions">
        <p className="text-gray-700">Explore different solutions here.</p>
      </TabsContent>
      <TabsContent value="submissions">
        <p className="text-gray-700">Your past submissions will show up here.</p>
      </TabsContent>
      <TabsContent value="chat_ai">
        <Chatbot problemId={problem?._id} messageHistory={messageHistory} setMessageHistory={setMessageHistory}/>
      </TabsContent>
    </div>
  </Tabs>
</div>

  )
}
