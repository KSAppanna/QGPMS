import React, { useMemo, useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css'; 
import { ModuleRegistry, AllCommunityModule, themeQuartz,provideGlobalGridOptions } from 'ag-grid-community';
import './table.css';

provideGlobalGridOptions({
    theme: "legacy",
});
ModuleRegistry.registerModules([AllCommunityModule]);

const TableA = ({ data }) => {
  const [rowData] = useState(data);
  const [colDefs, setColDefs] = useState([]);
  const gridRef = useRef();

  useEffect(() => {
    if (rowData.length > 0) {
      const dynamicCols = Object.keys(rowData[0]).map((key) => ({
        field: key,
        headerName: key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase()),
        flex: 1,
        minWidth: 150,
      }));
      setColDefs(dynamicCols);
    }
  }, [rowData]);

  const defaultColDef = useMemo(() => ({
    flex: 5,
    filter: true,
  }), []);

  const myTheme = themeQuartz.withParams({
  backgroundColor: "rgb(249, 245, 227)",
  foregroundColor: "rgb(126, 46, 132)",
  headerTextColor: "rgb(204, 245, 172)",
  headerBackgroundColor: "rgb(209, 64, 129)",
  oddRowBackgroundColor: "rgb(0, 0, 0, 0.03)",
  headerColumnResizeHandleColor: "rgb(126, 46, 132)",
});

const theme = useMemo(() => {
    return myTheme;
  }, []);

  return (
    <div className="ag-theme-balham" style={{ height: '100%', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        domLayout="autoHeight"
        suppressMovableColumns={true}   
        theme={theme}
      />
    </div>
  );
};

export default TableA;
