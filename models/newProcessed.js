

// const { number, types } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Customers = ('./customer')

const newProcessedTest = new Schema({

    // name: String,
    // testtype: String,
    // range: String,
    // result: String,
    // caseno: String,

    customerid: [{
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    }],

    testid: [{
        type: Schema.Types.ObjectId,
        ref: 'Processedtest'
    }]

})
module.exports = mongoose.model('newProcessedTest', newProcessedTest);
