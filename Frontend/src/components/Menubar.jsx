import React, { useState } from 'react';
import { IoIosMenu, IoIosArrowRoundForward, IoIosPeople, IoMdExit, IoMdSettings, IoMdTime } from "react-icons/io";
import { IoPerson, IoPeopleSharp, IoChatbubbles } from "react-icons/io5";
import { FaHome,FaTasks  } from "react-icons/fa";
import { FaFolderClosed } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { BsGearWideConnected, BsPaperclip } from "react-icons/bs";

const Menubar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProjects = () => {
    setShowProjects(!showProjects);
  };

  return (
    <div className="absolute top-0 left-0 h-full z-50">

      <div
        className={`h-full transition-all duration-600 relative ${isOpen ? "w-64" : "w-14"
          } bg-gradient-to-b from-blue-500 via-blue-500 to-cyan-200 rounded-r-2xl flex flex-col justify-between p-3 backdrop-blur-md bg-opacity-90`}
      >
        <div className="flex flex-col gap-4 flex-1 overflow-auto">
          <div className="text-black dark:text-gray-200 cursor-pointer" onClick={toggleMenu}>
            <IoIosMenu size={24} />
          </div>

          <MenuItem icon={<FaHome />} label="Home" isOpen={isOpen} />
          <MenuItem icon={<IoPerson />} label="Users" isOpen={isOpen} />
          <MenuItem icon={<IoIosPeople />} label="Customers" isOpen={isOpen} />

          {/* Projects */}
          <div>
            <div
              className="flex items-center gap-2 text-black dark:text-gray-200 cursor-pointer"
              onClick={toggleProjects}
            >
              <FaFolderClosed />
              {isOpen && <span className="flex-1">Projects</span>}
              {isOpen && (
                <span>{showProjects ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</span>
              )}
            </div>
            {isOpen && showProjects && (
              <div className="ml-6 mt-2 flex flex-col text-sm text-gray-100 gap-1">
                <span className="cursor-pointer hover:text-white flex items-center gap-2">
                  <IoIosArrowRoundForward />Create Projects
                </span>
                <span className="cursor-pointer hover:text-white flex items-center gap-2">
                  <IoIosArrowRoundForward />Project List
                </span>
              </div>
            )}
          </div>

          {/* Tasks */} 
          <div>
            <div
              className="flex items-center gap-2 text-black dark:text-gray-200 cursor-pointer"
              onClick={() => setShowTasks((prev) => !prev)}
            >
              <FaTasks />
              {isOpen && <span className="flex-1">Tasks</span>}
              {isOpen && (
                <span>{showTasks ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</span>
              )}
            </div>
            {isOpen && showTasks && (
              <div className="ml-6 mt-2 flex flex-col text-sm text-gray-100 gap-1">
                <span className="cursor-pointer hover:text-white flex items-center gap-2">
                  <IoIosArrowRoundForward />Task
                </span>
                <span className="cursor-pointer hover:text-white flex items-center gap-2">
                  <IoIosArrowRoundForward />Sub Task
                </span>
                <span className="cursor-pointer hover:text-white flex items-center gap-2">
                  <IoIosArrowRoundForward />Markup
                </span>
              </div>
            )}
          </div>

          <MenuItem icon={<BsGearWideConnected />} label="Labor Code Generator" isOpen={isOpen} />
          <MenuItem icon={<IoMdTime />} label="Time Sheet" isOpen={isOpen} />
          <MenuItem icon={<BsPaperclip />} label="Attachment Report" isOpen={isOpen} />
        </div>

        <div className="mb-1 text-red-400 cursor-pointer flex items-center gap-2 hover:bg-white/30 hover:backdrop-blur-md rounded-lg p-2 transition">
          <IoMdExit />
          {isOpen && <span>Log Out</span>}
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, isOpen }) => (
  <div className="flex items-center gap-2 text-black dark:text-gray-200 cursor-pointer hover:scale-105 transition-transform">
    {icon}
    {isOpen && <span>{label}</span>}
  </div>
);

export default Menubar;
