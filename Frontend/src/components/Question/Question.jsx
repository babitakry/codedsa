import React from 'react'
import { Link } from 'react-router'


const Question = ({ problem, index }) => {
  console.log(problem)
  return (
    <div
      className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-transparent'} flex justify-between items-center px-4 border rounded-md py-3`}
    >
      <span className="w-8">{index+1}.</span>

      <div className="flex-1 px-4">
        <p className="capitalize text-lg font-semibold">{problem?.title}</p>
        <p className="text-sm text-gray-500 font-normal">{problem?.topic}</p>
      </div>

      <div className="flex items-center space-x-4">
        <p className="">{problem?.difficulty}</p>
        <Link to={problem?.title}className="px-3 py-1 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-600 transition">
          Solve Problem
        </Link>
      </div>
    </div>
  )
}

export default Question
