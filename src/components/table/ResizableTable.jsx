import React, { useRef, useState } from "react";

const columns = [
  { key: "subtaskID", label: "Subtask ID" },
  { key: "subtaskName", label: "Subtask Name" },
  { key: "taskName", label: "Task Name" },
  { key: "owner", label: "Owner" },
  { key: "dueDate", label: "Due Date" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
  { key: "status", label: "Status" },
  { key: "deliveryStatus", label: "Delivery Status" },
];

const data = [
  {
    subtaskID: "SUB-0000048",
    subtaskName: "Summa ATX",
    taskName: "IQC-0000138",
    owner: "Vinod Kumar C...",
    dueDate: "6/08/24",
    startDate: "6/04/24",
    endDate: "6/04/24",
    status: "Completed",
    deliveryStatus: "On Time",
  },
];

const ResizableTable = () => {
  const colRefs = useRef({});
  const [colWidths, setColWidths] = useState({});

  const startResize = (e, key) => {
    const startX = e.clientX;
    const startWidth = colRefs.current[key]?.offsetWidth || 100;

    const onMouseMove = (e) => {
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
    <div className="overflow-auto  rounded-xl shadow-md">
      <table className="min-w-full text-sm text-left rounded-xl">
        <thead className="bg-blue-200 text-gray-700">
          <tr>
            <th className="p-2  font-semibold text-center">S.No</th>
            {columns.map((col) => (
              <th
                key={col.key}
                ref={(el) => (colRefs.current[col.key] = el)}
                style={{ width: colWidths[col.key] || "auto" }}
                className="relative group  p-2 font-semibold "
              >
                {col.label}
                <div
                  onMouseDown={(e) => startResize(e, col.key)}
                  className="absolute top-0 right-0 w-1 h-full cursor-col-resize"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr className="bg-white text-black" key={idx}>
              <td className="text-center  p-2 text-black">{idx + 1}</td>
              {columns.map((col) => (
                <td key={col.key} className=" p-2">
                  {col.key === "subtaskID" ? (
                    <a
                      href="#"
                      className="text-blue-600 underline"
                    >
                      {row[col.key]}
                    </a>
                  ) : col.key === "deliveryStatus" ? (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      {row[col.key]}
                    </span>
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResizableTable;
