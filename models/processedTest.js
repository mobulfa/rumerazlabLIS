

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProcessedTest = new Schema({
    caseno: Number,
    fname: String,
    lname: String,
    mname: String,
    age: {
        type: Number,
        min: 0
    },
    address: String,
    contact: {
        type: Number,
        min: 11
    },
    department: String,
    test: String,
    result: String,
    range: String
})
module.exports = mongoose.model('Processedtest', ProcessedTest);
