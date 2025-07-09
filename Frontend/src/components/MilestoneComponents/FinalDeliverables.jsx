import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import R1 from './FinalDeliverableComponents/R1';
import R0 from './FinalDeliverableComponents/R0';

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const FinalDeliverables = () => {
  const [openFinalDeliverables, setOpenFinalDeliverables] = useState(false);

  return (
    <div className='w-full h-[80vh]'>
      <div className="overflow-auto h-full">
        {/* Toggle Button */}
        <div
          onClick={() => setOpenFinalDeliverables(prev => !prev)}
          className="bg-gradient-to-r from-blue-500 via-sky-300 to-blue-200 hover:from-blue-600 hover:via-sky-400 hover:to-blue-300 text-white px-3 h-[36px] rounded-lg flex gap-2 items-center cursor-pointer transition-colors shadow-lg backdrop-blur-md bg-opacity-90"
        >
          <span>{openFinalDeliverables ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
          Final Deliverables
        </div>

        {/* Expandable Content */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            openFinalDeliverables ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          } overflow-auto`}
        >
          <div className="text-black ml-0.5 p-2 rounded shadow flex flex-col gap-2">
            <R1 />
            <R0 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalDeliverables;
