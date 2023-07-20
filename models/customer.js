
const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerList = new Schema({
    casenumber: Number,
    name: String,
    age: {
        type: Number,
        min: 0
    },
    address: String,
    contact: {
        type: Number,
        min: 12
    }
})
module.exports = mongoose.model('Customer', CustomerList);

const TestList = new Schema({
    name: String,
    unittype: String,
    price: {
        type: Number,
        min: 0
    }
})
module.exports = mongoose.model('Testlist', TestList);