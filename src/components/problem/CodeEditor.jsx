import { useEffect, useState } from "react";
import Editor from '@monaco-editor/react';
import React from 'react';
import {
    Play,
    RotateCcw,
    Maximize2,
    Code2,
} from "lucide-react";
import axios from "axios";
import { useTheme } from "@/context/ThemeContext";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const CodeEditor = ({ setSize, initialCode }) => {
    const [language, setLanguage] = useState("");
    const [code, setCode] = useState("");
    const { isDark } = useTheme();

    useEffect(() => {
        if (initialCode && initialCode.length > 0) {
            setCode(initialCode[0]?.code);
            setLanguage(initialCode[0]?.lang);
        }
    }, [initialCode]);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        for (let i = 0; i < initialCode?.length; i++) {
            if (initialCode[i]?.lang === lang) {
                setCode(initialCode[i]?.code);
            }
        }
    };

    const resetCode = () => {
        for (let i = 0; i < initialCode?.length; i++) {
            if (initialCode[i]?.lang === language) {
                setCode(initialCode[i]?.code);
            }
        }
    };

    const executeCode = async () => {
        try {
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
            });
            console.log("response from judge 0", res);
        } catch (err) {
            console.error(err);
        }
    };

    const getSubmission = async () => {
        try {
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
            });
            console.log("response", res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-full h-full flex flex-col rounded-lg shadow-xs border border-neutral-200 dark:border-[#333333] bg-white dark:bg-[#1e1e1e] overflow-hidden transition-colors">
            {/* Top Toolbar */}
            <div className="px-3 py-1.5 bg-neutral-50 dark:bg-[#202020] border-b border-neutral-200 dark:border-[#333333] flex items-center justify-between">

                {/* Language Selector */}
                <div className="flex items-center gap-1.5">
                    <Code2 size={14} className="text-[#00b8a3]" />
                    <Select onValueChange={changeLanguage} value={language}>
                        <SelectTrigger className="w-[125px] h-7 text-xs font-medium capitalize bg-white dark:bg-[#282828] border-neutral-200 dark:border-[#383838] text-neutral-800 dark:text-neutral-200 rounded-md shadow-none cursor-pointer focus:ring-1 focus:ring-[#00b8a3]">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#282828] border-neutral-200 dark:border-[#383838] shadow-lg">
                            {initialCode && initialCode.map((obj, ind) => (
                                <SelectItem
                                    key={ind}
                                    value={obj.lang}
                                    className="capitalize text-xs cursor-pointer font-medium focus:bg-neutral-100 dark:focus:bg-[#333333]"
                                >
                                    {obj.lang}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Action Buttons */}
                <div className="hidden sm:flex items-center space-x-1">
                    <button
                        className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#282828] rounded-md transition cursor-pointer"
                        onClick={resetCode}
                        title="Reset code to default"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                    </button>
                    <button
                        className="p-1 hover:bg-neutral-100 dark:hover:bg-[#282828] rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition cursor-pointer"
                        onClick={() => setSize(100)}
                        title="Expand Editor"
                    >
                        <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Monaco Editor Container */}
            <div className="flex-1 relative bg-white dark:bg-[#1e1e1e]">
                <Editor
                    height="100%"
                    theme={isDark ? "vs-dark" : "light"}
                    defaultLanguage="cpp"
                    language={language === "cpp" ? "cpp" : language === "python" ? "python" : language === "javascript" ? "javascript" : "java"}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    options={{
                        fontSize: 13.5,
                        lineHeight: 21,
                        fontFamily: "'JetBrains Mono', Menlo, Monaco, Consolas, 'Courier New', monospace",
                        fontLigatures: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        bracketPairColorization: { enabled: true },
                        padding: { top: 12, bottom: 12 },
                        lineNumbersMinChars: 3,
                        cursorBlinking: "smooth",
                        cursorSmoothCaretAnimation: "on",
                        smoothScrolling: true,
                    }}
                />

                {/* Mobile Run & Submit */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 sm:hidden bg-white/95 dark:bg-[#282828]/95 backdrop-blur p-1.5 rounded-lg shadow-lg border border-neutral-200 dark:border-[#383838]">
                    <button
                        onClick={executeCode}
                        className="bg-neutral-100 dark:bg-[#333333] text-neutral-800 dark:text-neutral-200 px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer"
                    >
                        Run
                    </button>
                    <button
                        onClick={getSubmission}
                        className="bg-[#00b8a3] hover:bg-[#00a390] text-white px-3.5 py-1.5 rounded-md text-xs font-medium transition cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
