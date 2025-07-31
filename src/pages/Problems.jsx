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
    <div className='max-w-6xl mx-auto min-h-screen'>
      <div className="max-w-4xl mx-auto pt-3">
    
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 tracking-tight">Problems List</h2>

      {/* Search & Sort */}
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-8 mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800 flex items-center gap-2" htmlFor="search">
              <Search className="w-4 h-4 text-indigo-600" />
              Search by Title
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="e.g. Two Sum, Binary Tree..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-white hover:border-gray-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800 flex items-center gap-2" htmlFor="sort">
              <Filter className="w-4 h-4 text-indigo-600" />
              Filter by Difficulty
            </label>
            <div className="relative">
              <select
                id="sort"
                value={sortLevel}
                onChange={(e) => setSortLevel(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-white hover:border-gray-300 appearance-none cursor-pointer"
              >
                <option value="">All Levels</option>
                <option value="Easy"> Easy</option>
                <option value="Medium"> Medium</option>
                <option value="Hard"> Hard</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        {(searchTerm || sortLevel) && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span>Filtering:</span>
              {searchTerm && (
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium">"{searchTerm}"</span>
              )}
              {sortLevel && (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-medium">
                  {sortLevel === "Easy" }
                  {sortLevel === "Medium"}
                  {sortLevel === "Hard"}
                  {sortLevel}
                </span>
              )}
              {(searchTerm || sortLevel) && (
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSortLevel("")
                  }}
                  className="text-indigo-600 hover:text-indigo-800 font-medium ml-2 transition-colors duration-200"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
      {/* Problems List */}
      <div className='mt-4'>
        {problems.length > 0 ? (
          problems.map((problem, ind) => (
            <Question
              index={ind}
              key={problem._id}
              problem={problem}
            />
          ))
        ) : (
          <p className='text-center text-gray-500 mt-6'>No problems found.</p>
        )}
      </div>

      {/* 📄 Pagination (static for now) */}
      <div className='mt-4'>
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
