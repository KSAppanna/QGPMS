import { useState, useRef, useEffect } from "react";
import React from "react";
import Navbar from "./components/Navbar";
import Bar from "./components/Bar";
import Info from "./components/Info";
import Subtask from "./components/Subtask";
import Markup from "./components/Markup";
import Attachments from "./components/Attachments";

const App = () => {
  // Resizing Logic(Left and right div)
  const [leftWidth, setLeftWidth] = useState(50); 
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      const newWidth = (e.clientX / window.innerWidth) * 100;
      if (newWidth > 20 && newWidth < 80) setLeftWidth(newWidth); 
    };

    const handleMouseUp = () => {
      isResizing.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-screen w-full flex relative overflow-hidden">
        {/* Left div */}
        <div
          className="h-full overflow-y-auto bg-white"
          style={{ width: `${leftWidth}%` }}
        >
          <Bar />
          <Info />
          <Subtask />
          <Markup />
          <Attachments />
        </div>

        {/* Resizer */}
        <div
          className="w-2  cursor-col-resize"
          onMouseDown={() => (isResizing.current = true)}
        />

        {/* Right Div */}
        <div
          className="h-full bg-blue-300"
          style={{ width: `${100 - leftWidth}%` }}
        />
      </div>
    </>
  );
};

export default App;
