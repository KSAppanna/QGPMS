import { useState } from "react";
import React from "react";
import ResizableTable from "../table/ResizableTable";
import Table from "../table/Table";
import TableA from "../table/TableA";

const DropdownBar = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Sample data
 const generateRandomData = (count) => {
  const statuses = ["Completed", "In Progress", "Pending", "Delayed"];
  const deliveryStatuses = ["On Time", "Late", "Early", "Rescheduled"];

  return Array.from({ length: count }, (_, index) => ({
    subtaskID: `SUB-${String(index + 100).padStart(7, "0")}`,
    subtaskName: `Task ${index + 1}`,
    taskName: `IQC-${String(Math.floor(Math.random() * 200) + 100).padStart(7, "0")}`,
    owner: `Owner ${index + 1}`,
    dueDate: `6/${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}/24`,
    startDate: `6/${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}/24`,
    endDate: `6/${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}/24`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    deliveryStatus: deliveryStatuses[Math.floor(Math.random() * deliveryStatuses.length)],
  }));
};

const data = generateRandomData(20);

  return (
    <div className="w-[100%] sm:w-[90%] mx-auto mt-4 sm:ml-6">
      <div
        className="relative bg-gradient-to-r from-blue-500 via-sky-300 to-blue-200 hover:from-blue-600 hover:via-sky-400 hover:to-blue-300 text-white flex items-center p-2 w-full h-[36px] rounded-md cursor-pointer transition-colors duration-200 backdrop-blur-md"
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
          isOpen ? " opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`mt-0.5 rounded-md shadow-lg backdrop-blur-md bg-transparent`}>
          {/* <Table data={data} theme={theme}/> */}
          <TableA data={data}/>
        </div>
      </div>
    </div>
  );
};

export default DropdownBar;