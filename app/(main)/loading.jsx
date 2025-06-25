import Loader from '@/components/Loader'
import React from 'react'

const loading = () => {
  return (
    
      <div className="bg-transparent max-w-screen max-h-screen h-screen flex justify-center items-center">
        <Loader />
     
    </div>
  )
}

export default loading
