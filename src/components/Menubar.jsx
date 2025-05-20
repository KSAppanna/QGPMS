import React, { useState } from 'react';
import { IoIosMenu } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";
import { FaFolderClosed } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoMdExit } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaMapSigns } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { BsGearWideConnected } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { BsPaperclip } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";




const Menubar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showTasks, setShowTasks] = useState(false); // Separate state for Tasks

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProjects = () => {
    setShowProjects(!showProjects);
  };

  return (
    <div
      className={`h-full transition-all duration-600 relative ${isOpen ? "w-64" : "w-14"
        } bg-gradient-to-b from-blue-500 via-blue-500 to-cyan-200  rounded-r-2xl flex flex-col justify-between p-3 backdrop-blur-md bg-opacity-90`}
      style={{ marginTop: '-2.5rem' }}

    >
      <div className="flex flex-col gap-4 flex-1">
        <div
          className="text-black dark:text-gray-200 cursor-pointer"
          onClick={toggleMenu}
        >
          <IoIosMenu size={24} />
        </div>

        <MenuItem icon={<FaHome />} label="Home" isOpen={isOpen} />
        <MenuItem icon={<IoPerson />} label="Users" isOpen={isOpen} />
        <MenuItem icon={<IoIosPeople />} label="Customers" isOpen={isOpen} />

        {/* Projects with nested items */}
        <div>
          <div
            className="flex items-center gap-2 text-black dark:text-gray-200 cursor-pointer"
            onClick={toggleProjects}
          >
            <FaFolderClosed />
            {isOpen && (
              <span className="flex-1">Projects</span>
            )}
            {isOpen && (
              <span>{showProjects ? <MdOutlineKeyboardArrowUp />
                : <MdOutlineKeyboardArrowDown />}</span>
            )}
          </div>
          {isOpen && showProjects && (
            <div className="ml-6 mt-2 flex flex-col text-sm text-gray-100 gap-1">
              <span className="cursor-pointer hover:text-white flex items-center gap-2"><IoIosArrowRoundForward />Create Projects</span>
              <span className="cursor-pointer hover:text-white flex items-center gap-2"><IoIosArrowRoundForward />Project List</span>
            </div>
          )}
        </div>

        <MenuItem icon={<FaMapSigns />} label="Milestone's" isOpen={isOpen} />

        {/* Tasks */}
        <div>
          <div
            className="flex items-center gap-2 text-black dark:text-gray-200 cursor-pointer"
            onClick={() => setShowTasks((prev) => !prev)}
          >
            <FaTasks />
            {isOpen && (
              <span className="flex-1">Task's</span>
            )}
            {isOpen && (
              <span>{showTasks ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</span>
            )}
          </div>
          {isOpen && showTasks && (
            <div className="ml-6 mt-2 flex flex-col text-sm text-gray-100 gap-1">
              <span className="cursor-pointer hover:text-white flex items-center gap-2"><IoIosArrowRoundForward />Task</span>
              <span className="cursor-pointer hover:text-white flex items-center gap-2"><IoIosArrowRoundForward />Sub Task</span>
              <span className="cursor-pointer hover:text-white flex items-center gap-2"><IoIosArrowRoundForward />Markup</span>
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
  );
};

const MenuItem = ({ icon, label, isOpen }) => (
  <div className="flex items-center gap-2 text-black dark:text-gray-200 cursor-pointer hover:scale-105 transition-transform">
    {icon}
    {isOpen && <span>{label}</span>}
  </div>
);

export default Menubar;
