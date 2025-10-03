import React from 'react'
import { useNavigate } from 'react-router'

const Question = ({ problem, index }) => {
  const navigate = useNavigate();

  const handleNavigate = (title, problemId) => {
    navigate(`${title}`, {
      state: problemId
    })
  }

  return (
    <div
      className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-transparent'} flex justify-between items-center px-4 border rounded-md py-3`}
    >
      <span className="w-8 flex-shrink-0">{index + 1}.</span>

      <div className="flex-1 px-4 min-w-0">
        {/* Title */}
        <p className="capitalize text-lg font-semibold truncate">
          {problem?.title}
        </p>
        {/* Topic */}
        <p className="text-sm text-gray-500 font-normal truncate">
          {problem?.topic}
        </p>
      </div>

      <div className="flex items-center space-x-4 flex-shrink-0">
        <p
          className={`font-semibold ${problem?.difficulty === 'Easy'
            ? 'text-green-500'
            : problem?.difficulty === 'Medium'
            ? 'text-yellow-500'
            : problem?.difficulty === 'Hard'
            ? 'text-red-500'
            : 'text-gray-500'
          }`}
        >
          {problem?.difficulty}
        </p>

        <button
          onClick={() => handleNavigate(problem?.title, problem?._id)}
          className="px-3 py-1 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-600 transition flex-shrink-0"
        >
          Solve Problem
        </button>
      </div>
    </div>
  )
}

export default Question
