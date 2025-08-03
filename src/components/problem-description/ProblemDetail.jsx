import React from 'react'

const ProblemDetail = ({ problem }) => {
    return (
        <div className="w-full border-r border-gray-200">
            <div className="p-6 overflow-y-auto h-[calc(100vh-120px)]">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-3"><span>{problem.sno}.</span> {problem.title}</h1>
                        <div className="flex items-center space-x-3">
                            {problem.difficulty && (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">{problem.difficulty}</span>
                            )}
                            {problem.topic && (
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">{problem.topic}</span>
                            )}
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">Companies</span>
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">Hint</span>
                        </div>
                    </div>

                    {/* Problem Statement */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800">Problem Statement</h2>
                        <p className="text-gray-700 whitespace-pre-line">{problem.description}</p>
                    </div>

                    {/* Examples */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800">Examples</h2>
                        {problem?.examples?.length > 0 ? (
                            problem.examples.map((ex, idx) => (
                                <div
                                    key={ex._id || idx}
                                    className="bg-gray-50 border border-gray-200 p-4 rounded space-y-2 shadow-sm"
                                >
                                    <p className="text-sm text-gray-500 font-medium">Example {idx + 1}</p>
                                    <div>
                                        <p className="font-semibold text-gray-700">Input:</p>
                                        <pre className="bg-gray-100 text-gray-800 p-2 rounded font-mono overflow-x-auto">{ex.input}</pre>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-700">Output:</p>
                                        <pre className="bg-gray-100 text-gray-800 p-2 rounded font-mono overflow-x-auto">{ex.output}</pre>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No examples available.</p>
                        )}
                    </div>

                    {/* Constraints */}
                    {problem.constraints && (
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m9-9a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Constraints
                            </h2>
                            <div className="bg-gray-50 border border-gray-200 p-4 rounded shadow-sm overflow-x-auto max-h-60">
                                <div className="text-gray-800 font-mono whitespace-pre-wrap">
                                    {
                                        problem.constraints?.map((constraint, idx) => {
                                            return (
                                                <p key={idx}>{constraint}</p>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProblemDetail