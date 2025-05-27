import React, { useState, useEffect, useRef } from "react";
import TimesheetTable from "./table/TimesheetTable"; // Optional: if you're using this somewhere else
import Table from "./table/Table";
import TableA from "./table/TableA";

const TimesheetDropdown = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0); // in ms
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Start or stop timer
  useEffect(() => {
    if (isRunning) {
      const start = Date.now();
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - start);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Time format: hours.minutes.seconds
  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}.${minutes
      .toString()
      .padStart(2, '0')}.${seconds.toString().padStart(2, '0')}`;
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
    background: `conic-gradient(#38bdf8 ${progress * 3.6}deg, #e0f2fe 0deg)`, // blue-400 to blue-100
  };

  // Sample data
  const data=[{

  }]
  

  




  return (
    <div className="w-full mx-auto mt-7 relative flex flex-col items-center">
      {/* Stopwatch and button inline */}
      <div className="flex items-center bg-white rounded-full px-6 py-4 shadow space-x-2">
        {/* Stopwatch Circle */}
        <div
          className="relative w-32 h-32 rounded-full flex items-center justify-center"
          style={circleStyle}
        >
          <div className="absolute w-28 h-28 bg-white rounded-full flex items-center justify-center text-gray-800 text-sm font-mono tracking-tight">
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
        className="bg-gradient-to-r from-sky-400/80 via-cyan-400/70 to-blue-500/80 hover:from-sky-500/90 hover:via-cyan-500/80 hover:to-blue-600/90 text-white px-4 py-2 rounded-md flex justify-between items-center cursor-pointer shadow backdrop-blur-md  w-full max-w-xl mt-8"
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

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? " opacity-100 w-[100%]" : "max-h-0 opacity-0 w-[100%]"
        }`}
      >
        <div className="mt-0.5 rounded-md shadow-lg backdrop-blur-md h-[400px] w-[100%]">
  <TableA data={data} className="relative "/>
</div>

      </div>
    </div>
  );
};

export default TimesheetDropdown;
