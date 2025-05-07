import { useState } from "react";
import React from "react";

const DropdownBar = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[100%] mx-auto mt-4">
      
      <div 
        className="bg-blue-400 text-white p-3 w-[100%] h-[30px] rounded-lg py-1 flex"
        onClick={() => setIsOpen(!isOpen)} // Toggles the dropdown visibility
      >
        {/* Conditional rendering for the dropdown icon */}
        {isOpen ? (
          // Upward-facing arrow when dropdown is open
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 mt-1">
            <path fillRule="evenodd" d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z" clipRule="evenodd" />
          </svg>
        ) : (
          // Downward-facing arrow when dropdown is closed
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 mt-1">
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        )}
 
        <span className="color-white select-none ml-1">Attachments</span>
      </div>
      
      {/* Dropdown content: only visible when `isOpen` is true */}
      {isOpen && (
        <div className="mt-2 p-3 bg-gray-100 rounded-lg">
        </div>
      )}
    </div>
  );
};

export default DropdownBar;