import React, { useEffect, useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

const TestCase = ({ examples }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [example, setExample] = useState({});
  const [copied, setCopied] = useState(false);

  const onClickTestCase = (ind) => {
    setActiveIndex(ind);
    setExample(examples[ind]);
  };

  useEffect(() => {
    if (examples?.length > 0) {
      setExample(examples[0]);
    }
  }, [examples]);

  const copyTestCase = () => {
    if (!example) return;
    navigator.clipboard.writeText(`Input: ${example.input}\nOutput: ${example.output}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full p-3 bg-white dark:bg-[#282828] rounded-lg shadow-xs border border-neutral-200 dark:border-[#333333] text-neutral-800 dark:text-neutral-200 transition-colors flex flex-col overflow-hidden font-sans">
      {/* Top Testcase Tabs Header */}
      <div className="flex items-center justify-between gap-2 border-b border-neutral-200 dark:border-[#333333] pb-2 mb-2.5 flex-shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 text-xs font-semibold text-neutral-600 dark:text-neutral-400 mr-1">
            <Terminal size={14} className="text-[#00b8a3]" />
            <span>Testcases</span>
          </div>

          {examples?.map((ex, ind) => (
            <button
              key={ind}
              onClick={() => onClickTestCase(ind)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition cursor-pointer select-none ${
                activeIndex === ind
                  ? 'bg-neutral-100 dark:bg-[#383838] text-neutral-900 dark:text-white font-semibold shadow-xs'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-[#333333]'
              }`}
            >
              Case {ind + 1}
            </button>
          ))}
        </div>

        {/* Copy Button */}
        <button
          onClick={copyTestCase}
          className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition cursor-pointer flex-shrink-0"
          title="Copy testcase"
        >
          {copied ? (
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

      {/* Case Details Box */}
      <div className="flex-1 overflow-y-auto space-y-2 text-xs font-mono">
        <div>
          <div className="text-[11px] font-sans font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
            Input:
          </div>
          <div className="p-2 rounded bg-neutral-50 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#383838] text-neutral-800 dark:text-neutral-200 break-all">
            {example?.input || "No input provided"}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-sans font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
            Expected Output:
          </div>
          <div className="p-2 rounded bg-neutral-50 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-[#383838] text-neutral-800 dark:text-neutral-200 break-all">
            {example?.output || "No output provided"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCase;
