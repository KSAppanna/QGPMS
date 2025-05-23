import mongoose from "mongoose";

const timeLogSchema = new mongoose.Schema(
{
    user:{
        type: String,
    },

    startTime:{
        type: Date
    },

    endTime:{
        type: Date
    },

    duration:{
        type: String
    }

});

const time_log_model = mongoose.model("time_log_mdoel", timeLogSchema);

export default time_log_model;
