
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestList = new Schema({
    name: String,
    unittype: String,
    price: {
        type: Number,
        min: 0
    }
})
module.exports = mongoose.model('Testlist', TestList);