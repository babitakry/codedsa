import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, List, User, X } from 'lucide-react';
import axios from 'axios';
import { problemEndpoints } from '@/services/api';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [problem, setProblem] = useState([]);
    const navigate = useNavigate();

    const handleNavigate = (title, problemId) => {
        setShowSidebar(false);
        navigate(`/problems/${title}`, {
            state: problemId
          })
    };


    const fetch_problem = async () => {
        try {
            const response = await axios.get(problemEndpoints.GET_ALL_PROBLEM);
            setProblem(response.data.data);
            // console.log("Fetched Problems:", response.data.data);
        } catch (error) {
            console.error("Error fetching problems:", error);
        }
    };

    useEffect(() => {
        fetch_problem();
    }, []);

    return (
        <>
            <header className="border-b border-gray-200 px-4 py-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            className="flex items-center space-x-2 px-3 py-1 hover:bg-gray-100 rounded"
                            onClick={() => setShowSidebar(true)}
                        >
                            <List className="w-4 h-4" />
                            <span className="text-sm font-medium">Problem List</span>
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm font-medium">
                            Submit
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <User className="w-5 h-5" />
                        </button>
                        <span className="text-sm text-gray-600">Register</span>
                        <span className="text-sm text-gray-400">or</span>
                        <span className="text-sm text-gray-600">Sign in</span>
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            {showSidebar && (
                <div className="fixed inset-0 z-40 flex">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black opacity-30"
                        onClick={() => setShowSidebar(false)}
                    ></div>

                    {/* Sidebar Panel */}
                    <div className="relative z-50 w-80 bg-white h-full shadow-lg overflow-y-auto">
                        <div className="flex justify-between items-center px-4 py-3 border-b">
                            <h2 className="text-lg font-semibold">Problem List</h2>
                            <button
                                className="p-1 hover:bg-gray-100 rounded"
                                onClick={() => setShowSidebar(false)}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Problem List */}
                        <ul className="divide-y text-sm">
                            {problem.map((prob) => (
                                <li key={prob.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                                    <div className="flex justify-between">
                                        <span
                                            onClick={() => handleNavigate(prob.title, prob._id)}
                                            className=""
                                        >
                                            {prob.title}
                                        </span>

                                        <span
                                            className={`font-medium ${prob.difficulty === 'Easy'
                                                ? 'text-green-500'
                                                : prob.difficulty === 'Medium'
                                                    ? 'text-yellow-500'
                                                    : 'text-red-500'
                                                }`}
                                        >
                                            {prob.difficulty}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            )}
        </>
    );
};
