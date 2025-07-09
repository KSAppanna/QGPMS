import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CustomDatePicker from '../CustomDatePicker'; // adjust path as needed

const Qc = () => {
  const [qc, setQc] = useState({
    qcTgtStartDate: "2025-07-01",
    qcTgtEndDate: "2025-07-10",
    qcActStartDate: "2025-07-02",
    qcActEndDate: "2025-07-11",
    timeTaken: "9 days"
  });

  const qcLabelMap = {
    qcTgtStartDate: "QC TGT Start Date",
    qcTgtEndDate: "QC TGT End Date",
    qcActStartDate: "QC ACT Start Date",
    qcActEndDate: "QC ACT End Date",
    timeTaken: "Time Taken"
  };

  const [openQc, setOpenQc] = useState(false);

  const handleDateChange = (key, value) => {
    setQc(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div
        onClick={() => setOpenQc(prev => !prev)}
        className="bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400 hover:from-blue-700 hover:via-sky-600 hover:to-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-between cursor-pointer shadow-md"
      >
        <span className="flex items-center gap-2 text-base font-semibold">
          {openQc ? <IoIosArrowUp className="text-xl" /> : <IoIosArrowDown className="text-xl" />}
          QC
        </span>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          openQc ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 dark:bg-gray-800/50">
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(qc).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1 dark:text-white">{qcLabelMap[key]}</label>
                {(key === 'qcTgtStartDate' || key === 'qcTgtEndDate') ? (
                  <CustomDatePicker
                    value={value}
                    onChange={(newDate) => handleDateChange(key, newDate)}
                  />
                ) : (
                  <input
                    type="text"
                    value={value || "-"}
                    readOnly
                    className="px-3 py-2 text-sm rounded-md border border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none dark:bg-gray-700/50"
                  />
                )}
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Qc;
