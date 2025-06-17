import React from 'react';
import { Link } from 'react-router-dom';

const Bar = () => {
  return (
    // Top bar showing task name and status
    <div className=" relative w-full sm:w-[63.5%] sm:ml-12 h-[30px] flex justify-between items-center px-2 bg-transparent text-gray-700">
      <div className="flex items-center">
        <button className="text-white bg-sky-400 hover:bg-sky-500 px-2 py-0.5 text-sm rounded-sm">
           Task
        </button>
        <div className={`ml-2 font-medium text-black dark:text-white`}>Fine-1 Sector</div>
      </div>

      <div className="flex items-center">
        <div className="mr-4 flex items-center">
          <span className={`text-sm text-white dark:text-black}`}>Status:</span>
          <button className="bg-yellow-400 text-white text-xs font-semibold w-10 h-[24px] rounded-xl ml-2">
            WIP
          </button>
        </div>
        <button className="text-white bg-sky-400 hover:bg-sky-500 px-3 py-0.5 text-sm rounded-sm">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Bar;
