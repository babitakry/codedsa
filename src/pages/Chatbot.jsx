import React from "react";
import { Send } from "lucide-react";

const Chatbot = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-gray-50 mt-6">
      {/* Header */}
      <div className="p-4 border-b bg-white shadow font-semibold text-lg text-gray-700">
        Chatbot
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Example messages */}
        <div className="bg-white p-3 rounded-lg shadow w-fit max-w-[70%]">
          Hello! How can I help you?
        </div>
        <div className="bg-indigo-100 p-3 rounded-lg shadow self-end w-fit max-w-[70%]">
          What is the capital of France?
        </div>
        <div className="bg-white p-3 rounded-lg shadow w-fit max-w-[70%]">
          The capital of France is Paris.
        </div>
        {/* Add more messages here */}
      </div>

      {/* Input section */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
