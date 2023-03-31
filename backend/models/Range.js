import mongoose from "mongoose";

const RangeSchema = new mongoose.Schema({
    tempMax:{
        required: true,
        type: Number
    },
    tempMin:{
        required: true,
        type: Number
    },
    time:{
        required: true,
        type: String
    },
    humMax:{
        required: true,
        type: Number
    },
    humMin:{
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