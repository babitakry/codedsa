import React, { useEffect, useState } from 'react';
import { Search, Filter } from "lucide-react"
import axios from 'axios';
import Question from '../components/Question/Question';
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

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortLevel, setSortLevel] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch_problem_list = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: problemEndpoints.GET_ALL_PROBLEM,
        params: {
          searchTerm: searchTerm,
          sortLevel: sortLevel
        }
      });
      setProblems(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching problems:", error);
      setError(error.response?.data?.error || error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch_problem_list();
  }, [searchTerm, sortLevel]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading problems...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto pt-3 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8 tracking-tight">
          Problems
        </h2>

        {/* Search & Filter - LeetCode style */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 border-b border-gray-200 pb-4 mb-6">
          {/* Search Input */}
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="search"
              type="text"
              placeholder="Search problems by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-44">
            <select
              id="sort"
              value={sortLevel}
              onChange={(e) => setSortLevel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base cursor-pointer appearance-none"
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        {(searchTerm || sortLevel) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-sm text-gray-600">
            <span>Filtering:</span>
            {searchTerm && (
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full font-medium text-xs sm:text-sm">
                "{searchTerm}"
              </span>
            )}
            {sortLevel && (
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full font-medium text-xs sm:text-sm">
                {sortLevel}
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm("");
                setSortLevel("");
              }}
              className="text-indigo-600 hover:text-indigo-800 font-medium ml-2 transition-colors duration-200 text-xs sm:text-sm"
            >
              Clear all
            </button>
          </div>
        )}
      </div>



      {/* Problems List */}
      <div className="mt-4 space-y-4 sm:space-y-6">
        {problems.length > 0 ? (
          problems.map((problem, ind) => (
            <Question index={ind} key={problem._id} problem={problem} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6 text-sm sm:text-base">
            No problems found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 sm:mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
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
