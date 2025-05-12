import React, { useState, useEffect, useRef } from "react";

const TimesheetDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0); // in ms
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Start or stop timer
  useEffect(() => {
    if (isRunning) {
      const start = Date.now() - elapsed;
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - start);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    return `${hours.toString().padStart(2, '0')}.${minutes
      .toString()
      .padStart(2, '0')}.${seconds.toString().padStart(2, '0')}.${milliseconds
      .toString()
      .padStart(3, '0')}`;
  };

  const handleToggle = () => {
    if (isRunning) {
      const end = new Date();
      const newTask = {
        user: "Vinod Kumar Chinta",
        startTime: startTime?.toLocaleString("en-GB", { hour12: false }),
        endTime: end.toLocaleString("en-GB", { hour12: false }),
        duration: formatTime(elapsed),
      };
      setTasks((prev) => [...prev, newTask]);
      setIsRunning(false);
      setElapsed(0);
      setStartTime(null);
    } else {
      setStartTime(new Date());
      setIsRunning(true);
    }
  };

  const progress = (elapsed % 1000) / 1000 * 100;
  const circleStyle = {
    background: `conic-gradient(#ec4899 ${progress * 3.6}deg, #f3f4f6 0deg)`,
  };

  return (
    <div className="w-full mx-auto mt-6 relative flex flex-col items-center space-y-6">
      {/* Stopwatch and button inline */}
      <div className="flex items-center bg-white rounded-full px-6 py-4 shadow space-x-8">
        {/* Stopwatch Circle */}
        <div
          className="relative w-32 h-32 rounded-full flex items-center justify-center"
          style={circleStyle}
        >
          <div className="absolute w-28 h-28 bg-white rounded-full flex items-center justify-center text-gray-800 text-xl font-mono tracking-tight">
            {formatTime(elapsed)}
          </div>
        </div>

        {/* Start/Stop Button */}
        <button
          onClick={handleToggle}
          className={`w-12 h-12 flex items-center justify-center rounded-full transition duration-200 ${
            isRunning
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isRunning ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <rect x="6" y="4" width="2" height="12" />
              <rect x="12" y="4" width="2" height="12" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <polygon points="5,4 15,10 5,16" />
            </svg>
          )}
        </button>
      </div>

      {/* Toggle Bar */}
      <div
        className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-md flex justify-between items-center cursor-pointer shadow-md mt-2 w-full max-w-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <span className="text-sm font-medium">Timesheet</span>
        </div>
      </div>

      {/* Timesheet Table */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden w-full max-w-xl ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-3 p-4 bg-white rounded-lg shadow-md">
          <div className="overflow-x-auto overflow-y-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-3">S.No</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Start</th>
                  <th className="px-4 py-3">End</th>
                  <th className="px-4 py-3">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                      No entries yet.
                    </td>
                  </tr>
                ) : (
                  tasks.map((task, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{task.user}</td>
                      <td className="px-4 py-2">{task.startTime}</td>
                      <td className="px-4 py-2">{task.endTime}</td>
                      <td className="px-4 py-2">{task.duration}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimesheetDropdown;
