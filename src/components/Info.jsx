import { useState } from "react";
import React from "react";

const DropdownBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full mx-auto mt-4 relative">
      
      <div
        className="bg-blue-400 text-white p-3 w-full h-[30px] rounded-lg py-1 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Conditional rendering of the dropdown icon based on state (isOpen) */}

        <div className="flex items-center">
          {isOpen ? (
            // Upward-facing arrow when dropdown is open
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            // Downward-facing arrow when dropdown is closed
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5 mt-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <span className="ml-1 select-none">Information</span>
        </div>

           {/* Conditional rendering of the plus icon to show the form  */}
        <div
          className="ml-auto"
          onClick={(e) => {
            e.stopPropagation();
            setShowForm(true);
          }}
        >
           {/* Plus icon to show the form */}
          <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
      </div>

      {/* Dropdown content: only visible when `isOpen` is true */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[320px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-2 p-3 bg-white rounded-lg">
        <form className="grid grid-cols-4 gap-4">
              <div className="text-gray-500">
                Task ID:
                <input type="text" className="p-2 rounded-xl w-full h-[30px] bg-gray-200 text-black" value="IQC-0000138" disabled />
              </div>
              <div className="text-gray-500">
                Job-ID:
                <input type="text" className="p-2 rounded-xl w-full h-[30px] bg-gray-200 text-black" value="32323232" disabled />
              </div>
              <div className="text-gray-500">
                Milestone:
                <input type="text" className="p-2 rounded-xl w-full h-[30px] bg-gray-200 text-black" value="323232-Planning" disabled />
              </div>
              <div className="text-gray-500">
                Task Type:
                <input type="text" className="p-2 rounded-xl w-full h-[30px] bg-gray-200 text-black" value="IQC" disabled />
              </div>
              <div className="text-gray-500">
                Owner:
                <input type="text" className="p-2 rounded-xl w-full h-[30px] bg-gray-200 text-black" value="Vinod Kumar Chinta" disabled />
              </div>
              <div className="text-gray-500">
                QC Checklist:
                <input type="text" className="p-2 rounded-xl w-full h-[30px] bg-gray-200 text-black" value="QGPMS-Testing-ATX" disabled />
              </div>
              <div className="text-gray-500">
                Iteration:
                <input type="text" className="p-2 rounded-xl w-full h-[30px] bg-gray-200 text-black" value="0" disabled />
              </div>
              <div className="text-gray-500">
                QC Score:
                <input type="text" className="p-2 rounded-xl w-full h-[30px] bg-gray-200 text-black" value="0" disabled />
              </div>
              <div className="text-gray-500">
                Total Time:
                <input type="text" className="p-2 rounded-xl w-full h-[30px] bg-gray-200 text-black" value="2:08 min / 0:02 hrs" disabled />
              </div>
              <div className="text-gray-500">
                Production Task ID:
                <input type="text" className="p-2 rounded-xl w-full h-[30px] bg-gray-200 text-black" value="PROD-0000158" disabled />
              </div>
              <div className="text-gray-500">
                Start Date:
                <input type="text" className="p-2 rounded-xl w-full h-[30px] bg-gray-200 text-black" value="5/24/24" disabled />
              </div>
              <div className="text-gray-500">
                End Date:
                <input type="text" className="p-2 rounded-xl w-full h-[30px] bg-gray-200 text-black" value="" disabled />
              </div>
            </form>

            <form className="grid grid-cols-2 gap-4 mt-2">
              <div className="text-gray-500">
                Due Date:
                <input type="text" className="p-2 rounded-xl w-full h-[30px] bg-gray-200 text-black" value="4/3/25" disabled />
              </div>
              <div className="text-gray-500">
                Manager Remark:
                <input type="text" className="p-2 rounded-xl w-full h-[30px] bg-gray-200 text-black" value="N/A" disabled />
              </div>
            </form>
        </div>
      </div>

      {/* Modal- Form apperas on clicking the plus */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Information</h2>
              <button
                className="text-gray-500 hover:text-black text-2xl font-bold"
                onClick={() => setShowForm(false)}
              >
                &times;
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Task ID</label>
                <input type="text" className="mt-1 w-full p-2 rounded-lg border border-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Job ID</label>
                <input type="email" className="mt-1 w-full p-2 rounded-lg border border-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Manager Remark</label>
                <textarea rows="3" className="mt-1 w-full p-2 rounded-lg border border-gray-300"></textarea>
              </div>
              <div className="text-right">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => setShowForm(false)}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownBar;
