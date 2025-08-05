import React from "react";
import { Send } from "lucide-react";

const Chatbot = () => {
  
  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-gray-100 mt-3 rounded-xl border shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-white border-b shadow-sm font-semibold text-lg text-gray-800">
        🤖 AI Chat Assistant
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Bot message */}
        <div className="w-full flex">
          <div className="bg-white p-3 rounded-xl shadow-sm max-w-[75%] text-sm text-gray-800">
            Hello! How can I help you?
          </div>
        </div>

        {/* User message */}
        <div className="w-full flex justify-end">
          <div className="bg-indigo-600 text-white p-3 rounded-xl shadow-sm max-w-[75%] text-sm">
            What is the capital of France?
          </div>
        </div>

        {/* Bot message */}
        <div className="w-full flex">
          <div className="bg-white p-3 rounded-xl shadow-sm max-w-[75%] text-sm text-gray-800">
            The capital of France is Paris.
          </div>
        </div>
      </div>

      {/* Input section */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
          />
          <button className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
