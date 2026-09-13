import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, List, Shuffle, Play, CheckCircle2, User, X, Search } from 'lucide-react';
import axios from 'axios';
import { problemEndpoints } from '@/services/api';
import { Link, useNavigate } from 'react-router-dom';
import CodeBite from '@/assets/CodeBite.png';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/common/ThemeToggle';

export const ProblemHeader = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [problems, setProblems] = useState([]);
  const [drawerSearch, setDrawerSearch] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const fetchProblems = async () => {
    try {
      const response = await axios.get(problemEndpoints.GET_ALL_PROBLEM);
      setProblems(response.data.data || []);
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleNavigate = (title, problemId) => {
    setShowSidebar(false);
    navigate(`/problems/${title}`, { state: problemId });
  };

  const handleRandomProblem = () => {
    if (problems.length > 0) {
      const randomIndex = Math.floor(Math.random() * problems.length);
      const randProb = problems[randomIndex];
      navigate(`/problems/${randProb.title}`, { state: randProb._id });
    }
  };

  const filteredProblems = problems.filter((p) =>
    p.title?.toLowerCase().includes(drawerSearch.toLowerCase()) ||
    p.topic?.toLowerCase().includes(drawerSearch.toLowerCase())
  );

  return (
    <>
      <header className="h-12 w-full bg-white dark:bg-[#1a1a1a] border-b border-neutral-200 dark:border-[#2e2e2e] flex items-center justify-between px-3 sm:px-4 text-xs font-sans select-none z-30 transition-colors">
        
        {/* Left Section: Logo & Problem List Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/" className="flex items-center gap-2 hover:opacity-85 transition">
            <img src={CodeBite} alt="Logo" className="w-6 h-6 rounded-full" />
            <span className="font-bold text-sm tracking-tight text-neutral-900 dark:text-neutral-100 hidden sm:inline">
              CodeDSA
            </span>
          </Link>

          <div className="h-4 w-[1px] bg-neutral-200 dark:bg-neutral-700 hidden sm:block mx-1" />

          {/* Problem List Drawer Trigger */}
          <button
            onClick={() => setShowSidebar(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-100 dark:bg-[#282828] hover:bg-neutral-200 dark:hover:bg-[#333333] text-neutral-700 dark:text-neutral-300 font-medium transition cursor-pointer"
          >
            <List className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
            <span>Problem List</span>
          </button>

          {/* Random Problem Shuffle */}
          <button
            onClick={handleRandomProblem}
            title="Pick Random Problem"
            className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-[#282828] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center Section: Run & Submit Actions */}
        <div className="flex items-center gap-2">
          <button
            id="run-code-btn"
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-neutral-100 dark:bg-[#282828] hover:bg-neutral-200 dark:hover:bg-[#333333] text-neutral-700 dark:text-neutral-300 font-semibold transition cursor-pointer shadow-none active:scale-98"
          >
            <Play className="w-3 h-3 text-[#00b8a3] fill-[#00b8a3]" />
            <span>Run</span>
          </button>

          <button
            id="submit-code-btn"
            className="flex items-center gap-1 px-3.5 py-1.5 rounded bg-[#00b8a3] hover:bg-[#00a390] text-white font-semibold transition cursor-pointer shadow-xs active:scale-98"
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Submit</span>
          </button>
        </div>

        {/* Right Section: Theme Toggle, Profile, Links */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {isAuthenticated ? (
            <Link
              to="/profile"
              className="flex items-center justify-center w-7 h-7 rounded-full bg-neutral-100 dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] hover:border-[#00b8a3] text-neutral-700 dark:text-neutral-300 transition"
              title="Profile"
            >
              <User className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              to="/signin"
              className="px-2.5 py-1 rounded text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Slide-in Problem List Sidebar Drawer */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex font-sans">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setShowSidebar(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-80 sm:w-96 bg-white dark:bg-[#1f1f1f] text-neutral-800 dark:text-neutral-200 h-full shadow-2xl z-10 flex flex-col border-r border-neutral-200 dark:border-[#333333]">
            {/* Drawer Header */}
            <div className="p-4 border-b border-neutral-200 dark:border-[#333333] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <List className="w-4 h-4 text-[#00b8a3]" />
                <h2 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                  All Problems ({problems.length})
                </h2>
              </div>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-[#2c2c2c] text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Filter inside Drawer */}
            <div className="p-3 border-b border-neutral-100 dark:border-[#2a2a2a]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Filter problems..."
                  value={drawerSearch}
                  onChange={(e) => setDrawerSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-md focus:outline-none focus:border-[#00b8a3] placeholder:text-neutral-400"
                />
              </div>
            </div>

            {/* Problems List in Drawer */}
            <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 dark:divide-[#282828]">
              {filteredProblems.map((p, idx) => (
                <div
                  key={p._id || idx}
                  onClick={() => handleNavigate(p.title, p._id)}
                  className="p-3 hover:bg-neutral-50 dark:hover:bg-[#282828] cursor-pointer transition flex items-center justify-between gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100 truncate hover:text-[#00b8a3]">
                      {p.sno ? `${p.sno}. ` : `${idx + 1}. `}{p.title}
                    </p>
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                      {p.topic}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-semibold flex-shrink-0 ${
                      p.difficulty === 'Easy'
                        ? 'text-[#00b8a3]'
                        : p.difficulty === 'Medium'
                        ? 'text-[#ffc01e]'
                        : 'text-[#ff375f]'
                    }`}
                  >
                    {p.difficulty}
                  </span>
                </div>
              ))}
              {filteredProblems.length === 0 && (
                <div className="p-8 text-center text-xs text-neutral-400">
                  No problems matched your filter.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProblemHeader;
