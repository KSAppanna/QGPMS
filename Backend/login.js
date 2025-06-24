import { io } from "socket.io-client";

const loginAsUser = (userId) => {
  const socket = io("http://localhost:3000", {
    query: { userId }
  });

  socket.on("connect", () => {
    console.log(`${userId} connected with socket ID ${socket.id}`);
  });

  socket.on("notification", (data) => {
    console.log(`${userId} got notification:`, data);
  });

  // Example emit
  setTimeout(() => {
    socket.emit("sendMessage", {
      senderId: userId,
      receiverIds: ["userB"],
      content: `Hello from ${userId}`
    });
  }, 2000);
};

loginAsUser("userA");
loginAsUser("userB");
