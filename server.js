'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const requests = require('./routes/requests');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/tdl", requests);

// error handling
app.use((req, res, next) => {
    next(createError(404, 'Resource not found'));
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send(err.message || "something went wrong");
});

const server = app.listen(5000, () => {
    console.log(`Successfully connected to port ${server.address().port}`);
});