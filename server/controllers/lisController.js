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
exports.login = catchAsync(async (req, res) => {
    res.status(200).render('admin/login')
})

exports.adminPage = catchAsync(async (req, res) => {
    const countCustomer = await Customer.count({});
    const countTest = await Testlist.count({});
    if (req.body.username === 'admin' && req.body.password === 'password') {
        res.status(200).render('admin/index', { countTest, countCustomer });
    } else {
        res.status(200).render('admin/login');
    }
})

exports.dashboard = catchAsync(async (req, res) => {
    const countCustomer = await Customer.count({});
    const countTest = await Testlist.count({});
    res.render('admin/index', { countTest, countCustomer })
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
    await newCustomer.save();
    res.redirect(`/Processcustomer/${newCustomer._id}`)

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

//Test CRUD

exports.test = catchAsync(async (req, res) => {
    const allTest = await Testlist.find({});
    res.status(200).render('admin/testlist', { allTest });
})

exports.addTest = catchAsync(async (req, res) => {
    const newTest = new Testlist(req.body);
    await newTest.save();
    res.redirect('/Test');
})

exports.editTest = catchAsync(async (req, res) => {
    const testID = req.params.id;
    const tesst = await Testlist.findById(testID);


    if (tesst) {
        res.status(200).render('admin/showtest', { tesst })
    }

})

exports.updateTest = catchAsync(async (req, res) => {
    const testID = req.params.id;
    const tesst = await Testlist.findByIdAndUpdate(testID, { ...req.body });
    // , {runValidators:true, new:true});
    res.redirect(`/Test`);

})

exports.deleteTest = catchAsync(async (req, res) => {
    const testID = req.params.id;
    await Testlist.findByIdAndDelete(testID);
    res.redirect('/Test')
})

//Process TEST CRUD

exports.processCustomer = catchAsync(async (req, res) => {
    const customerID = await Customer.findById(req.params.id);
    var caseNo = Math.floor(Math.random() * 900000);
    const allTest = await Testlist.find({});
    // return console.log(customerID.fname)

    res.status(200).render('admin/process', { customerID, allTest, caseNo });


})

