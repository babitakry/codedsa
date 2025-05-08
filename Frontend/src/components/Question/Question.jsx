import React from 'react'

const Question = ({ problem,index }) => {
    return (
        <div className={`font-bold ${index%2==0 ? "bg-gray-100" : "bg-transparent"} flex justify-between items-center px-4 border rounded-md py-2`}>
            <span>{problem?.Q_no}.</span>
            <p className='capitalize'>{problem?.Q_name}</p>
            <p className=' '>{problem?.Q_level}.</p>
        </div>
    )
}

export default Question