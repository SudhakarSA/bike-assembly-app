const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
// const mongoose = require('mongoose');
require('./mongodb')();

require('./models')

mongoose.connect('mongodb://localhost:27017/bikeAssembly', {});

app.use(require('./routes'));

app.listen(3031, () => console.log('Server running on http://localhost:3031'));
