import React, { useState } from "react";
import { ReactSpreadsheetImport, StepType } from "react-spreadsheet-import";
import axios from "axios";
const fields = [
  {
    label: "Program",
    key: "Program",
    alternateMatches: ["first name", "full name"],
    fieldType: { type: "input" },
    example: "John Doe",
    validations: [
      {
        rule: "required",
        errorMessage: "Program is required",
      },
         {
        rule: "regex",
        value: "^[a-zA-Z0-9_-]+$",
        errorMessage: "Program only takes alphanumeric characters, underscores, and hyphens",
      }
    ],
  },
  {
    label: "Job ID",
    key: "JOB_ID",
    alternateMatches: ["email address", "mail"],
    fieldType: { type: "input" },
    example: "xyz123",
    validations: [
      {
        rule: "required",
        errorMessage: "Job ID is required",
      },
       {
        rule: "regex",
        value: "^[a-zA-Z0-9_-]+$",
        errorMessage: "Job ID only takes alphanumeric characters, underscores, and hyphens",
      }
    ],
  },
  {
    label: "Job Name",
    key: "Job_Name",
    fieldType: { type: "input" },
    example: "abcd",
    validations: [
      {
        rule: "required",
        errorMessage: "Job Name is required",
        
      },
       {
        rule: "regex",
        value: "^[a-zA-Z0-9_-]+$",
        errorMessage: "Job Name only takes alphanumeric characters, underscores, and hyphens",
      }
    ],
  },

    {
    label: "Scope of Work",
    key: "SOW",
    fieldType: { type: "input" },
    example: "abcd",
    validations: [
      {
        rule: "required",
        errorMessage: "Scope of Work is required",
      },
       {
        rule: "regex",
        value: "^[a-zA-Z0-9_-]+$",
        errorMessage: "Scope of Work only takes alphanumeric characters, underscores, and hyphens",
      }
    ],
  },

    {
    label: "Work Type",
    key: "Worktype",
    fieldType: { type: "input" },
    example: "abcd",
    validations: [
      {
        rule: "required",
        errorMessage: "Work Type is required",
      },
       {
        rule: "regex",
        value: "^[a-zA-Z0-9_-]+$",
        errorMessage: "Work Type only takes alphanumeric characters, underscores, and hyphens",
      }
    ],
  },

      {
    label: "Division",
    key: "Division",
    fieldType: { type: "input" },
    example: "abcd",
    validations: [
      {
        rule: "required",
        errorMessage: "Division is required",
      },
       {
        rule: "regex",
        value: "^[a-zA-Z0-9_-]+$",
        errorMessage: "Program only takes alphanumeric characters, underscores, and hyphens",
      }
    ],
  },

      {
    label: "Region",
    key: "Region",
    fieldType: { type: "input" },
    example: "abcd",
    validations: [
      {
        rule: "required",
        errorMessage: "Region is required",
      },
       {
        rule: "regex",
        value: "^[a-zA-Z0-9_-]+$",
        errorMessage: "Region only takes alphanumeric characters, underscores, and hyphens",
      }
    ],
  }, 
  
      {
    label: "Recieved Date",
    key: "RecievedDate",
    fieldType: { type: "input" },
    example: "abcd",
    validations: [
     {
  rule: "regex",
  value: "^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(\\d{4})$",
errorMessage: "Date must be in MM-DD-YYYY format"

}
    ],
  },

      {
    label: "Due Date",
    key: "DueDate",
    fieldType: { type: "input" },
    example: "abcd",
    validations: [
    {
  rule: "regex",
 value: "^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(\\d{4})$",
errorMessage: "Date must be in MM-DD-YYYY format"

}

    ],
  },

      {
    label: "Number of Nodes",
    key: "No_Nodes",
    fieldType: { type: "input" },
    example: "abcd",
    validations: [
        {
      rule: "regex",
      value: "^\\d+$",
      errorMessage: "Number of Nodes must be a non-negative integer",
    },
    ],
  },

      {
    label: "Aerial",
    key: "Aerial",
    fieldType: { type: "input" },
    example: "abcd",
    validations: [
      {
        rule: "required",
        errorMessage: "Aerial is required",
      },
        {
        rule: "regex",
        value: "^[a-zA-Z0-9_-]+$",
        errorMessage: "Aerial only takes alphanumeric characters, underscores, and hyphens",
      }
    ],
  },

      {
    label: "Number of ROLTs",
    key: "No_ROLTs",
    fieldType: { type: "input" },
    example: "abcd",
    validations: [
        {
      rule: "regex",
      value: "^\\d+$",
      errorMessage: "Number of Nodes must be a non-negative integer",
    },
    ],
  },

      {
    label: "Market ID",
    key: "Market_ID",
    fieldType: { type: "input" },
    example: "abcd",
    validations: [
      {
        rule: "required",
        errorMessage: "Market ID is required",
      },
        {
        rule: "regex",
        value: "^[a-zA-Z0-9_-]+$",
        errorMessage: "Market ID only takes alphanumeric characters, underscores, and hyphens",
      }
    ],
  },

      {
    label: "Market Order",
    key: "Market_Order",
    fieldType: { type: "input" },
    example: "abcd",
    validations: [
      {
        rule: "required",
        errorMessage: "Market Order is required",
      },
        {
        rule: "regex",
        value: "^[a-zA-Z0-9_-]+$",
        errorMessage: "Market Order only takes alphanumeric characters, underscores, and hyphens",
      }
    ],
  },

      {
    label: "Project Number",
    key: "Project_No",
    fieldType: { type: "input" },
    example: "abcd",
    validations: [
      {
        rule: "required",
        errorMessage: "Project Number is required",
      },
    ],
  },

      {
    label: "DA Number",
    key: "DANumber",
    fieldType: { type: "input" },
    example: "abcd",
    validations: [
      {
      rule: "regex",
      value: "^\\d+$",
      errorMessage: "Number of Nodes must be a non-negative integer",
    },
    ],
  },
];

const Comments = () => {
  const [isExcelOpen, setIsExcelOpen] = useState(false);
  const [importedData, setImportedData] = useState([]);

const [validData, setValidData] = useState([]);
const [invalidData, setInvalidData] = useState([]);

const handleSubmit = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/ProjectExcel",
      {
        validData: data.validData
      }
    );

    console.log("Valid response data", response.data.validData);
    console.log("Invalid response data", response.data.invalidData);

    setValidData(response.data.validData);
    setInvalidData(response.data.invalidData);
  } catch (error) {
    console.error("Error submitting Excel data:", error);
  }
};




  return (
   <div className="p-4 ml-125 h-[90vh] overflow-y-auto">

      <button
        onClick={() => setIsExcelOpen(true)}
        className="px-4 py-2 !  bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Import Spreadsheet
      </button>
<ReactSpreadsheetImport
initialStepState={{ type: StepType.upload }}
  defaultHasHeaderRow={true}

  rowHook={(data, addError) => {
    const received = new Date(data.RecievedDate);
    const due = new Date(data.DueDate);

    if (due < received) {
      addError("DueDate", {
        message: "Due Date cannot be before Received Date",
        level: "error",
      });
    }

    return data;
  }}
  isOpen={isExcelOpen}
  onClose={() => setIsExcelOpen(false)}
  onSubmit={handleSubmit}
  fields={fields}
 
isNavigationEnabled={true}
 

/>




      {/* Valid Data */}
{validData.length > 0 && (
  <div className="mt-6">
    <h2 className="text-lg font-bold text-green-600">Valid Data:</h2>
    <div className="mt-2 max-h-96 overflow-y-auto border border-green-300 rounded p-2">
  <ul className="list-disc list-inside">

     {validData.map((item, index) => (
  <li key={index} className="mb-4">
    <strong>Row {index + 1}:</strong>
    <div className="ml-4 mt-2 text-sm">
      {Object.entries(item).map(([key, value]) => (
        <div key={key} className="flex">
          <span className="w-32 font-medium">{key}:</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  </li>
))}
    </ul>
    </div>
  </div>
)}

{/* Invalid Data */}
{invalidData.length > 0 && (
  <div className="mt-6">
    <h2 className="text-lg font-bold text-red-600">Invalid Data:</h2>
    
    <div className="mt-2 max-h-96 overflow-y-auto border border-gray-300 rounded p-2">
      <ul className="list-disc list-inside">
        {invalidData.map((entry, index) => (
          <li key={index} className="mb-4">
            <strong>Row {entry.rowNumber}:</strong> {entry.errors.join(', ')}
            <div className="ml-4 mt-2 text-sm">
              {Object.entries(entry.row).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="w-32 font-medium">{key}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}


    </div>
  );
};

export default Comments;
