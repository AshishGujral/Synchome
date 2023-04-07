import mongoose from "mongoose";

const SoilRangeSchema = new mongoose.Schema({
    time:{
        required: true,
        type: String
    },
    moistMax:{
        required: true,
        type: Number
    },
    moistMin:{
        required: true,
        type: Number
    },
    userId:{
        required: true,
        type: String
    }
});

const soilrange = mongoose.model("SoilRange", SoilRangeSchema);

export default soilrange;