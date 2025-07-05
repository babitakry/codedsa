import { useEffect, useState } from "react"
import Editor from '@monaco-editor/react';
import React from 'react'
import {
    Play,
    RotateCcw,
    Maximize2,
    Settings
} from "lucide-react"
import axios from "axios";

const RightSide = ({ initialCode }) => {
    console.log("InitialCode: ", initialCode);
    const [language, setLanguage] = useState(initialCode && initialCode[0]?.lang);
    const [code, setCode] = useState("");

    useEffect(() => {
        if (initialCode) {
            setCode(initialCode[0]?.code);
        }
    }, [initialCode]); 


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

        console.log("response", res.data)
    }

    const changeLanguage= (e)=>{
        const lang = e.target.value;
        setLanguage(lang);

        for(let i=0;i<initialCode.length ;i++){
            if(initialCode[i]?.lang===lang){
                // console.log("infdafsdf", initialCode[i]);
                setCode(initialCode[i]?.code);
            }
        }
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <select
                            value={language}
                            onChange={changeLanguage}
                            className="border border-gray-300 rounded px-3 py-1 text-sm"
                        >
                            {
                                initialCode && initialCode?.map((obj,ind)=>{
                                    return (
                                        <option>{obj.lang}</option>
                                    )
                                })
                            }
                        </select>
                        <span className="text-sm text-gray-600">Auto</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <RotateCcw onClick={getSubmission} className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <Play onClick={executeCode} className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <Maximize2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <Editor
                    height="90vh"
                    defaultLanguage="cpp"
                    value={code}
                    onChange={(value) => setCode(value)}
                />

            </div>

        </div>
    )
}

export default RightSide
