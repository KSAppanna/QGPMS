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
  const [leftWidth, setLeftWidth] = useState(window.innerWidth >= 768 ? 70 : 100); // % width
  const isResizing = useRef(false);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    if (newWidth > 20 && newWidth < 80) {
      setLeftWidth(newWidth);
    }
  };

  const handleMouseDown = () => {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
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
      {/* Navbar fixed at the top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar theme={theme} setTheme={setTheme} />
      </div>

      {/* Main content area */}
      <div className="pt-10 overflow-hidden relative h-screen w-full">
        {/* Menubar (desktop only) */}
        {isDesktop && (
          <div className="h-full absolute top-10 left-0 z-50">
            <Menubar />
          </div>
        )}

        {/* Panels and Resizer */}
        {isDesktop ? (
          <>
            {/* Left panel */}
            <div
              className="overflow-y-auto bg-transparent min-w-[200px] ml-5 max-w-[80vw] h-full relative z-0"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: `calc(${leftWidth}% - 0.5rem)`,
                height: "100%",
              }}
            >
              <Bar theme={theme} />
              <Info theme={theme} />
              <Subtask theme={theme} />
              <Markup theme={theme} />
              <Attachments theme={theme} />
            </div>
            {/* Resizer */}
            <div
              className={`absolute top-0 z-40 h-full w-1 cursor-col-resize ${
                theme === "light" ? "bg-gray-100" : "bg-gray-100"
              }`}
              style={{ left: `calc(${leftWidth}% - 1px)` }}
              onMouseDown={handleMouseDown}
            />
            {/* Right panel */}
            <div
              className={`overflow-y-auto min-w-[200px] max-w-[80vw] h-full mt-10 ${
                theme === "light" ? "bg-grey-100" : "bg-transparent"
              }`}
              style={{
                position: "absolute",
                left: `calc(${leftWidth}% + 1px)`,
                top: 0,
                width: `calc(${100 - leftWidth}% - 1px)`,
                height: "100%",
              }}
            >
              <Stopwatch />
            </div>
          </>
        ) : (
          // Mobile layout: stacked
          <>
            <div className="overflow-y-auto bg-transparent w-full h-1/2">
              <Bar theme={theme} />
              <Info theme={theme} />
              <Subtask theme={theme} />
              <Markup theme={theme} />
              <Attachments theme={theme} />
            </div>
            <div
              className={`overflow-y-auto w-full h-1/2 ${
                theme === "light" ? "bg-gray-300" : "bg-transparent"
              }`}
            >
              <Stopwatch />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
