import React from 'react'
import { Link, useNavigate } from 'react-router'


const Question = ({ problem, index }) => {
  // console.log(problem)
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
      <span className="w-8">{index + 1}.</span>

      <div className="flex-1 px-4">
        <p className="capitalize text-lg font-semibold">{problem?.title}</p>
        <p className="text-sm text-gray-500 font-normal">{problem?.topic}</p>
      </div>

      <div className="flex items-center space-x-4">
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
          className="px-3 py-1 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-600 transition">
          Solve Problem
        </button>
      </div>
    </div>
  )
}

export default Question
