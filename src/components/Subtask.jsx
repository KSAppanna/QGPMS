import { useState } from "react";
import React from "react";
import ResizableTable from "./table/ResizableTable";

const DropdownBar = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mx-auto mt-4">
      <div
        className="bg-sky-400 hover:bg-sky-500 text-white flex items-center p-2 w-full h-[36px] rounded-md cursor-pointer transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path
              fillRule="evenodd"
              d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <span className="ml-2 text-sm font-medium select-none">Subtask</span>
      </div>

      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`mt-2 p-3 border border-gray-200 rounded-md shadow-sm ${theme === "light" ? "bg-white" : "bg-black"}`}>
          {/* Label updated with theme-based styling */}
          <label className={`block text-sm font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
            Subtask Information
          </label>
          <ResizableTable />
        </div>
      </div>
    </div>
  );
};

export default DropdownBar;