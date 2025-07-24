import React from 'react'

const Loader = () => {
  return (
   <div className="bg-gray-700 px-4 py-3 rounded-md flex items-center space-x-2 animate-pulse ">
      <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.1s]" />
      <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
      <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.3s]" />
    </div>
  )
}

export default Loader
