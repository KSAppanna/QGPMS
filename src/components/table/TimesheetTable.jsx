import React, { useRef, useState } from "react";

const columns = [
  { key: "user", label: "User" },
  { key: "startTime", label: "Start Time" },
  { key: "endTime", label: "End Time" },
  { key: "duration", label: "Duration" },
];

const TimesheetTable = ({ isOpen, tasks }) => {
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
    <div
      className={`transition-all duration-500 ease-in-out overflow-hidden w-full max-w-full ${
        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="mt-1 p-4 bg-white rounded-lg shadow-md">
        <div className="overflow-auto rounded-xl">
          <table className="min-w-full text-sm text-left rounded-xl">
            <thead className="bg-blue-200 text-gray-700">
              <tr>
                <th className="p-2 font-semibold text-center">S.No</th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    ref={(el) => (colRefs.current[col.key] = el)}
                    style={{ width: colWidths[col.key] || "auto" }}
                    className="relative group p-2 font-semibold"
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
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="p-2 text-center text-gray-500">
                    No entries yet.
                  </td>
                </tr>
              ) : (
                tasks.map((task, idx) => (
                  <tr key={idx} className="bg-white text-black hover:bg-gray-50">
                    <td className="text-center p-2">{idx + 1}</td>
                    {columns.map((col) => (
                      <td key={col.key} className="p-2">
                        {task[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimesheetTable;
