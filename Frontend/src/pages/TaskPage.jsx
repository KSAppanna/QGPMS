import { useState, useEffect, useRef } from "react";
import React from "react";
import Navbar from "../components/Navbar";
import Bar from "../components/taskPageComponents/Bar";
import Info from "../components/taskPageComponents/Info";
import Subtask from "../components/taskPageComponents/Subtask";
import Markup from "../components/taskPageComponents/Markup";
import Attachments from "../components/taskPageComponents/Attachments";
import Stopwatch from "../components/taskPageComponents/Stopwatch";
import Menubar from "../components/Menubar";
import { Toaster, toast } from "react-hot-toast";
import { IoIosNotifications } from "react-icons/io";


const TaskPage = () => {
  

  const LeftPanel = () => (
    <div className="overflow-y-auto flex-2 basis-0 bg-transparent flex flex-col">
      <Info />
      <Subtask  />
      <Markup  />
      <Attachments />
    </div>
  );

  const RightPanel = () => (
    <div
      className={`overflow-y-auto flex-1 basis-0 mt-10 sm:mt-0 `}
    >
      <Stopwatch />
    </div>
  );

  return (
    <>
      <Toaster />
      
      <div className="pt-10 overflow-hidden relative h-screen w-full">
        <Bar />
        <div className="flex flex-col sm:flex-row h-full w-full sm:ml-8">
          <LeftPanel />
          <RightPanel />
        </div>
      </div>
    </>
  );
};

export default TaskPage;
