import { useState } from "react";
import React from "react";
import MarkupTable from './MarkupTable';

const DropdownBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mx-auto mt-4">
      <div 
        className="bg-blue-400 text-white p-3 w-full h-[30px] rounded-lg py-1 flex cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 mt-1">
            <path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 mt-1">
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        )}
        <span className="color-white select-none ml-1">Markups</span>
      </div>

      
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-2 p-3 bg-gray-100 rounded-lg">
          <MarkupTable />
        </div>
      </div>
    </div>
  );
};

export default DropdownBar;
