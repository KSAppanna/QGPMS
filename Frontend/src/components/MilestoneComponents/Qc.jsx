import React,{useState} from 'react'
import { IoIosArrowDown,IoIosArrowUp  } from "react-icons/io";



const Qc = () => {

    const qc = {
  qcTgtStartDate: "2025-07-01",
  qcTgtEndDate: "2025-07-10",
  qcActStartDate: "2025-07-02",
  qcActEndDate: "2025-07-11",
  timeTaken: "9 days"
};

const qcLabelMap = {
  qcTgtStartDate: "QC Start Date",
  qcTgtEndDate: "QC End Date",
  qcActStartDate: "QC Actual Start Date",
  qcActEndDate: "QC Actual End Date",
  timeTaken: "Time Taken"
};

    const [openQc,setOpenQc] = useState(false);
  return (
   <div className="w-full ">
         <div
           onClick={() => setOpenQc(prev => !prev)}
           className="bg-gradient-to-r from-blue-500 via-sky-300 to-blue-200 hover:from-blue-600 hover:via-sky-400 hover:to-blue-300 text-white px-3 h-[36px] rounded-lg flex gap-2 items-center cursor-pointer transition-colors shadow-lg backdrop-blur-md bg-opacity-90"
         >
           <span>{openQc ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
           QC
           
         </div>
   
      
         <div
           className={`overflow-hidden transition-all duration-300 ease-in-out ${
             openQc ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
           }`}
         >
           <div className="text-black ml-0.5 p-2 rounded shadow">
             <form className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                {Object.entries(qc).map(([key,value])=>(
                    <div key={key} className='flex flex-col'>
                        <label className='text-sm font-medium text-gray-600'>{qcLabelMap[key]}</label>
                        <input type="text"  value={value||"-"} readOnly className='mt-1 px-2 py-1 border border-gray-300 rounded bg-gray-100 text-sm focus:outline-none'/>
                    </div>
                ))}
    
              </form>
           </div>
         </div>
       </div>
     );
   };

export default Qc