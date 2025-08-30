import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { adminEndpoints } from '@/services/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(adminEndpoints.ALL_USERS_API);
      setUsers(res.data.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full bg-gray-50 min-h-screen flex-1 px-4 mt-6">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">All Users</h2>
      <div className="w-full overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full min-w-max divide-y divide-gray-200 bg-white">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Username</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Country</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">College</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Solved</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Submissions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`hover:bg-indigo-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.country || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.college || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-700">{user.solved_no_questions}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-700">{user.total_submission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
