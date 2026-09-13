import React, { useEffect, useState } from 'react';
import { Search, Shuffle, ChevronDown } from "lucide-react";
import axios from 'axios';
import ProblemCard from '@/components/problems/ProblemCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { problemEndpoints } from '@/services/api';
import Loading from '@/components/common/Loading';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  "All Topics",
  "Array",
  "String",
  "Hash Table",
  "Dynamic Programming",
  "Math",
  "Sorting",
  "Greedy",
  "Tree",
  "Binary Search",
  "Two Pointers"
];

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortLevel, setSortLevel] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProblemList = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: problemEndpoints.GET_ALL_PROBLEM,
        params: {
          searchTerm: searchTerm,
          sortLevel: sortLevel
        }
      });
      setProblems(response.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching problems:", err);
      setError(err.response?.data?.error || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblemList();
  }, [searchTerm, sortLevel]);

  const handleRandomProblem = () => {
    if (problems.length > 0) {
      const rand = problems[Math.floor(Math.random() * problems.length)];
      navigate(`/problems/${rand.title}`, { state: rand._id });
    }
  };

  const filteredProblems = problems.filter((prob) => {
    if (selectedTopic === 'All Topics') return true;
    return prob?.topic?.toLowerCase() === selectedTopic.toLowerCase();
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-sm text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen px-4 sm:px-6 lg:px-8 py-6 text-neutral-800 dark:text-neutral-200 font-sans">
      
      {/* Topic Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-4">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer select-none ${
              selectedTopic === topic
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs"
                : "bg-neutral-100 dark:bg-[#282828] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-[#333333]"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-lg">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="search"
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-[#202020] border border-neutral-200 dark:border-[#383838] text-neutral-900 dark:text-neutral-100 rounded-md pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#00b8a3] placeholder:text-neutral-400"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="relative w-36">
            <select
              id="sort"
              value={sortLevel}
              onChange={(e) => setSortLevel(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-[#202020] border border-neutral-200 dark:border-[#383838] text-neutral-900 dark:text-neutral-100 rounded-md px-3 py-1.5 pr-7 text-xs focus:outline-none focus:border-[#00b8a3] cursor-pointer appearance-none"
            >
              <option value="" className="dark:bg-[#202020]">Difficulty</option>
              <option value="Easy" className="dark:bg-[#202020]">Easy</option>
              <option value="Medium" className="dark:bg-[#202020]">Medium</option>
              <option value="Hard" className="dark:bg-[#202020]">Hard</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Pick One Random Button */}
        <button
          onClick={handleRandomProblem}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-[#00b8a3]/10 hover:bg-[#00b8a3]/20 text-[#00b8a3] rounded-md text-xs font-medium transition cursor-pointer select-none border border-[#00b8a3]/20"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Pick One</span>
        </button>
      </div>

      {/* Problem Table Card */}
      <div className="rounded-lg border border-neutral-200 dark:border-[#333333] bg-white dark:bg-[#1f1f1f] shadow-xs overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50 dark:bg-[#262626] border-b border-neutral-200 dark:border-[#333333] text-xs font-medium text-neutral-500 dark:text-neutral-400">
          <span className="flex-1">Title</span>
          <div className="flex items-center gap-4 sm:gap-8 flex-shrink-0">
            <span className="hidden md:inline-block w-24">Topic</span>
            <span className="w-16">Difficulty</span>
            <span className="hidden sm:inline-block w-16 text-right">Status</span>
          </div>
        </div>

        {/* Problem Rows */}
        <div className="divide-y divide-neutral-100 dark:divide-[#2a2a2a]">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem, ind) => (
              <ProblemCard index={ind} key={problem._id || ind} problem={problem} />
            ))
          ) : (
            <p className="text-center text-neutral-400 dark:text-neutral-500 py-12 text-xs">
              No problems found matching your criteria.
            </p>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Problems;
