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