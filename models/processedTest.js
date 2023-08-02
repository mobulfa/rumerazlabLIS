

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProcessedTest = new Schema({

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
    caseno: Number
})
module.exports = mongoose.model('Processedtest', ProcessedTest);
