const mongoose = require('mongoose');

const ledSchema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model('Led', ledSchema);