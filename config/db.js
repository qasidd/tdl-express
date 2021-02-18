'use strict';

const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { DB_URL, DB_NAME } = require('../config/CONSTS.json');

const tdlSchema = new Schema({
    title: { type: String, required: true },
    completed: Boolean
});

const tdl = model('tdl', tdlSchema);

mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Connected`);
    }
});

module.exports = { "TDL": tdl };