  import { useState, useRef, useEffect } from "react";
  import React from "react";
  import Navbar from "./components/Navbar";
  import Bar from "./components/taskPageComponents/Bar";
  import Info from "./components/taskPageComponents/Info";
  import Subtask from "./components/taskPageComponents/Subtask";
  import Markup from "./components/taskPageComponents/Markup";
  import Attachments from "./components/taskPageComponents/Attachments";
  import Stopwatch from "./components/taskPageComponents/Stopwatch";
  import Menubar from "./components/Menubar";

  const App = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [leftWidth, setLeftWidth] = useState(window.innerWidth >= 768 ? 70 : 100); // % width

    // const isResizing = useRef(false); // Resizer state

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

    // const handleMouseMove = (e) => {
    //   if (!isResizing.current) return;

    //   const newWidth = (e.clientX / window.innerWidth) * 100;
    //   if (newWidth > 20 && newWidth < 80) {
    //     setLeftWidth(newWidth);
    //   }
    // };

    // const handleMouseDown = () => {
    //   isResizing.current = true;
    //   document.body.style.cursor = "col-resize";
    //   document.body.style.userSelect = "none";
    // };

    // const handleMouseUp = () => {
    //   isResizing.current = false;
    //   document.body.style.cursor = "default";
    //   document.body.style.userSelect = "auto";
    // };

    // useEffect(() => {
    //   window.addEventListener("mousemove", handleMouseMove);
    //   window.addEventListener("mouseup", handleMouseUp);
    //   return () => {
    //     window.removeEventListener("mousemove", handleMouseMove);
    //     window.removeEventListener("mouseup", handleMouseUp);
    //   };
    // }, []);

   const LeftPanel = () => (
  <div className="overflow-y-auto bg-transparent w-full sm:w-[70%] flex flex-col">
    <Info theme={theme} />
    <Subtask theme={theme} />
    <Markup theme={theme} />
    <Attachments theme={theme} />
  </div>
);

const RigthPanel = () => (
  <div
    className={`overflow-y-auto w-full sm:w-[30%] mt-10 sm:mt-0 ${
      theme === "light" ? "bg-grey-100" : "bg-transparent"
    }` }
  >
    <Stopwatch />
  </div>
);


    return (
      <>
      sds
      </>
    );
  };

  export default App;
