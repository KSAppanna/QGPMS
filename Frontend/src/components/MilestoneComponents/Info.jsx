import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import CustomDatePicker from '../CustomDatePicker';

const Info = () => {
  const [openMilestoneDropDown, setOpenMilestoneDropdown] = useState(false);
  const [editableFields, setEditableFields] = useState({});
  const [formData, setFormData] = useState({
    jobId: "JOB-20250625-001",
    dueDate: "07-23-2024",
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
  const dateFields = ['dueDate', 'submittedDate', 'approvedDate'];

  const handleEditToggle = (key) => {
    setEditableFields(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div
        onClick={() => setOpenMilestoneDropdown(prev => !prev)}
        className="bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400 hover:from-blue-700 hover:via-sky-600 hover:to-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-between cursor-pointer shadow-md"
      >
        <span className="flex items-center gap-2 text-base font-semibold">
          {openMilestoneDropDown ? <IoIosArrowUp className="text-xl" /> : <IoIosArrowDown className="text-xl" />}
          Information
        </span>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          openMilestoneDropDown ? 'max-h-[2000px] opacity-100 mt-4 ' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 dark:bg-gray-800/50 dark:text-white">
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="relative">
                <label className="text-sm font-medium text-gray-600 block mb-1 dark:text-white">
                  {labelMap[key]}
                </label>

              {dateFields.includes(key) ? (
  <CustomDatePicker
    value={value}
    onChange={(newVal) => handleChange(key, newVal)}
    editable={editableFields[key]}
  />
) : (
  <input
    type="text"
    value={value || "-"}
    readOnly={!editableFields[key]}
    onChange={(e) => handleChange(key, e.target.value)}
    className={`w-full px-3 py-2 text-sm rounded-md border transition focus:outline-none dark:bg-gray-700/50 dark:border-none   ${
      editableFields[key]
        ? 'bg-white border-blue-400 focus:ring-2 focus:ring-blue-300 pr-8 mt-1'
        : 'bg-gray-100 border-gray-300 cursor-not-allowed mt-1'
    }`}
  />
)}

                {!nonEditableFields.includes(key) && !dateFields.includes(key)&&(
                  <CiEdit
                    className="absolute right-2 top-[38px] text-gray-500 dark:bg-gray-800/50   hover:text-blue-500 cursor-pointer transition"
                    onClick={() => handleEditToggle(key)}
                    title="Edit Field"
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
