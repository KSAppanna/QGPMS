import express from 'express';
import timeRoute from './routes/timeLog.auth.js';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import cors from 'cors';

dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cors(
{origin:"http://localhost:5173",
Credentials:true}
))

app.use("/api/",timeRoute)

app.listen(PORT,()=>{
    console.log(`This server is running on port:`, PORT);
    connectDB();
});