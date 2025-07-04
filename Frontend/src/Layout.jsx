import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Menubar from './components/Menubar';
import useSocket from './components/useSocket';

const Layout = () => {
  const [msgOpen, setMsgOpen] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId") || "userA";

  const {
    socket,
    serverMessages,
    notifications,
    setNotifications,
    handleProjectCreation,
    handleClearMessages,
  } = useSocket(userId, msgOpen);

  return (
    <div className="h-screen flex flex-col">
      <div className='h-0'>
        <Navbar
          serverMessages={serverMessages}
          notifications={notifications}
          setNotifications={setNotifications}
          handleClearMessages={handleClearMessages}
          handleProjectCreation={handleProjectCreation}
          msgOpen={msgOpen}
          setMsgOpen={setMsgOpen}
          socket={socket}
        />
      </div>

      <div className="flex overflow-hidden">
        <div className="h-full">
          <Menubar />
        </div>
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 ml-14">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
