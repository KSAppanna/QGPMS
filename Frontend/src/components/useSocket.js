// src/hooks/useSocket.js
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (userId, msgOpen) => {
  const [socket, setSocket] = useState(null);
  const [serverMessages, setServerMessages] = useState(() => {
    const saved = localStorage.getItem("serverMessages");
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState("");
  const msgOpenRef = useRef(msgOpen);

  useEffect(() => {
    msgOpenRef.current = msgOpen;
  }, [msgOpen]);

  useEffect(() => {
    localStorage.setItem("serverMessages", JSON.stringify(serverMessages));
  }, [serverMessages]);

  useEffect(() => {
    const socketInstance = io("http://localhost:3000", {
      query: { userId },
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to socket server");
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    if (!socket) return;

    const handleIncoming = (message) => {
      setServerMessages((prev) => [...prev, message]);
      if (!msgOpenRef.current) {
        setNotifications((prev) => prev + 1);
      }
    };

    const handleInitialMessages = (messages) => {
      setServerMessages(messages);
    };

    const handleUpdatedMessage = (updatedMessage) => {
      setServerMessages((prev) =>
        prev.map((msg) => (msg._id === updatedMessage._id ? updatedMessage : msg))
      );
    };

    socket.on("updateData", handleIncoming);
    socket.on("initialMessages", handleInitialMessages);
    socket.on("messageUpdated", handleUpdatedMessage);

    return () => {
      socket.off("updateData", handleIncoming);
      socket.off("initialMessages", handleInitialMessages);
      socket.off("messageUpdated", handleUpdatedMessage);
    };
  }, [socket]);

  const handleProjectCreation = () => {
    if (!socket) return;
    socket.emit("updateData", {
      content: "Project created",
      senderId: userId,
      receiverId: userId === "userA" ? "userB" : "userA",
      timestamp: new Date().toISOString(),
      read: false,
    });
  };

  const handleClearMessages = () => {
    setServerMessages([]);
    localStorage.removeItem("serverMessages");
  };

  return {
    socket,
    serverMessages,
    notifications,
    setNotifications,
    handleProjectCreation,
    handleClearMessages,
  };
};

export default useSocket;
