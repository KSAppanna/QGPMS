import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { Calendar } from '@progress/kendo-react-dateinputs';

const Info = () => {
  const [openMilestoneDropDown, setOpenMilestoneDropdown] = useState(false);
  const [editableFields, setEditableFields] = useState({});
  const [formData, setFormData] = useState({
    jobId: "JOB-20250625-001",
    dueDate: "2025-07-01",
    owner: "Vinod Kumar Chinta",
    status: "In Progress",
    sow: "SOW-QGPMS-4432",
    billingCategory: "Development",
    region: "APAC",
    submittedDate: "2025-06-20",
    country: "India",
    approvedDate: "2025-06-22",
    totalTime: "18:45 hrs"
  });

  const labelMap = {
    jobId: "Job ID",
    dueDate: "Due Date",
    owner: "Owner",
    status: "Status",
    sow: "SOW",
    billingCategory: "Billing Category",
    region: "Region",
    submittedDate: "Submitted Date",
    country: "Country",
    approvedDate: "Approved Date",
    totalTime: "Total Time"
  };

const nonEditableFields = ['jobId', 'sow', 'region', 'country', 'totalTime'];


  const handleEditToggle = (key) => {
    setEditableFields(prev => ({ ...prev, [key]: !prev[key] }));   
  };



  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full">
      <div
        onClick={() => setOpenMilestoneDropdown(prev => !prev)}
        className="bg-gradient-to-r from-blue-500 via-sky-300 to-blue-200 hover:from-blue-600 hover:via-sky-400 hover:to-blue-300 text-white px-3 h-[36px] rounded-lg flex gap-2 items-center cursor-pointer transition-colors shadow-lg backdrop-blur-md bg-opacity-90"
      >
        <span>{openMilestoneDropDown ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
        Information
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          openMilestoneDropDown ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-black ml-0.5 p-2 rounded shadow">
          <form className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="flex flex-col relative">
                <label className="text-sm font-medium text-gray-600">{labelMap[key]}</label>
                <input
                  type={(key === 'submittedDate' || key === 'approvedDate') ? 'date' : 'text'}
                  value={value || "-"}
                  readOnly={!editableFields[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className={`mt-1 px-2 py-1 pr-8 border text-sm rounded focus:outline-none ${
                    editableFields[key] ? 'bg-white border-blue-400' : 'bg-gray-100 border-gray-300'
                  }`}
                />
                {!nonEditableFields.includes(key) && (
                  <CiEdit
                    className="absolute right-2 top-[32px] text-gray-500 cursor-pointer"
                    onClick={() => handleEditToggle(key)}
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

export default Info;
