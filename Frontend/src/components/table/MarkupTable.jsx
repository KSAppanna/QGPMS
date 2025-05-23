import React, { useRef, useState } from "react";

const columns = [
  { key: "markupName", label: "Markup Name" },
  { key: "taskName", label: "Task Name" },
  { key: "markupOwner", label: "Owner" },
  { key: "markupDueDate", label: "Due Date" },
  { key: "markupStartDate", label: "Start Date" },
  { key: "markupEndDate", label: "End Date" },
  { key: "markupStatus", label: "Status" },
  { key: "markupDeliveryStatus", label: "Delivery Status" },
];

const ResizableTable = ({ theme }) => {
  // Ref to store column elements for dynamic resizing
  const colRefs = useRef({});

  // State to track column widths dynamically
  const [colWidths, setColWidths] = useState({});

  // Function to handle column resizing
  const startResize = (e, key) => {
    const startX = e.clientX; // Get the initial cursor position
    const startWidth = colRefs.current[key]?.offsetWidth || 100; // Initial width of the column

    const onMouseMove = (e) => {
      // Calculate new width while maintaining a minimum size
      const newWidth = Math.max(60, startWidth + (e.clientX - startX));
      setColWidths((prev) => ({ ...prev, [key]: newWidth }));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className={`overflow-auto rounded-xl shadow-md`}>
      <table className="min-w-full text-sm text-left rounded-xl">
        <thead className="bg-blue-200 text-gray-700">
          <tr>
            {/* Column for serial number */}
            <th className="p-2 font-semibold text-center">S.No</th>
            {columns.map((col) => (
              <th
                key={col.key}
                ref={(el) => (colRefs.current[col.key] = el)} // Store reference for resizing
                style={{ width: colWidths[col.key] || "auto" }} // Apply dynamic width
                className="relative group p-2 font-semibold"
              >
                {col.label}
                {/* Resizable handle for adjusting column width */}
                <div
                  onMouseDown={(e) => startResize(e, col.key)}
                  className="absolute top-0 right-0 w-1 h-full cursor-col-resize"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Table body remains empty for now */}
        </tbody>
      </table>
      {/* Placeholder message when there is no data */}
      <div className="text-center text-gray-500 bg-white">no markup</div>
    </div>
  );  
};

export default ResizableTable;