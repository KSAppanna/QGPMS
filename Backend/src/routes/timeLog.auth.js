import express from 'express';
import { timeLogController } from '../controllers/timeLog.controller.js';

const router = express.Router();

router.get("/timelog",timeLogController)

export default router;  
