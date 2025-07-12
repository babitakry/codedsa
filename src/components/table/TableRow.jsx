import React, { useState } from 'react'
import { problemEndpoints } from '@/services/api';
import axios from 'axios';

const TableRow = ({index, problem , setRefreshProblem}) => {
    const [loading, setLoading] = useState(false);
    const deleteProblem = async (id) => {
        try {
          setLoading(true)
          await axios.delete(problemEndpoints.DELETE_PROBLEM(id));
          console.log("Deleting problem at:", problemEndpoints.DELETE_PROBLEM(id));
          setRefreshProblem((prev)=>!prev);
    
        } catch (err) {
          console.error("Error deleting problem:", err);
        } finally{
          setLoading(false);
        }
      };
    return (
        <tr
            className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50`}
        >
            <td className="px-4 py-3">{index + 1}</td>
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
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                    onClick={() => deleteProblem(problem._id)}
                >
                    {loading ? "Deleting" : "Delete"}
                </button>
            </td>
        </tr>
    )
}

export default TableRow
