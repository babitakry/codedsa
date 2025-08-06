import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { chatbotEndpoinst } from "@/services/api";
import axios from "axios";

const Chatbot = () => {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);// {role: "system | user", message: "string"}

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let arr = messageHistory;
    
      setMessageHistory([...messageHistory, {
        role: "user",
        message: input
      }])

      arr.push({
        role: "user",
        message: input
      })
      const response = await axios({
        method: "POST",
        url: chatbotEndpoinst.GET_CHATBOT,
        data: {
          prompt: input
        }
      })
      console.log("Chatbot Response", response);

      setMessageHistory([...arr, {
        role: "system",
        message: response.data?.data
      }])

    }
    catch (error) {
      console.error("Error in Fetching chatbot response:", error);
    }
  }

  console.log(messageHistory)

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-gray-100 mt-3 rounded-xl border shadow-md overflow-hidden">
      <div className="p-4 bg-white border-b shadow-sm font-semibold text-lg text-gray-800">
        🤖 AI Chat Assistant
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Bot message */}
        <div className="w-full flex">
          <div className="bg-white p-3 rounded-xl shadow-sm max-w-[75%] text-sm text-gray-800">
            Hello! How can I help you?
          </div>
        </div>

        {/* User message */}
        {
          messageHistory?.map((msg, ind) => {
            return (
              msg?.role === "system" ? <div className="w-full flex">
                <div className="bg-white p-3 rounded-xl shadow-sm max-w-[75%] text-sm text-gray-800">
                  {msg?.message}
                </div>
              </div>
                : <div className="w-full flex justify-end">
                  <div className="bg-indigo-600 text-white p-3 rounded-xl shadow-sm max-w-[75%] text-sm">
                    {msg?.message}
                  </div>
                </div>
            )
          })
        }
      </div>

      {/* Input section */}
      <form
        onSubmit={onSubmit}
        className="p-4 bg-white border-t">
        <div className="flex items-center gap-2">
          <input
            onChange={(e) => { setInput(e.target.value) }}
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
          />
          <button
            type="submit"
            className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
