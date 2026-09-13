import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { problemEndpoints } from '@/services/api';
import {
  Code2,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  FileCode,
  Layers,
  Tag
} from 'lucide-react';

const AdminAddProblem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const editProblemData = location?.state;

  const isEditMode = Boolean(id || editProblemData?._id);

  const [formData, setFormData] = useState({
    sno: '',
    title: '',
    difficulty: 'Easy',
    topic: '',
    description: '',
    test_case: '',
    constraints: ['1 <= nums.length <= 10^5'],
    examples: [{ input: '', output: '', explanation: '' }],
    boiler_plate_code: [
      { lang: 'cpp', code: '// C++ Starter Code\nclass Solution {\npublic:\n    void solve() {\n        \n    }\n};' },
      { lang: 'python', code: '# Python Starter Code\nclass Solution:\n    def solve(self):\n        pass' },
      { lang: 'javascript', code: '// JavaScript Starter Code\nfunction solve() {\n    \n}' },
      { lang: 'java', code: '// Java Starter Code\nclass Solution {\n    public void solve() {\n        \n    }\n}' }
    ],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // If editing, load problem data
  useEffect(() => {
    if (editProblemData) {
      setFormData({
        sno: editProblemData.sno || '',
        title: editProblemData.title || '',
        difficulty: editProblemData.difficulty || 'Easy',
        topic: editProblemData.topic || '',
        description: editProblemData.description || '',
        test_case: editProblemData.test_case || '',
        constraints: editProblemData.constraints?.length ? editProblemData.constraints : [''],
        examples: editProblemData.examples?.length ? editProblemData.examples : [{ input: '', output: '', explanation: '' }],
        boiler_plate_code: editProblemData.boiler_plate_code?.length ? editProblemData.boiler_plate_code : formData.boiler_plate_code,
      });
    } else if (id) {
      const fetchProblem = async () => {
        try {
          const res = await axios.get(problemEndpoints.GET_PROBLEM_BY_ID(id));
          const p = res.data.data;
          if (p) {
            setFormData({
              sno: p.sno || '',
              title: p.title || '',
              difficulty: p.difficulty || 'Easy',
              topic: p.topic || '',
              description: p.description || '',
              test_case: p.test_case || '',
              constraints: p.constraints?.length ? p.constraints : [''],
              examples: p.examples?.length ? p.examples : [{ input: '', output: '', explanation: '' }],
              boiler_plate_code: p.boiler_plate_code?.length ? p.boiler_plate_code : formData.boiler_plate_code,
            });
          }
        } catch (err) {
          console.error("Error fetching problem details:", err);
        }
      };
      fetchProblem();
    }
  }, [id, editProblemData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExampleChange = (index, field, value) => {
    const updated = [...formData.examples];
    updated[index][field] = value;
    setFormData({ ...formData, examples: updated });
  };

  const handleConstraintChange = (index, value) => {
    const updated = [...formData.constraints];
    updated[index] = value;
    setFormData({ ...formData, constraints: updated });
  };

  const handleBoilerChange = (index, field, value) => {
    const updated = [...formData.boiler_plate_code];
    updated[index][field] = value;
    setFormData({ ...formData, boiler_plate_code: updated });
  };

  const addField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], value] }));
  };

  const removeField = (key, index) => {
    const updated = [...formData[key]];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, [key]: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditMode && (id || editProblemData?._id)) {
        const problemId = id || editProblemData?._id;
        const updateUrl = problemEndpoints.UPDATE_PROBLEM.replace(':id', problemId);
        await axios.put(updateUrl, formData);
      } else {
        await axios.post(problemEndpoints.CREATE_PROBLEM_API, formData);
      }
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin/problems");
      }, 700);
    } catch (err) {
      console.error("Error saving problem:", err);
      setError(err?.response?.data?.message || err.message || "Failed to save problem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 font-sans text-neutral-800 dark:text-neutral-200">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/problems')}
            className="p-2 rounded-lg border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#282828] hover:bg-neutral-100 dark:hover:bg-[#333333] text-neutral-600 dark:text-neutral-300 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              {isEditMode ? "Edit Problem" : "Add New Problem"}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              {isEditMode ? "Update problem details, testcases, and starter code." : "Fill in the metadata, test cases, and code templates for the problem."}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs sm:text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-lg bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 text-[#00b8a3] text-xs sm:text-sm">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>Problem saved successfully! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Section 1: Basic Information Card */}
        <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-[#333333] pb-3">
            <Tag className="w-4 h-4 text-[#00b8a3]" />
            <h2 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
              Basic Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* S.No */}
            <div>
              <label className="block mb-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Serial Number (#)
              </label>
              <input
                name="sno"
                type="number"
                value={formData.sno}
                onChange={handleChange}
                placeholder="e.g. 1"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-200 dark:border-[#383838] bg-neutral-50 dark:bg-[#1e1e1e] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3]"
                required
              />
            </div>

            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block mb-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Problem Title
              </label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Two Sum"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-200 dark:border-[#383838] bg-neutral-50 dark:bg-[#1e1e1e] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3]"
                required
              />
            </div>

            {/* Topic */}
            <div className="sm:col-span-2">
              <label className="block mb-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Topic / Category
              </label>
              <input
                name="topic"
                type="text"
                value={formData.topic}
                onChange={handleChange}
                placeholder="e.g. Array, Dynamic Programming, Tree"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-200 dark:border-[#383838] bg-neutral-50 dark:bg-[#1e1e1e] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3]"
                required
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block mb-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Difficulty Level
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-200 dark:border-[#383838] bg-neutral-50 dark:bg-[#1e1e1e] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3] cursor-pointer"
                required
              >
                <option value="Easy">Easy (Green)</option>
                <option value="Medium">Medium (Amber)</option>
                <option value="Hard">Hard (Red)</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Problem Statement Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the problem, task, input format, and output format..."
              rows={5}
              className="w-full p-3 text-xs sm:text-sm rounded-lg border border-neutral-200 dark:border-[#383838] bg-neutral-50 dark:bg-[#1e1e1e] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3] leading-relaxed"
              required
            />
          </div>

          {/* Test Case String */}
          <div>
            <label className="block mb-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Raw Testcase Payload
            </label>
            <input
              name="test_case"
              type="text"
              value={formData.test_case}
              onChange={handleChange}
              placeholder="e.g. [2,7,11,15]\n9"
              className="w-full px-3 py-2 text-xs sm:text-sm font-mono rounded-lg border border-neutral-200 dark:border-[#383838] bg-neutral-50 dark:bg-[#1e1e1e] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3]"
              required
            />
          </div>
        </div>

        {/* Section 2: Examples Card */}
        <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-[#333333] pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#ffc01e]" />
              <h2 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
                Examples ({formData.examples.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => addField('examples', { input: '', output: '', explanation: '' })}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#00b8a3] hover:underline cursor-pointer"
            >
              <Plus size={14} /> Add Example
            </button>
          </div>

          <div className="space-y-3">
            {formData.examples.map((ex, index) => (
              <div
                key={index}
                className="p-3.5 rounded-lg border border-neutral-200 dark:border-[#383838] bg-neutral-50 dark:bg-[#202020] space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                    Example {index + 1}
                  </span>
                  {formData.examples.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField('examples', index)}
                      className="text-red-500 hover:text-red-600 p-1 text-xs font-medium transition cursor-pointer"
                      title="Remove Example"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                      Input
                    </label>
                    <input
                      type="text"
                      value={ex.input}
                      onChange={(e) => handleExampleChange(index, 'input', e.target.value)}
                      placeholder="nums = [2,7,11,15], target = 9"
                      className="w-full px-2.5 py-1.5 text-xs font-mono rounded border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#1a1a1a] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                      Output
                    </label>
                    <input
                      type="text"
                      value={ex.output}
                      onChange={(e) => handleExampleChange(index, 'output', e.target.value)}
                      placeholder="[0,1]"
                      className="w-full px-2.5 py-1.5 text-xs font-mono rounded border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#1a1a1a] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                    Explanation (Optional)
                  </label>
                  <input
                    type="text"
                    value={ex.explanation || ''}
                    onChange={(e) => handleExampleChange(index, 'explanation', e.target.value)}
                    placeholder="Because nums[0] + nums[1] == 9, we return [0, 1]."
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#1a1a1a] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Constraints Card */}
        <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-[#333333] pb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-purple-400" />
              <h2 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
                Constraints ({formData.constraints.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => addField('constraints', '')}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#00b8a3] hover:underline cursor-pointer"
            >
              <Plus size={14} /> Add Constraint
            </button>
          </div>

          <div className="space-y-2">
            {formData.constraints.map((c, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={c}
                  onChange={(e) => handleConstraintChange(index, e.target.value)}
                  placeholder={`e.g. 1 <= nums.length <= 10^5`}
                  className="flex-1 px-3 py-1.5 text-xs font-mono rounded-lg border border-neutral-200 dark:border-[#383838] bg-neutral-50 dark:bg-[#1e1e1e] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3]"
                  required
                />
                {formData.constraints.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField('constraints', index)}
                    className="text-red-500 hover:text-red-600 p-1.5 transition cursor-pointer"
                    title="Remove Constraint"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Boilerplate Starter Code Card */}
        <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-[#333333] pb-3">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-[#3b82f6]" />
              <h2 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
                Boilerplate Code Templates ({formData.boiler_plate_code.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => addField('boiler_plate_code', { lang: '', code: '' })}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#00b8a3] hover:underline cursor-pointer"
            >
              <Plus size={14} /> Add Language
            </button>
          </div>

          <div className="space-y-4">
            {formData.boiler_plate_code.map((bp, index) => (
              <div
                key={index}
                className="p-3.5 rounded-lg border border-neutral-200 dark:border-[#383838] bg-neutral-50 dark:bg-[#202020] space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <div className="w-44">
                    <label className="block mb-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                      Language
                    </label>
                    <input
                      type="text"
                      value={bp.lang}
                      placeholder="cpp, python, javascript, java"
                      onChange={(e) => handleBoilerChange(index, 'lang', e.target.value)}
                      className="w-full px-2.5 py-1 text-xs font-medium capitalize rounded border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#1a1a1a] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3]"
                      required
                    />
                  </div>
                  {formData.boiler_plate_code.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField('boiler_plate_code', index)}
                      className="text-red-500 hover:text-red-600 p-1 transition cursor-pointer"
                      title="Remove Language"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                <div>
                  <label className="block mb-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                    Starter Code
                  </label>
                  <textarea
                    value={bp.code}
                    placeholder="Enter starter code skeleton..."
                    onChange={(e) => handleBoilerChange(index, 'code', e.target.value)}
                    rows={4}
                    className="w-full p-2.5 font-mono text-xs rounded border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#1a1a1a] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3] leading-relaxed"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin/problems')}
            className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#282828] hover:bg-neutral-100 dark:hover:bg-[#333333] text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[#00b8a3] hover:bg-[#00a390] text-white transition cursor-pointer shadow-xs disabled:opacity-50"
          >
            {loading ? "Saving Problem..." : isEditMode ? "Update Problem" : "Create Problem"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminAddProblem;
