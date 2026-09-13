import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-[70vh]'>
      <div className='animate-spin rounded-full h-12 w-12 border-3 border-neutral-200 dark:border-neutral-800 border-t-[#00b8a3]'>
      </div>        
    </div>
  )
}

export default Loading
