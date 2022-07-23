const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8000;

const invRouter = require('./routes/inventory');

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Database Connection Established'));

app.use(express.json());
app.use('/inventory', invRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
