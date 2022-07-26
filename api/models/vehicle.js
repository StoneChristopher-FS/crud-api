const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    vin: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: String,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);