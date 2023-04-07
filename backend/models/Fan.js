import mongoose from "mongoose";

const FanSchema = new mongoose.Schema({
    time:{
        required: true,
        type: Date,
        default: Date.now
    },
    userId:{
        required: true,
        type: String
    },
    speed:{
        required: true,
        type: Number
    },
    status:{
        required: true,
        type: String
    }
});

const fan = mongoose.model("Fan", FanSchema);

export default fan;