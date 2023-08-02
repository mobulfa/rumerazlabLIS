

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerTest = new Schema({

    caseno: Number,
    department: String,
    test: String,
    result: String,
    range: String
})
module.exports = mongoose.model('customerTest', customerTest);
