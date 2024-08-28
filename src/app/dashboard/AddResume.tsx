import React from 'react'
import { FaFolderPlus } from 'react-icons/fa'

const AddResume = () => {
  return (
    <div>
      <div className="px-14 py-24 border flex items-center justify-center bg-secondary rounded-lg h-[280px] cursor-pointer hover:scale-105 transition-all hover:shadow-xl border-dashed">
        <FaFolderPlus />
      </div>
    </div>
  )
}

export default AddResume
