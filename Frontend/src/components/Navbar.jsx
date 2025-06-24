  import {
    Disclosure,
    DisclosureButton,
  } from '@headlessui/react';
  import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
  import React, { useState, useEffect, useRef } from 'react';
  import { IoPersonCircleOutline } from "react-icons/io5";

  import Notification from './Notification';

  const navigation = [
    { name: 'QGPMS', href: '#', current: false },
    {
      name: (
        <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      href: '#',
      current: false,
    },
    {
      name: (
        <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>
      ),
      href: '#',
      current: false  ,
    },
    {
      name: (
        <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      ),
      href: '#',
      current: false,
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs} hr${diffHrs > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHrs / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };



  export default function Navbar({
    theme,
    setTheme,
    serverMessages = [],
    notifications,
    setNotifications,
    handleClearMessages,
    handleProjectCreation,
    msgOpen,
    setMsgOpen,
     socket
  }) {
    const [currentTime, setCurrentTime] = useState('');
    const [open, setOpen] = useState(false);
    
    const [activeFilter, setActiveFilter] = useState('All');
    const dropdownRef = useRef(null);

const markAsRead = (index) => {
  const updated = [...serverMessages];
  const message = updated[index];

  if (!message.read && socket) {
    socket.emit("markAsRead", message._id); // emit to backend
  }
};

    const unreadCount = (serverMessages || []).filter(m => !m.read).length;
    const filteredMessages =
      activeFilter === 'Unread'
        ? (serverMessages || []).filter(m => !m.read)
        : (serverMessages || []);

    useEffect(() => {
      const updateTime = () => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        setCurrentTime(`${hours.toString().padStart(2, '0')}:${minutes}:${seconds}${ampm}`);
      };

      updateTime();
      const timer = setInterval(updateTime, 1000);
      return () => clearInterval(timer);
    }, []);

    useEffect(() => {
      function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div className="fixed top-0 left-0 right-0 z-50">
        <Disclosure as="nav" className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 shadow-lg backdrop-blur-md bg-opacity-80">
          <div className="px-2 sm:px-6">
            <div className="relative flex h-10 w-full items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center">
                {/* <DisclosureButton className="group inline-flex items-center justify-center rounded-md text-white hover:bg-gray-700 hover:text-white">
                  <Bars3Icon className="block size-6 group-data-open:hidden" />
                  <XMarkIcon className="hidden size-6 group-data-open:block" />
                </DisclosureButton> */}
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-8 sm:block">
                  <div className="flex space-x-1">
                    {navigation.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300',
                          `${index === 0 ? 'ml-4 text-[20px] font-bold tracking-wide' : ''} rounded-md px-3 py-2 text-sm font-medium`
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleProjectCreation}
                  className="bg-transparent text-white font-semibold py-2 px-4 rounded shadow"
                >
                  .
                </button>
              </div>

              <div className="relative inset-y-0 right-0 flex items-center justify-between pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4">
                <div className="hidden md:block bg-white/80 backdrop-blur-md rounded-full text-black px-4 py-1 shadow-md ">
                  Vinod Kum..
                </div>

                <div className="text-white font-mono drop-shadow-lg text-lg ">{currentTime}</div>

                <div>


    {/* Notification Button */}
    <button
      type="button"
      className="relative rounded-full p-1 text-white hover:text-white"
      onClick={() => setMsgOpen(!msgOpen)}
    >
      <span className="sr-only">View notifications</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </button>


   <Notification
  msgOpen={msgOpen}
  setMsgOpen={setMsgOpen}
  activeFilter={activeFilter}
  setActiveFilter={setActiveFilter}
  unreadCount={unreadCount}
  serverMessages={serverMessages}
  socket={socket}
  getRelativeTime={getRelativeTime}
  markAsRead={markAsRead}
/>
  </div>


                <div className="relative ml-3" ref={dropdownRef}>
                  <button
                    onClick={() => setOpen(!open)}
                    className="relative flex items-center justify-center w-10 h-10 rounded-full text-green-300 bg-gradient-to-r from-cyan-500 to-blue-700"
                  >
                    <span className="sr-only">Open user menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </button>
                  {open && (
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Disclosure>
      </div>
    );
  }
