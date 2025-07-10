import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { adminEndpoints, problemEndpoints } from '@/services/api';

const AdminProblems = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  const fetchProblems = async () => {
    try {
      const res = await axios.get(problemEndpoints.GET_ALL_PROBLEM);
      setProblems(res.data.data);
    } catch (err) {
      console.error("Error fetching problems:", err);
    }
  };

  const deleteProblem = async (id) => {
    try {
      await axios.delete(problemEndpoints.DELETE_PROBLEM(id));
      setProblems(problems.filter(p => p._id !== id));
    } catch (err) {
      console.error("Error deleting problem:", err);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-700">Manage Problems</h2>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded shadow"
          onClick={() => navigate('/admin/problems/add')}
        >
          + Add Problem
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">S.No</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Topic</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Difficulty</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {problems.map((problem, index) => (
              <tr
                key={problem._id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50`}
              >
                <td className="px-4 py-3">{index+1}</td>
                <td className="px-4 py-3">{problem.title}</td>
                <td className="px-4 py-3">{problem.topic}</td>
                <td className="px-4 py-3">{problem.difficulty}</td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                    onClick={() => navigate(`/admin/problems/update/${problem._id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                    onClick={() => deleteProblem(problem._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {problems.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No problems found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProblems;
