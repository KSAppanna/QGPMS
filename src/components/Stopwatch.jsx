import React, { useState, useEffect, useRef } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => setTime((prev) => prev + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Stopwatch</h2>
      <div className="text-4xl font-mono text-blue-700 tracking-widest">
        {formatTime(time)}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={handleStart}
          className="bg-green-500 hover:bg-green-600 text-white font-medium px-3 py-1 rounded shadow transition duration-200"
        >
          Start
        </button>
        <button
          onClick={handleStop}
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1 rounded shadow transition duration-200"
        >
          Stop
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-3 py-1 rounded shadow transition duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;