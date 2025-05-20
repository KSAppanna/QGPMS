import { useState } from "react";
import React from "react";
import MarkupTable from './table/MarkupTable';

const DropdownBar = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[90%] mx-auto mt-4">
      {/* Toggle Button */}
      <div 
        className="bg-gradient-to-r from-blue-500 via-sky-300 to-blue-200 hover:from-blue-600 hover:via-sky-400 hover:to-blue-300 text-white flex items-center px-3 h-[36px] rounded-md cursor-pointer transition-colors duration-200 shadow-lg backdrop-blur-md" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          // Up Arrow
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" />
          </svg>
        ) : (
          // Down Arrow
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        )}
        <span className="ml-2 text-sm font-medium select-none">Markups</span>
      </div>

      {/* Dropdown Content */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`mt-2 p-3 rounded-md shadow-lg backdrop-blur-md ${theme === "light" ? "bg-gradient-to-r from-white/80 via-cyan-100/60 to-blue-100/80" : "bg-gradient-to-r from-slate-900/80 via-cyan-900/60 to-blue-900/80"}`}>
          <MarkupTable theme={theme}/> 
        </div>
      </div>
    </div>
  );
};

export default DropdownBar;