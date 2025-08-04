import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, List, User, X } from 'lucide-react';
import axios from 'axios';
import { problemEndpoints } from '@/services/api';
import { Link, useNavigate } from 'react-router-dom';
import CodeBite from '../../assets/CodeBite.png';

export const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [problem, setProblem] = useState([]);
  const navigate = useNavigate();

  const fetch_problem = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: problemEndpoints.GET_ALL_PROBLEM,
      });
      setProblem(response.data.data);
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
  };

  useEffect(() => {
    fetch_problem();
  }, []);

  const handleNavigate = (title, problemId) => {
    setShowSidebar(false);
    navigate(`/problems/${title}`, {
      state: problemId,
    });
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm px-4 py-3">
        <div className="flex items-center justify-between relative">

          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src={CodeBite} className="h-8 w-8 rounded-full" alt="Logo" />
              <span className="font-semibold text-lg text-indigo-600">CodeBite</span>
            </Link>

            <button
              className="flex items-center space-x-2 px-3 py-1 hover:bg-gray-100 rounded transition"
              onClick={() => setShowSidebar(true)}
            >
              <List className="w-4 h-4" />
              <span className="text-sm font-medium">Problems</span>
            </button>
          </div>

          {/* Center Section */}
          <div className="absolute left-1/2 -translate-x-1/2 flex space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded-lg text-sm font-medium transition">
              Run
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-1.5 rounded-lg text-sm font-medium transition">
              Submit
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-5 h-5 text-gray-700" />
            </button>
            <span className="text-sm text-gray-700 cursor-pointer hover:underline">Register</span>
            <span className="text-sm text-gray-400">or</span>
            <span className="text-sm text-gray-700 cursor-pointer hover:underline">Sign in</span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-40"
            onClick={() => setShowSidebar(false)}
          />

          {/* Sidebar Panel */}
          <div className="relative z-50 w-80 bg-white h-full shadow-xl rounded-r-xl overflow-y-auto">
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Problem List</h2>
              <button
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => setShowSidebar(false)}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <ul className="divide-y text-sm">
              {problem.map((prob) => (
                <li
                  key={prob.id}
                  className="p-4 hover:bg-indigo-50 cursor-pointer transition"
                  onClick={() => handleNavigate(prob.title, prob._id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{prob.title}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        prob.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-700'
                          : prob.difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {prob.difficulty}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
