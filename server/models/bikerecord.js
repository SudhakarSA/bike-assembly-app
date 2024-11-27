const mongoose = require('mongoose');

module.exports = mongoose.model('BikeRecord', new mongoose.Schema({
    employeeId: String,
    bikeType: String,
    assemblyTime: Number,
    assemblyDate: {
        type: Date,
        default: Date.now
    },
}));