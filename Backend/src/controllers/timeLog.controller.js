import time_log_model from "../models/timeLog.model.js";

export const timeLogController = async(req,res)=>{
   const {user,startTime,endTime,duration} = req.body;
   try {
    const newTimeLog = new time_log_model({
        user,
        startTime,
        endTime,
        duration
    });

    await newTimeLog.save();
    
    res.status(201).json({
        _id: newTimeLog._id,
        user: newTimeLog.user,
        startTime: newTimeLog.startTime,
        endTime: newTimeLog.endTime,
        duration: newTimeLog.duration
    })
   } catch (error) {
    console.log("error in timeLogController",error.message);
    res.status(500).json({message: "Internal server error"})
   }
}

export const getTimeLogs = async (req, res) => {
   try {
      const logs = await time_log_model.find(); 
      res.status(200).json(logs);
   } catch (error) {
      console.log("Error fetching time logs:", error.message);
      res.status(500).json({ message: "Internal server error" });
   }
};