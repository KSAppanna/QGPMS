import express from 'express';
import { timeLogController } from '../controllers/timeLog.controller.js';
import { getTimeLogs } from '../controllers/timeLog.controller.js';

const router = express.Router();

router.post("/timelog",timeLogController)
router.get("/timelog", getTimeLogs);

export default router;  
