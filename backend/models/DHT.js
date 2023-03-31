import mongoose from "mongoose";

const DhtSchema = new mongoose.Schema({
    temperature:{
        required: true,
        type: String
    },
    humidity:{
        required: true,
        type: String
    },
    time:{
        required: true,
        type: Date,
        default: Date.now
    }
});

const dht = mongoose.model("Dht", DhtSchema);

export default dht;