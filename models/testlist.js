
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestList = new Schema({
    name: String,
    test: String,
    siunit: String,
    range: String
})

module.exports = mongoose.model('Testlist', TestList);


