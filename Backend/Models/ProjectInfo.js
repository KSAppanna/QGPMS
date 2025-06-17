import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    cfasId: { type: String, required: true },
    sow: { type: String, required: true },
    cilliCode: String,
    permit: String,
    wireCenter: String,
    nppaxNo: Number,
    pfpAddress: String,
    daNumber: String,
    jobName: { type: String, required: true },
    f1CfasId: { type: String, required: true },
    f2CfasId: { type: String, required: true },
    psaNumber: String,
    attScore: Number,
    state: { type: String, required: true },
    receivedDate: { type: String, required: true },
    dueDate: { type: String, required: true },


});

const Project = mongoose.model('Project',projectSchema)
export default Project;