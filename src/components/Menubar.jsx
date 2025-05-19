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



const Menubar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProjects = () => {
    setShowProjects(!showProjects);
  };

  return (
    <div
      className={`h-[90%] transition-all duration-300 ${
        isOpen ? "w-64" : "w-14"
      } border-r border-gray-300 dark:border-gray-700 rounded-r-2xl flex flex-col justify-between p-3 bg-gray-200 dark:bg-gray-900`}
    >
      <div className="flex flex-col gap-4">
        <div
          className="text-black dark:text-gray-200 cursor-pointer"
          onClick={toggleMenu}
        >
          <IoIosMenu size={24} />
        </div>

        <MenuItem icon={<FaHome />} label="Dashboard" isOpen={isOpen} />
        <MenuItem icon={<IoChatbubbles />} label="Messenger" isOpen={isOpen} />
        
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
              <span>{showProjects ?<MdOutlineKeyboardArrowUp />
:   <MdOutlineKeyboardArrowDown />}</span>
            )}
          </div>
          {isOpen && showProjects && (
            <div className="ml-6 mt-2 flex flex-col text-sm text-gray-100">
              <span className="cursor-pointer hover:text-white">Data</span>
              <span className="cursor-pointer hover:text-white">Group</span>
              <span className="cursor-pointer hover:text-white">Members</span>
            </div>
          )}
        </div>

        <MenuItem icon={<IoTime />} label="Analytics" isOpen={isOpen} />
        <MenuItem icon={<IoPeopleSharp />} label="Team" isOpen={isOpen} />
        <MenuItem icon={<IoMdSettings />} label="Settings" isOpen={isOpen} />
      </div>

      <div className="text-black dark:text-gray-200 cursor-pointer flex items-center gap-2">
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
