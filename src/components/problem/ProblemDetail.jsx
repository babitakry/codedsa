import React, { useState } from 'react';
import { Tag, Lightbulb, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ProblemDetail = ({ problem }) => {
    const [hintOpen, setHintOpen] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (text, idx) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="w-full text-neutral-800 dark:text-neutral-200 transition-colors pb-10 font-sans">
            <div className="space-y-5">

                {/* Problem Title */}
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
                        {problem?.sno ? `${problem.sno}. ` : ''}{problem?.title}
                    </h1>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                        {problem?.difficulty && (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                problem.difficulty === 'Easy'
                                    ? 'text-[#00b8a3] bg-[#00b8a3]/10'
                                    : problem.difficulty === 'Medium'
                                    ? 'text-[#ffc01e] bg-[#ffc01e]/10'
                                    : 'text-[#ff375f] bg-[#ff375f]/10'
                            }`}>
                                {problem.difficulty}
                            </span>
                        )}

                        {problem?.topic && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-[#333333] text-neutral-600 dark:text-neutral-300">
                                <Tag size={11} className="text-neutral-400" />
                                {problem.topic}
                            </span>
                        )}
                    </div>
                </div>

                <div className="h-[1px] w-full bg-neutral-100 dark:bg-[#333333]" />

                {/* Problem Statement Body (Rendered via ReactMarkdown for inline code formatting like `nums`, `target`) */}
                <div className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code: ({ inline, className, children, ...props }) => (
                                <code
                                    className="bg-neutral-100 dark:bg-[#333333] text-[#00b8a3] dark:text-[#00b8a3] px-1.5 py-0.5 rounded text-xs font-mono font-medium border border-neutral-200 dark:border-neutral-700"
                                    {...props}
                                >
                                    {children}
                                </code>
                            ),
                            p: ({ children }) => (
                                <p className="mb-3 leading-relaxed text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                                    {children}
                                </p>
                            ),
                            strong: ({ children }) => (
                                <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
                                    {children}
                                </strong>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-disc list-outside pl-4 space-y-1 my-2 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                                    {children}
                                </ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal list-outside pl-4 space-y-1 my-2 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                                    {children}
                                </ol>
                            ),
                            li: ({ children }) => (
                                <li className="text-xs sm:text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                                    {children}
                                </li>
                            ),
                        }}
                    >
                        {problem?.description || ""}
                    </ReactMarkdown>
                </div>

                {/* Examples Section */}
                {problem?.examples && problem.examples.length > 0 && (
                    <div className="space-y-4 pt-2">
                        {problem.examples.map((example, idx) => (
                            <div
                                key={idx}
                                className="bg-neutral-50 dark:bg-[#202020] rounded-lg border border-neutral-200 dark:border-[#333333] p-4 text-xs font-mono space-y-2 relative group"
                            >
                                <div className="flex items-center justify-between text-neutral-900 dark:text-neutral-100 font-semibold font-sans mb-1">
                                    <span>Example {idx + 1}:</span>
                                    <button
                                        onClick={() => handleCopy(`Input: ${example.input}\nOutput: ${example.output}`, idx)}
                                        className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 opacity-0 group-hover:opacity-100 transition flex items-center gap-1 cursor-pointer font-sans"
                                    >
                                        {copiedIndex === idx ? (
                                            <>
                                                <Check size={12} className="text-[#00b8a3]" />
                                                <span className="text-[#00b8a3]">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={12} />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="space-y-1">
                                    <div>
                                        <span className="font-semibold text-neutral-500 dark:text-neutral-400">Input: </span>
                                        <span className="text-neutral-800 dark:text-neutral-200">{example.input}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-neutral-500 dark:text-neutral-400">Output: </span>
                                        <span className="text-neutral-800 dark:text-neutral-200">{example.output}</span>
                                    </div>
                                    {example.explanation && (
                                        <div className="pt-1 font-sans text-neutral-600 dark:text-neutral-400 text-xs">
                                            <span className="font-semibold text-neutral-700 dark:text-neutral-300">Explanation: </span>
                                            {example.explanation}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Constraints Section */}
                {problem?.constraints && problem.constraints.length > 0 && (
                    <div className="space-y-2 pt-2">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            Constraints:
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                            {problem.constraints.map((c, idx) => (
                                <li key={idx} className="leading-relaxed">
                                    <span className="bg-neutral-100 dark:bg-[#202020] px-1.5 py-0.5 rounded border border-neutral-200 dark:border-[#333333]">
                                        {c}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Hints Collapsible */}
                {problem?.hints && (
                    <div className="border-t border-neutral-200 dark:border-[#333333] pt-4">
                        <button
                            onClick={() => setHintOpen(!hintOpen)}
                            className="flex items-center justify-between w-full p-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-medium transition cursor-pointer"
                        >
                            <div className="flex items-center gap-2">
                                <Lightbulb size={15} />
                                <span>Need a Hint?</span>
                            </div>
                            {hintOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                        </button>

                        {hintOpen && (
                            <div className="mt-2 p-3 rounded-lg bg-neutral-50 dark:bg-[#202020] border border-neutral-200 dark:border-[#333333] text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                {problem.hints}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProblemDetail;
