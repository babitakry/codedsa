import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

const TestCase = ({ examples }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [example, setExample] = useState({});

  const onClickTestCase = (ind) => {
    console.log(ind, examples)
    setActiveIndex(ind);
    setExample(examples[ind]);
  }

  console.log("exmap", example)
  useEffect(() => {
    if (examples?.length > 0) {
      console.log(examples)
      setExample(examples[0])
    }
  }, [examples])
  return (
    <div className="w-full p-4 bg-white rounded shadow border border-gray-200">
      {/* Tabs */}
      <div className="flex items-center space-x-4 border-b pb-2 mb-4">
        {examples?.map((obj, ind) => {
          return (
            <button
              onClick={() => onClickTestCase(ind)}
              key={ind}
              className={`px-4 py-1 ${activeIndex === ind ? "border-b-2" : " "} border-indigo-500 font-medium text-indigo-600`}
            >
              Case {ind + 1}
            </button>
          );
        })}
        <button
          className="ml-auto px-2 py-1 text-indigo-600 hover:bg-indigo-100 rounded flex items-center gap-1 cursor-not-allowed"
          disabled
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <div className="flex flex-col space-y-2">
          <div>
            <label className="font-medium text-gray-700">Input</label>
            <textarea
              className="w-full h-16 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              value={example.input}
            />
          </div>
        </div>


        {/* Output Section */}
        <div className="flex flex-col space-y-2">
          <div>
            <label className="font-medium text-gray-700">Output</label>
            <textarea
              className="w-full h-16 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              value={example.output}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default TestCase;
