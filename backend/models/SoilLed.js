import mongoose from "mongoose";

const SoilLedSchema = new mongoose.Schema({
    time:{
        required: true,
        type: Date,
        default: Date.now
    },
    ledStatus:{
        required: true,
        type: String
    },
    userId:{
        required: true,
        type: String
    }
});

const soilled  = mongoose.model('SoilLed', SoilLedSchema);

export default soilled;