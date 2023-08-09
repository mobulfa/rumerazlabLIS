

const { number, types } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Customers = ('./customer')

const ProcessedTest = new Schema({
    name: String,
    testtype: String,
    range: String,
    result: String,
    caseno: String,
    testref: String

})
module.exports = mongoose.model('Processedtest', ProcessedTest);
