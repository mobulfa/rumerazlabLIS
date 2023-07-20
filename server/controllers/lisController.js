//Imports
const mongoose = require('mongoose');
const customer = require('../../models/customer');
const catchAsync = require('../../utils/catchAsync');


//DB CONNECTion
mongoose.connect('mongodb://127.0.0.1:27017/lis')
    .then(() => {
        console.log('Connection is OPEN');
    })
    .catch(err => {
        console.log(`Connection Error ${err}`);
    })


//Client Views
exports.landingPage = catchAsync(async (req, res) => {
    // const customers = await customer.find();
    // res.status(200).render('customer/index', { customers });
    res.status(200).render('customer/index');
})

exports.aboutPage = catchAsync(async (req, res) => {
    res.status(200).render('customer/about');
})

exports.faqsPage = catchAsync(async (req, res) => {
    res.status(200).render('customer/faq');
})

exports.userLogin = catchAsync(async (req, res) => {
    res.status(200).render('customer/login');
})

exports.signupPage = catchAsync(async (req, res) => {
    res.status(200).render('customer/signupForm');
})

//ADMIN VIEWS
exports.adminPage = catchAsync(async (req, res) => {
    res.status(200).render('admin/index');
})

exports.testTypePage = catchAsync(async (req, res) => {
    res.status(200).render('admin/testtype');
})

exports.listCustomerPage = catchAsync(async (req, res) => {
    res.status(200).render('admin/customerlist');
})
