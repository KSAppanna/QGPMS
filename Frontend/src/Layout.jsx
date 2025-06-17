import React from 'react';
import Navbar from './components/Navbar';
import Menubar from './components/Menubar'
import { Outlet } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { io } from "socket.io-client";

const Layout = () => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState("");
  const [msgOpen, setMsgOpen] = useState(false);
  const msgOpenRef = useRef(msgOpen); 
  const [serverMessages, setServerMessages] = useState(() => {
    const saved = localStorage.getItem("serverMessages");
    return saved ? JSON.parse(saved) : [];
  });

  
  useEffect(() => {
    msgOpenRef.current = msgOpen;
  }, [msgOpen]);

  useEffect(() => {
    localStorage.setItem("serverMessages", JSON.stringify(serverMessages));
  }, [serverMessages]);

  useEffect(() => {
    const socketInstance = io("http://localhost:3000");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to socket server");
    });

    socketInstance.on("initialMessages", (messages) => {
      setServerMessages(messages.map(msg => ({
        content: msg.content,
        timestamp: msg.timestamp,
        read: false,
      })));
    });

    socketInstance.on("updateData", (data) => {
      const newMessage = {
        content: data.content,
        timestamp: data.timestamp,
        read: false,
      };
      setServerMessages(prev => [...prev, newMessage]);

      if (!msgOpenRef.current) {
        toast.success(data.content, {
          position: "bottom-right",
          duration: 5000,
          style: {
            background: "#333",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "10px",
          },
          icon: <IoIosNotifications />
,
        });
      }
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleSubmit = () => {
    if (notifications.trim() !== "") {
      if (socket) {
        socket.emit("updateData", notifications);
      }
      setNotifications("");
    }
  };

  const handleClearMessages = () => {
    setServerMessages([]);
    localStorage.removeItem("serverMessages");
  };

  const handleProjectCreation = () => {
    if (socket) {
      socket.emit("updateData", "New project created");
    }
  };
 return (
  <div className="h-screen flex flex-col">
    {/* Top Navbar (fixed height) */}
    <div className="h-10">
      <Navbar
        serverMessages={serverMessages}
        notifications={notifications}
        setNotifications={setNotifications}
        handleSubmit={handleSubmit}
        handleClearMessages={handleClearMessages}
        handleProjectCreation={handleProjectCreation}
        msgOpen={msgOpen}
        setMsgOpen={setMsgOpen}
      />
    </div>

    {/* Sidebar + Main content below Navbar */}
    <div className="flex overflow-hidden">
      {/* Sidebar (left) */}
      <div className="h-full">
        <Menubar />
      </div>

      {/* Page content (right) */}
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        <Outlet />
      </main>
    </div>
  </div>
);
}

export default Layout;
