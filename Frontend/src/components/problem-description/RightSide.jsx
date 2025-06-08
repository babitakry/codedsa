import { useState } from "react"
import React from 'react'
import {
    Play,
    RotateCcw,
    Maximize2,
    Settings
} from "lucide-react"

const RightSide = () => {
    const [language, setLanguage] = useState("C++")
    const [code, setCode] = useState(`class Solution {
  public:
      vector<int> twoSum(vector<int>& nums, int target) {
          
      }
  };`)
    return (
        <div className="w-full flex flex-col">
            <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1 text-sm"
                        >
                            <option>C++</option>
                            <option>Java</option>
                            <option>Python</option>
                            <option>JavaScript</option>
                        </select>
                        <span className="text-sm text-gray-600">Auto</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <Play className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <Maximize2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 bg-gray-50">
                <div className="h-full">
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-full p-4 bg-transparent border-none outline-none font-mono text-sm resize-none"
                        style={{ minHeight: "400px" }}
                    />
                </div>
            </div>

        </div>
    )
}

export default RightSide
