

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerList = new Schema({
    caseno: String,
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
    testID: [{
        type: Schema.Types.ObjectId,
        ref: 'Processedtest',
    }]

    // caseno: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Processedtest'
    // }]

})
module.exports = mongoose.model('Customers', CustomerList);
