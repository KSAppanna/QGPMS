// SocketContext.js
import React, { createContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";
import { IoIosNotifications } from "react-icons/io";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
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
          icon: <IoIosNotifications />,
        });
      }
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => socketInstance.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={{
      socket,
      serverMessages,
      setServerMessages,
      msgOpen,
      setMsgOpen
    }}>
      {children}
    </SocketContext.Provider>
  );
};
