import mongoose from "mongoose";

const SoilSchema = new mongoose.Schema({
    moisture:{
        required: true,
        type: String
    },
    time:{
        required: true,
        type: Date,
        default: Date.now
    },
    userId:{
        required: true,
        type: String
    }
});

const soil = mongoose.model("soil", SoilSchema);

export default soil;