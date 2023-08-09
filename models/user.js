
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestList = new Schema({
    fname: String,
    mname: String,
    lname: String,
    role: String,
    licensedno: String,
    title: String,
    contactno: Number,
    email: String,
    unme: String,
    password: String
})

module.exports = mongoose.model('Testlist', TestList);


