import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { problemEndpoints } from '@/services/api';
import AdminProblemRow from '@/components/admin/AdminProblemRow';
import { Code2, Plus, Search, Layers, CheckCircle2, ChevronDown } from 'lucide-react';
import Loading from '@/components/common/Loading';

const AdminProblems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [refreshProblem, setRefreshProblem] = useState(false);
  const navigate = useNavigate();

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(problemEndpoints.GET_ALL_PROBLEM);
      setProblems(res.data.data || []);
    } catch (err) {
      console.error("Error fetching problems:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [refreshProblem]);

  // Difficulty Counts
  const easyCount = useMemo(() => problems.filter((p) => p.difficulty?.toLowerCase() === 'easy').length, [problems]);
  const mediumCount = useMemo(() => problems.filter((p) => p.difficulty?.toLowerCase() === 'medium').length, [problems]);
  const hardCount = useMemo(() => problems.filter((p) => p.difficulty?.toLowerCase() === 'hard').length, [problems]);

  // Filtered Problems
  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      const matchSearch =
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.topic?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchDifficulty =
        difficultyFilter === 'ALL' ||
        p.difficulty?.toLowerCase() === difficultyFilter.toLowerCase();

      return matchSearch && matchDifficulty;
    });
  }, [problems, searchTerm, difficultyFilter]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 font-sans text-neutral-800 dark:text-neutral-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Problem Management
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Create, update, and manage the algorithmic coding catalog.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/problems/add')}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#00b8a3] hover:bg-[#00a390] text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Problem</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Problems */}
        <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Total Problems</span>
            <div className="w-8 h-8 rounded-lg bg-[#00b8a3]/10 text-[#00b8a3] flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">
            {problems.length}
          </p>
        </div>

        {/* Easy */}
        <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Easy Level</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#00b8a3]" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#00b8a3] mt-2">
            {easyCount}
          </p>
        </div>

        {/* Medium */}
        <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Medium Level</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffc01e]" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#ffc01e] mt-2">
            {mediumCount}
          </p>
        </div>

        {/* Hard */}
        <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Hard Level</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff375f]" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#ff375f] mt-2">
            {hardCount}
          </p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, topic..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3] placeholder:text-neutral-400 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="inline-flex rounded-lg border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#282828] p-1 text-xs">
            {["ALL", "Easy", "Medium", "Hard"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setDifficultyFilter(lvl)}
                className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                  difficultyFilter === lvl
                    ? "bg-[#00b8a3] text-white shadow-xs"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {lvl === "ALL" ? "All Levels" : lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Problems Table Card */}
      <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl shadow-xs overflow-hidden transition-colors">
        {loading ? (
          <div className="py-16">
            <Loading />
          </div>
        ) : filteredProblems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-neutral-50 dark:bg-[#202020] border-b border-neutral-200 dark:border-[#383838] text-neutral-600 dark:text-neutral-400 font-medium">
                  <th className="px-5 py-3.5 w-16">#</th>
                  <th className="px-4 py-3.5">Title</th>
                  <th className="px-4 py-3.5">Topic</th>
                  <th className="px-4 py-3.5">Difficulty</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-[#333333]">
                {filteredProblems.map((problem, index) => (
                  <AdminProblemRow
                    key={problem._id || index}
                    problem={problem}
                    index={index}
                    setRefreshProblem={setRefreshProblem}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-neutral-400 dark:text-neutral-500 text-xs sm:text-sm">
            <Code2 className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="font-semibold text-neutral-800 dark:text-neutral-200">No problems found</p>
            <p className="mt-1">Try adjusting your search criteria or create a new problem.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminProblems;
