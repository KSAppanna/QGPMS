import { useState } from "react";
import React from "react";

const DropdownBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full mx-auto mt-4 relative">
      <div
        className="bg-sky-400 hover:bg-sky-500 text-white px-3 h-[36px] rounded-lg flex justify-between items-center cursor-pointer transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <span className="ml-2 select-none font-medium">Information</span>
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowForm(true);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[320px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-2 p-4 bg-gray-100 rounded-lg border border-gray-200">
          <form className="grid grid-cols-4 gap-4">
            {[
              ["Task ID:", "IQC-0000138"],
              ["Job-ID:", "32323232"],
              ["Milestone:", "323232-Planning"],
              ["Task Type:", "IQC"],
              ["Owner:", "Vinod Kumar Chinta"],
              ["QC Checklist:", "QGPMS-Testing-ATX"],
              ["Iteration:", "0"],
              ["QC Score:", "0"],
              ["Total Time:", "2:08 min / 0:02 hrs"],
              ["Production Task ID:", "PROD-0000158"],
              ["Start Date:", "5/24/24"],
              ["End Date:", ""],
            ].map(([label, value], idx) => (
              <div key={idx} className="text-gray-800">
                {label}
                <input
                  type="text"
                  className="p-2 rounded-md w-full h-[30px] bg-white text-black  border border-gray-300"
                  value={value}
                  disabled
                />
              </div>
            ))}
          </form>

          <form className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-gray-800">
              Due Date:
              <input type="text" className="p-2 rounded-md w-full h-[30px] bg-white text-black border border-gray-300" value="4/3/25" disabled />
            </div>
            <div className="text-gray-800">
              Manager Remark:
              <input type="text" className="p-2 rounded-md w-full h-[30px] bg-white text-black border border-gray-300" value="N/A" disabled />
            </div>
          </form>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <div className="p-6 rounded-xl w-[400px] bg-white shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">Information</h2>
              <button className="text-gray-500 hover:text-black text-2xl font-bold" onClick={() => setShowForm(false)}>
                &times;
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Task ID</label>
                <input type="text" className="mt-1 w-full p-2 rounded-md border border-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Job ID</label>
                <input type="text" className="mt-1 w-full p-2 rounded-md border border-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Manager Remark</label>
                <textarea rows="3" className="mt-1 w-full p-2 rounded-md border border-gray-300"></textarea>
              </div>
              <div className="text-right">
                <button
                  type="button"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
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
