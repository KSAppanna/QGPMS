import React, { useState } from "react";
import { ReactSpreadsheetImport, StepType } from "react-spreadsheet-import";

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
  value: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$",
  errorMessage: "Date must be in YYYY-MM-DD format"
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
  value: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$",
  errorMessage: "Date must be in YYYY-MM-DD format"
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
        rule: "number",
        errorMessage: "Number of Nodes needs to be a number",
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
    ],
  },

      {
    label: "Number of ROLTs",
    key: "No_ROLTs",
    fieldType: { type: "input" },
    example: "abcd",
    validations: [
      {
        rule: "number",
        errorMessage: "Number of ROLTS needs to be a number",
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
        rule: "number",
        errorMessage: "DA Number needs to be a number",
      },
    ],
  },
];

const Comments = () => {
  const [isExcelOpen, setIsExcelOpen] = useState(false);
  const [importedData, setImportedData] = useState([]);

 const handleSubmit = (data) => {
  console.log("Full submission:", data);
  console.log("Valid rows:", data.validData);
  console.log("Invalid rows:", data.invalidData);
  setImportedData(data.validData);
};

  return (
    <div className="p-4 ml-125">
      <button
        onClick={() => setIsExcelOpen(true)}
        className="px-4 py-2 !  bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Import Spreadsheet
      </button>

      <ReactSpreadsheetImport
        isOpen={isExcelOpen}
        onClose={() => setIsExcelOpen(false)}
        onSubmit={handleSubmit}
        fields={fields}
      />

      {importedData.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Imported Users:</h2>
          <ul className="mt-2 list-disc list-inside">
            {importedData.map((row, index) => (
              <li key={index}>
                {row.Program} - {row.JOB_ID} - {row.Job_Name} - {row.SOW}-{row.Worktype} - {row.Division} - {row.Region} - {row.RecievedDate} - {row.DueDate} - {row.No_Nodes} - {row.Aerial} - {row.No_ROLTs} - {row.Market_ID} - {row.Market_Order} - {row.Project_No} - {row.DANumber}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Comments;
