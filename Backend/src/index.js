import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import 'dotenv/config';
import Message from "../Models/Message.js";
import Project from "../Models/ProjectInfo.js";


import connection from "./dbmysql.js";

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: "http://localhost:5173",  
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());


connectDB();



// POST route to save project
app.post("/Projects", async (req, res) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving the project", err);
    res.status(500).json({ error: "Server error" });
  }
});


// Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", async (socket) => {
  console.log("User connected:", socket.id);

  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    socket.emit("initialMessages", messages);
  } catch (err) {
    console.error("Failed to fetch messages:", err);
  }

  socket.on("updateData", async (data) => {
    try {
      const newMessage = new Message({ content: data });
      const saved = await newMessage.save();
      io.emit("updateData", saved);
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  });

  socket.on("clearMessages", async () => {
    try {
      await Message.deleteMany({});
      io.emit("clearMessages");
    } catch (err) {
      console.error("Failed to clear messages:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// endpoint for Project Excel

app.post('/ProjectExcel',(req,res)=>{
  const recievedData =  req.body;
  console.log(recievedData);
  res.status(200).json({message:"Data received successfully"});
})