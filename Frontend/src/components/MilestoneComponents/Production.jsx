import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CustomDatePicker from '../CustomDatePicker'; // Adjust path if needed

const Production = () => {
  const [prod, setProd] = useState({
    prodTgtStartDate: "2025-07-01",
    prodTgtEndDate: "2025-07-10",
    prodActStartDate: "2025-07-02",
    prodActEndDate: "2025-07-11",
    timeTaken: "9 days"
  });

  const prodLabelMap = {
    prodTgtStartDate: "Prod TGT Start Date",
    prodTgtEndDate: "Prod TGT End Date",
    prodActStartDate: "Prod ACT Start Date",
    prodActEndDate: "Prod ACT End Date",
    timeTaken: "Time Taken"
  };

  const [openProduction, setOpenProduction] = useState(false);

  const handleDateChange = (key, value) => {
    setProd(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div
        onClick={() => setOpenProduction(prev => !prev)}
        className="bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400 hover:from-blue-700 hover:via-sky-600 hover:to-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-between cursor-pointer shadow-md"
      >
        <span className="flex items-center gap-2 text-base font-semibold">
          {openProduction ? <IoIosArrowUp className="text-xl" /> : <IoIosArrowDown className="text-xl" />}
          Production
        </span>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          openProduction ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 dark:bg-gray-800/50">
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(prod).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1 dark:text-white">{prodLabelMap[key]}</label>
                
                {key === 'prodTgtStartDate' || key === 'prodTgtEndDate' ? (
                  <CustomDatePicker
                    value={value}
                    onChange={(newDate) => handleDateChange(key, newDate)}
                  />
                ) : (
                  <input
                    type="text"
                    value={value || "-"}
                    readOnly
                    className="px-3 py-2 text-sm rounded-md border border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none mt-1 dark:bg-gray-700/50"
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

export default Production;
