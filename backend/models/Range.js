import mongoose from "mongoose";

const RangeSchema = new mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    time:{
        required: true,
        type: String
    },
    minRange:{
        required: true,
        type: Number
    },
    maxRange:{
        required: true,
        type: Number
    },
    userId:{
        required: true,
        type: String
    }
});

const motion = mongoose.model("Motion", MotionSchema);

export default motion;