import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import 'dotenv/config';
import Message from "../Models/Message.js";
import Project from "../Models/ProjectInfo.js";
import User from "../Models/User.js";

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH"],
  credentials: true
}));

app.use(express.json());


connectDB().then(async () => {
  const existing = await User.find({ userId: { $in: ["userA", "userB"] } });
  const existingIds = existing.map(u => u.userId);
  const usersToCreate = [];
  if (!existingIds.includes("userA")) usersToCreate.push({ userId: "userA", name: "Alice", password: "pass123" });
  if (!existingIds.includes("userB")) usersToCreate.push({ userId: "userB", name: "Bob", password: "pass456" });
  if (usersToCreate.length) await User.insertMany(usersToCreate);
});

app.post("/Projects", async (req, res) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();
    const { senderId, receiverId } = req.body;

    const message = new Message({
      content: "Project created",
      senderId,
      receiverId,
      timestamp: new Date(),
      read: false
    });

    const savedMessage = await message.save();
    const receiver = await User.findOne({ userId: receiverId });

    if (receiver?.socketId) {
      io.to(receiver.socketId).emit("updateData", savedMessage);
    }

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", async (socket) => {
  const { userId } = socket.handshake.query;
  const user = await User.findOne({ userId });
  if (!user) return socket.disconnect();

  user.socketId = socket.id;
  user.isOnline = true;
  await user.save();

  const messages = await Message.find({ receiverId: userId }).sort({ timestamp: 1 });
  socket.emit("initialMessages", messages);

  // Handle incoming message
  socket.on("updateData", async (data) => {
    const { content, senderId, receiverId, timestamp } = data;
    const newMessage = new Message({ content, senderId, receiverId, timestamp: timestamp || new Date() });
    const saved = await newMessage.save();

    const receiver = await User.findOne({ userId: receiverId });
    if (receiver?.socketId) {
      io.to(receiver.socketId).emit("updateData", saved);
    }
  });


  socket.on("markAsRead", async (messageId) => {
    const updated = await Message.findByIdAndUpdate(
      messageId,
      { read: true },
      { new: true }
    );
    if (updated) {
      socket.emit("messageUpdated", updated);
      const receiver = await User.findOne({ userId: updated.receiverId });
      if (receiver?.socketId) {
        io.to(receiver.socketId).emit("messageUpdated", updated);
      }
    }
  });


  socket.on("markAllAsRead", async (messageIds) => {
    try {
      await Message.updateMany(
        { _id: { $in: messageIds } },
        { $set: { read: true } }
      );

      const updatedMessages = await Message.find({ _id: { $in: messageIds } });
      updatedMessages.forEach(async (msg) => {
        socket.emit("messageUpdated", msg);
        const receiver = await User.findOne({ userId: msg.receiverId });
        if (receiver?.socketId) {
          io.to(receiver.socketId).emit("messageUpdated", msg);
        }
      });
    } catch (error) {
      console.error("Error in markAllAsRead:", error);
    }
  });


  socket.on("disconnect", async () => {
    user.isOnline = false;
    user.lastSeen = new Date();
    await user.save();
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
