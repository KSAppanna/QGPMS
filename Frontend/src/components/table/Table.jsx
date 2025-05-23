import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

const sortIcon = <ArrowDownward />;

function MyComponent({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // default page size

  const columns = [
    {
      name: "ID",
      cell: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
      sortable: false,
      width: '50px',
    },
    ...Object.keys(data[0]).map((key) => ({
      name: key
        .split(/(?=[A-Z])/)
        .join(" ")
        .replace(/^./, (char) => char.toUpperCase()),
      selector: (row) => row[key],
      sortable: key !== "id",
    }))
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      paginationPerPage={rowsPerPage}
      paginationRowsPerPageOptions={[10, 20, 50, 100]}
      onChangePage={(page) => setCurrentPage(page)}
      onChangeRowsPerPage={(newPerPage, page) => {
        setRowsPerPage(newPerPage);
        setCurrentPage(page);
      }}
      sortIcon={sortIcon}
      minWidth="100%"
    />
  );
}

export default MyComponent;
