const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = mongoose.model('Employee');
const BikeRecord = mongoose.model('BikeRecord');
const Router = express.Router();


// Middleware for Authentication
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied');

    try {
        req.user = jwt.verify(token, 'secretkey');
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

// Routes
Router.post('/login', async (req, res) => {
    const { name, password } = req.body;

    const employee = await Employee.findOne({ name });
    if (!employee) return res.status(400).send('Invalid credentials');

    const valid = await bcrypt.compare(password, employee.password);
    if (!valid) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: employee._id, name: employee.name }, 'secretkey', { expiresIn: '1h' });
    res.send({ token });
});

Router.post('/assemble', auth, async (req, res) => {
    const { bikeType } = req.body;

    const times = { 1: 50, 2: 60, 3: 80 };
    const assemblyTime = times[bikeType];

    if (!assemblyTime) return res.status(400).send('Invalid bike type');

    await BikeRecord.create({
        employeeId: req.user.id,
        bikeType,
        assemblyTime,
    });

    res.send('Bike assembly recorded');
});

Router.get('/dashboard', auth, async (req, res, next) => {
    let { from, to } = req.query;

    if (!from || !to) {
        return next(new Error('Start time or End time is missing!'));
    }

    from = parseInt(from);
    to = parseInt(to);

    const filter = {
        assemblyDate: { $gte: new Date(from), $lte: new Date(to) }
    };

    const records = await BikeRecord.find(filter);

    const groupedByEmployee = records.reduce((acc, record) => {
        acc[record.employeeId] = (acc[record.employeeId] || 0) + 1;
        return acc;
    }, {});

    res.send({ totalBikes: records.length, groupedByEmployee });
});

module.exports = Router;