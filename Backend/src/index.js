import express from 'express';
import timeRoute from './routes/timeLog.auth.js';
import dotenv from 'dotenv';
import { connectDB } from './db.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.use(express.json());

app.use("/api/",timeRoute)

app.listen(PORT,()=>{
    console.log(`This server is running on port:`, PORT);
    connectDB();
});