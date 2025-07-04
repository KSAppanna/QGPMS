// File: InputMilestoneTable.js

import React from 'react';
import { AgGridReact } from 'ag-grid-react';

const InputMilestoneTable = ({ rowData, selectedFiles, updateSelection, handleDownload, handleDelete }) => {
  const colDefs = [
    {
      headerName: '',
      field: 'boolean',
      cellRenderer: (params) => {
        const handleChange = (e) => {
          updateSelection(params.data, e.target.checked);
        };
        return (
          <input
            type="checkbox"
            checked={params.data.boolean || false}
            onChange={handleChange}
            style={{ cursor: 'pointer' }}
          />
        );
      },
      width: 60
    },
    { field: 'SNo', headerName: 'S.No' },
    { field: 'Name', headerName: 'Name' },
    { field: 'Created Date', headerName: 'Created Date' },
    { field: 'Size', headerName: 'Size' },
    { field: 'Type', headerName: 'Type' },
    { field: 'Owner', headerName: 'Owner' }
  ];

return (
  <>
    <div className="ag-theme-balham w-full overflow-y-auto" style={{ height: '100px' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        animateRows={true}
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
          editable: false
        }}
      />
    </div>

    {selectedFiles.length > 0 && (
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download Selected ({selectedFiles.length})
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    )}
  </>
);

};

export default InputMilestoneTable;
