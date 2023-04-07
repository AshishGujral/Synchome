import mongoose from "mongoose";

const MotionSchema = new mongoose.Schema({
    time:{
        required: true,
        type: Date,
        default: Date.now
    },
    status:{
        required: true,
        type: String
    },
    userId:{
        required: true,
        type: String
    }
});

const motion = mongoose.model("Motion", MotionSchema);

export default motion;