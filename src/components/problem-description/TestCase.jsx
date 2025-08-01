import React, { useState } from 'react';

const TestCase = ({ examples = [] }) => {
  const [activeTab, setActiveTab] = useState('case-0');
  const [customCases, setCustomCases] = useState([]);

  const addCustomCase = () => {
    const newIndex = customCases.length;
    setCustomCases([...customCases, { input: '', output: '' }]);
    setActiveTab(`custom-${newIndex}`);
  };

  const handleCustomChange = (index, field, value) => {
    const updated = [...customCases];
    updated[index][field] = value;
    setCustomCases(updated);
  };

  const renderTabs = () => (
    <div className="flex flex-wrap gap-2 mb-3">
      {examples.map((_, idx) => (
        <button
          key={`case-${idx}`}
          className={`px-3 py-1 rounded border text-sm ${
            activeTab === `case-${idx}` ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'
          }`}
          onClick={() => setActiveTab(`case-${idx}`)}
        >
          Case {idx + 1}
        </button>
      ))}

      {customCases.map((_, idx) => (
        <button
          key={`custom-${idx}`}
          className={`px-3 py-1 rounded border text-sm ${
            activeTab === `custom-${idx}` ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'
          }`}
          onClick={() => setActiveTab(`custom-${idx}`)}
        >
          Custom {idx + 1}
        </button>
      ))}

      <button
        className="px-3 py-1 rounded border text-indigo-600 border-indigo-600 hover:bg-indigo-100 text-sm"
        onClick={addCustomCase}
      >
        +
      </button>
    </div>
  );

  const renderTestCase = () => {
    if (activeTab.startsWith('case-')) {
      const idx = parseInt(activeTab.split('-')[1]);
      return (
        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Input</label>
            <textarea
              value={examples[idx]?.input || ''}
              readOnly
              className="border rounded p-2 h-[40px] w-full text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Output</label>
            <textarea
              value={examples[idx]?.output || ''}
              readOnly
              className="border rounded p-2 h-[40px] w-full text-sm"
            />
          </div>
        </div>
      );
    } else {
      const idx = parseInt(activeTab.split('-')[1]);
      return (
        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Input</label>
            <textarea
              value={customCases[idx]?.input}
              onChange={(e) => handleCustomChange(idx, 'input', e.target.value)}
              placeholder="Input"
              className="border rounded p-2 h-[40px] w-full text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Expected Output</label>
            <textarea
              value={customCases[idx]?.output}
              onChange={(e) => handleCustomChange(idx, 'output', e.target.value)}
              placeholder="Expected Output"
              className="border rounded p-2 h-[40px] w-full text-sm"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-white p-4 rounded border">
      {renderTabs()}
      {renderTestCase()}
    </div>
  );
};

export default TestCase;
