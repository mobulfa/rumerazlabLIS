//Imports
const mongoose = require('mongoose');
const Customer = require('../../models/customer');
const Testlist = require('../../models/testlist');
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
    const countCustomer = await Customer.count({});
    const countTest = await Testlist.count({});
    res.status(200).render('admin/index', { countCustomer, countTest });

})

exports.testTypePage = catchAsync(async (req, res) => {
    res.status(200).render('admin/testtype');
})

exports.listCustomerPage = catchAsync(async (req, res) => {
    const allCustomer = await Customer.find({});
    res.status(200).render('admin/customerlist', { allCustomer });
})

exports.addCustomer = catchAsync(async (req, res) => {
    const newCustomer = new Customer(req.body);
    // console.log(req.body);
    await newCustomer.save();
    res.redirect('/Allcustomer')

})

exports.editCustomer = catchAsync(async (req, res) => {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    if (customer) {
        res.status(200).render('admin/showcustomer', { customer })
    }
})

exports.updateCustomer = catchAsync(async (req, res) => {
    const customerId = req.params.id;
    const customer = await Customer.findByIdAndUpdate(customerId, { ...req.body });
    // , {runValidators:true, new:true});
    res.redirect(`/Allcustomer`);

})

exports.deleteCustomer = catchAsync(async (req, res) => {
    const customerId = req.params.id;
    await Customer.findByIdAndDelete(customerId);
    res.redirect('/Allcustomer')


})
