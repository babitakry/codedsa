import React, { useEffect, useState } from 'react';
import { Plus, TerminalSquare, SquareTerminal } from 'lucide-react';

const TestCase = ({ examples }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [example, setExample] = useState({});

  const onClickTestCase = (ind) => {
    setActiveIndex(ind);
    setExample(examples[ind]);
  };

  useEffect(() => {
    if (examples?.length > 0) {
      setExample(examples[0]);
    }
  }, [examples]);

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-md border border-gray-200">
      {/* Tabs */}
      <div className="flex items-center gap-3 border-b pb-3 mb-6">
        {examples?.map((_, ind) => (
          <button
            onClick={() => onClickTestCase(ind)}
            key={ind}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 border ${activeIndex === ind
                ? "bg-indigo-100 text-indigo-700 border-indigo-400 shadow-sm"
                : "text-gray-600 border-transparent hover:bg-gray-100"
              }`}
          >
            Case {ind + 1}
          </button>
        ))}
        <button
          className="ml-auto px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-100 rounded-md flex items-center gap-1 cursor-not-allowed"
          disabled
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* Test Case Content */}
      <div className="grid gap-6">
        {/* Input Section */}
        <div>
          <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
            {/* <TerminalSquare size={18} /> */}
            Input
          </label>
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm font-mono text-gray-800 whitespace-pre-wrap">
            {example.input}
          </div>
        </div>

        {/* Output Section */}
        <div>
          <label className="flex items-center gap-2 font-semibold text-gray-700 mb-1">
            {/* <SquareTerminal size={18} /> */}
            Output
          </label>
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm font-mono text-gray-800 whitespace-pre-wrap">
            {example.output}
          </div>
        </div>
      </div>

    </div>
  );
};

export default TestCase;
