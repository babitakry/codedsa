import { useEffect, useState } from "react"
import Editor from '@monaco-editor/react';
import React from 'react'
import {
    Play,
    RotateCcw,
    Maximize2,
    ChevronDown
} from "lucide-react"
import axios from "axios";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const RightSide = ({ setSize, initialCode }) => {
    const [language, setLanguage] = useState(initialCode && initialCode[0]?.lang);
    const [code, setCode] = useState("");

    useEffect(() => {
        if (initialCode) {
            setCode(initialCode[0]?.code);
        }
    }, [initialCode]);

    const changeLanguage = (e) => {
        const lang = e.target.value;
        setLanguage(lang);

        for (let i = 0; i < initialCode.length; i++) {
            if (initialCode[i]?.lang === lang) {
                setCode(initialCode[i]?.code);
            }
        }
    }

    const executeCode = async () => {
        const res = await axios({
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {
                base64_encoded: 'true',
                wait: 'false',
                fields: '*'
            },
            headers: {
                'x-rapidapi-key': 'c012b03530msha259df1ce6c047bp1fc809jsn8bf2eb1c24a7',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                language_id: 52,
                source_code: code,
                stdin: 'SnVkZ2Uw'
            }
        })

        console.log("response from judge 0", res);
    }

    const getSubmission = async () => {
        const res = await axios({
            method: "GET",
            url: "https://judge0-ce.p.rapidapi.com/submissions/ced76e29-9e11-4610-8a46-ba4270861fe2",
            params: {
                base64_encoded: 'true',
                fields: '*'
            },
            headers: {
                'x-rapidapi-key': 'c012b03530msha259df1ce6c047bp1fc809jsn8bf2eb1c24a7',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
            }
        })
        console.log("response", res.data);
    }

    return (
        <div className="w-full h-full flex flex-col rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            {/* Top Toolbar */}
            <div className="border-b border-gray-200 p-3 bg-white flex items-center justify-between">

                {/* Language Selector */}
                <Select>
                    <SelectTrigger className="w-[180px] capitalize">
                        <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                        {initialCode && initialCode.map((obj, ind) => (
                            <SelectItem key={ind} value={obj.lang} className="capitalize">
                                {obj.lang}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>


                {/* <div className="relative">
                    <select
                        value={language}
                        onChange={changeLanguage}
                        className="appearance-none border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white pr-8 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        {initialCode && initialCode.map((obj, ind) => (
                            <option key={ind} value={obj.lang}>{obj.lang}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-500">
                        <ChevronDown size={16} />
                    </div>
                </div>  */}


                {/* Action Buttons for larger screens */}
                <div className="hidden sm:flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded" onClick={getSubmission}>
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded" onClick={executeCode}>
                        <Play className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded" onClick={() => setSize(100)}>
                        <Maximize2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 relative">
                <Editor
                    height="100%"
                    defaultLanguage="cpp"
                    value={code}
                    onChange={(value) => setCode(value)}
                    options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                    }}
                />

                {/* Run & Submit buttons for small screens */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 sm:hidden bg-white p-2 rounded shadow-md">
                    <button
                        onClick={executeCode}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700 transition"
                    >
                        Run
                    </button>
                    <button
                        onClick={getSubmission}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-green-700 transition"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RightSide;
