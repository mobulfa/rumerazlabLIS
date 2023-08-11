
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    fname: String,
    mname: String,
    lname: String,
    role: String,
    licensedno: String,
    title: String,
    contactno: Number,
    email: String,
    password: String
})

module.exports = mongoose.model('Users', Users);


