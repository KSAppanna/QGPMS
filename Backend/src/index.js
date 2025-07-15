// server.js
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import 'dotenv/config';
import Message from "../Models/Message.js";
import Project from "../Models/ProjectInfo.js";
import User from "../Models/User.js";
import path from "path";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Create new project & notify receiver via Socket.IO
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
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Socket.IO setup
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
    const updated = await Message.findByIdAndUpdate(messageId, { read: true }, { new: true });
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
      await Message.updateMany({ _id: { $in: messageIds } }, { $set: { read: true } });
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

// Multer setup
const tempUploadDir = path.join(__dirname, "..", "public", "Temp", "temp");
const finalUploadDir = path.join(__dirname, "..", "public", "Temp", "uploads");
fs.mkdirSync(tempUploadDir, { recursive: true });
fs.mkdirSync(finalUploadDir, { recursive: true });

const attachmentStorage = multer.diskStorage({
  destination: tempUploadDir,
  filename: (req, file, cb) => cb(null, file.originalname)
});

const UploadAttachments = multer({
  limits: { fileSize: 100 * 1024 * 1024 },
  storage: attachmentStorage
});


app.post(
  '/uploadFiles',
  
  (req, res, next) => {
    try {
      req.fileNames = req.headers['x-filenames'] ? JSON.parse(req.headers['x-filenames']) : [];
    } catch (err) {
      req.fileNames = [];
    }
    next();
  },
 
  (req, res, next) => {
    const override = req.query.override === 'true';
    const rename = req.query.rename === 'true';

    const existingFiles = req.fileNames.filter(name =>
      fs.existsSync(path.join(finalUploadDir, name))
    );

    if (existingFiles.length > 0 && !override && !rename) {
      console.log('Conflict found, sending 409:', existingFiles);
      return res.status(409).json({
        message: 'File(s) already exist',
        conflicts: existingFiles
      });
    }
    next();
  },
  
  UploadAttachments.array('files', 100),
  
  (req, res) => {
    const override = req.query.override === 'true';
    const rename = req.query.rename === 'true';
    const savedFiles = [];

    req.files.forEach(file => {
      let targetName = file.originalname;
      let targetPath = path.join(finalUploadDir, targetName);

      if (rename && fs.existsSync(targetPath)) {
        const ext = path.extname(targetName);
        const base = path.basename(targetName, ext);
        let counter = 1;
        let newName;
        do {
          newName = `${base} (${counter})${ext}`;
          targetPath = path.join(finalUploadDir, newName);
          counter++;
        } while (fs.existsSync(targetPath));
        targetName = newName;
      }

      try {
        if (override && fs.existsSync(targetPath)) {
          console.log(`Replacing: ${targetName}`);
          fs.unlinkSync(targetPath); 
        }

        fs.renameSync(file.path, targetPath);
        savedFiles.push({ originalname: file.originalname, savedAs: targetName, size: file.size });
        console.log(`Saved: ${targetName}`);
      } catch (err) {
        console.error(`Error saving ${targetName}:`, err);
      }
    });

    return res.status(200).json({ message: 'Files uploaded successfully', files: savedFiles });
  }
);


httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
