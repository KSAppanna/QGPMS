import React, { useState, useRef } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import "./Table.css";

// Custom Resizable Header Component
const ResizableHeader = ({ label }) => {
  const ref = useRef();
  const [width, setWidth] = useState(150); // default width

  const startResize = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = ref.current.offsetWidth;

    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      setWidth(Math.max(newWidth, 60));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={ref}
      style={{
        width,
        display: "flex",
        alignItems: "center",
        position: "relative",
        paddingRight: 8,
        userSelect: "none",
      }}
    >
      <span style={{ flex: 1}}>{label}</span>
      <div
        onMouseDown={startResize}
        style={{
          width: 1,
          backgroundColor: "gray",
          cursor: "col-resize",
          position: "absolute",
          right: 2,
          top: 0,
          bottom: 0,
          zIndex: 1,
        }}
      />
    </div>
  );
};

// Sort icon
const sortIcon = <ArrowDownward />;

// Define a custom theme
createTheme("solarized", {
  text: {
    primary: "white",
    secondary: "white",
  },
  background: {
    default: "transparent",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "white",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

// Custom styles for dark theme
const customStyles = {
  pagination: {
    style: {
      color: "white",
    },
    pageButtonsStyle: {
      fill: "white",
      color: "white",
      "&:hover": {
        backgroundColor: "rgba(255,255,255,0.1)",
      },
    },
  },
};

function Table({ data, theme }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const appliedTheme = theme === "dark" ? "solarized" : "default";

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  const borderColor = theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)";

  const columns =
    data.length > 0
      ? [
          {
            name: <ResizableHeader label="ID" />,
            cell: (row, index) =>
              (currentPage - 1) * rowsPerPage + index + 1,
            sortable: false,
            width: "70px",
            style: {
              overflow: "hidden",
              borderRight: `1px solid ${borderColor}`,
            },
          },
          ...Object.keys(data[0]).map((key) => ({
            name: (
              <ResizableHeader
                label={key
                  .split(/(?=[A-Z])/)
                  .join(" ")
                  .replace(/^./, (char) => char.toUpperCase())}
              />
            ),
            selector: (row) => row[key],
            sortable: key !== "id",
            wrap: true,
            style: {
              overflow: "hidden",
              borderRight: `1px solid ${borderColor}`,
              flex:1,
            },
          })),
        ]
      : [];

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-md px-4 py-2 mb-3 w-[50%]"
      />

      {/* Conditionally add style for dropdown */}
      {theme === "dark" && (
        <style>
          {`
            .rdt_Pagination select {
              background-color: #1E1E1E;
              color: white;
              border: 1px solid white;
            }
          `}
        </style>
      )}

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={rowsPerPage}
        paginationRowsPerPageOptions={[10, 20, 50, 100]}
        onChangePage={setCurrentPage}
        onChangeRowsPerPage={(newPerPage) => setRowsPerPage(newPerPage)}
        sortIcon={sortIcon}
        theme={appliedTheme}
        customStyles={theme === "dark" ? customStyles : {}}
        width
      />
    </div>
  );
}

export default Table;
