const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/bikeAssembly', {useUnifiedTopology: true});

        console.log("Connected to database successfully");
    } catch (error) {
        console.error('Could not connect to database:', error.message);
    }
};