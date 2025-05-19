import { useState, useRef, useEffect } from "react";
import React from "react";
import Navbar from "./components/Navbar";
import Bar from "./components/Bar";
import Info from "./components/Info";
import Subtask from "./components/Subtask";
import Markup from "./components/Markup";
import Attachments from "./components/Attachments";
import Stopwatch from "./components/Stopwatch";
import Menubar from "./components/Menubar";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [leftWidth, setLeftWidth] = useState(window.innerWidth >= 768 ? 70 : 100); // 70% for desktop, 100% for mobile
  const isResizing = useRef(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedTheme = localStorage.getItem("theme");
      if (updatedTheme) setTheme(updatedTheme);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 20 && newWidth < 80) setLeftWidth(newWidth);
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="flex flex-col md:flex-row relative overflow-hidden h-screen w-full">
        <Menubar />
        {/* Left Panel */}
        <div
          className="overflow-y-auto bg-transparent"
          style={{
            width: "100%",
            height: "100%",
            ...(window.innerWidth >= 768 && {
              width: `${leftWidth}%`,
              height: "100%",
            }),
          }}
        >
          <Bar theme={theme} />
          <Info theme={theme}/>
          <Subtask theme={theme}/>
          <Markup theme={theme}/>
          <Attachments theme={theme}/>
        </div>

        {/* Resizer (only desktop) */}
        <div
          className={`hidden md:block w-1 cursor-col-resize ${
            theme === "light" ? "bg-gray-500" : "bg-gray-700"
          }`}
          onMouseDown={() => (isResizing.current = true)}
        />

        {/* Right Panel */}
        <div
          className={`overflow-y-auto ${
            theme === "light" ? "bg-gray-300" : "bg-transparent"
          }`}
          style={{
            width: "100%",
            height: "100%",
            ...(window.innerWidth >= 768 && {
              width: `${100 - leftWidth}%`,
              height: "100%",
            }),
          }}
        >
          <Stopwatch />
        </div>
      </div>
    </>
  );
};

export default App;
