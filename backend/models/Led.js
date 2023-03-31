import mongoose from "mongoose";

const LedSchema = new mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    time:{
        required: true,
        type: Date,
        default: Date.now
    },
    ledStatus:{
        required: true,
        type: String
    },
    mode:{
        required:true,
        type: String
    },
    userId:{
        required: true,
        type: String
    }
});

const led  = mongoose.model('Led', LedSchema);

export default led;