
const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerList = new Schema({
    casenumber: Number,
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
    email: String,
    gender: String,
    birthdate: String,
    username: String,
    password: String
})
module.exports = mongoose.model('Customers', CustomerList);
