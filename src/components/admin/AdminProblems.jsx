import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { problemEndpoints } from '@/services/api';
import TableRow from '../table/TableRow';

const AdminProblems = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();
  const [refreshProblem, setRefreshProblem] = useState(false);

  const fetchProblems = async () => {
    try {
      const res = await axios.get(problemEndpoints.GET_ALL_PROBLEM);
      setProblems(res.data.data);
    } catch (err) {
      console.error("Error fetching problems:", err);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [refreshProblem]);

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
              <TableRow problem={problem} index={index} setRefreshProblem={setRefreshProblem}/>
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
