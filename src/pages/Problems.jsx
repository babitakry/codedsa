import React, { useEffect, useState } from 'react';
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
        url: "http://localhost:3000/api/v1/problems/getallproblem",
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
      <h2 className='text-4xl text-center font-semibold text-primary mt-10'>Problems List</h2>

      {/* 🔍 Search Input */}
      <div className='flex justify-center mt-6 mb-4'>
        <input
          type='text'
          placeholder='Search problem by title...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border border-gray-300 rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />

        <select
          value={sortLevel}
          onChange={(e) => setSortLevel(e.target.value)}
          className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
        >
          <option value=''>Sort by Level</option>
          <option value='Easy'>Easy</option>
          <option value='Medium'>Medium</option>
          <option value='Hard'>Hard</option>
        </select>
      </div>

      {/* 🧠 Problems List */}
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
