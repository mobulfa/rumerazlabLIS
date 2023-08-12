//---------------------Imports
const mongoose = require('mongoose');
const Customer = require('../../models/customer');
const Testlist = require('../../models/testlist');
const Processedtest = require('../../models/processedTest');
const newProcessedTest = require('../../models/newProcessed');
const newUser = require('../../models/user');
const catchAsync = require('../../utils/catchAsync');

var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();
var day = date.getDay();
var randNum = Math.floor(Math.random() * 900000);

const credential = {
    email: "admin",
    password: "password"
}



// mongoose.connect('mongodb://127.0.0.1:27017/lis')
//     .then(() => {
//         console.log('Connection is OPEN');
//     })
//     .catch(err => {
//         console.log(`Connection Error ${err}`);
//     })


//---------------------Client Views Route CallBacks
exports.landingPage = catchAsync(async (req, res) => {
    res.status(200).render('customer/index');
})

exports.aboutPage = catchAsync(async (req, res) => {
    res.status(200).render('customer/about');
})

exports.faqsPage = catchAsync(async (req, res) => {
    res.status(200).render('customer/faq');
})

// exports.userLogin = catchAsync(async (req, res) => {
//     res.status(200).render('customer/login');
// })

// exports.signupPage = catchAsync(async (req, res) => {
//     res.status(200).render('customer/signupForm');
// })

//----------------------ADMIN VIEWS Route CallBacks
exports.login = catchAsync(async (req, res) => {
    res.status(200).render('admin/login')
})

exports.adminPage = catchAsync(async (req, res) => {
    const countCustomer = await Customer.count({});
    const countTest = await Testlist.count({});

    res.status(200).render('admin/index', { countTest, countCustomer });

})

exports.dashboard = catchAsync(async (req, res) => {
    const countCustomer = await Customer.count({});
    const countTest = await Testlist.count({});
    if (req.session.user) {
        res.render('admin/index', { countTest, countCustomer, user: req.session.user })
    } else {
        res.send("Unauthorize User")
    }
})

exports.testTypePage = catchAsync(async (req, res) => {
    res.status(200).render('admin/testtype');
})

exports.listCustomerPage = catchAsync(async (req, res) => {
    if (req.query) {
        const fname = req.query.fname;
        const lname = req.query.lname;

        if (req.query.fname && req.query.lname) {
            const allCustomer = await Customer.find({ fname: `${fname}`, lname: `${lname}` });

            if (!allCustomer) {

                req.flash('success', 'No Found Record');
                res.status(200).render('admin/customerlist', { message: req.flash('success') });
            }// } else {
            //     res.status(200).render('admin/customerlist', { allCustomer });
            // }

        } else {
            const allCustomer = await Customer.find({});
            res.status(200).render('admin/customerlist', { allCustomer });
        }

        if (!req.query) {
            const allCustomer = await Customer.find({});
            return console.log(allCustomer)
            res.status(200).render('admin/customerlist', { allCustomer });
        }
    }


})


//--------------------CUSTOMER CRUD Route CallBacks
exports.saveCustomer = catchAsync(async (req, res) => {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.redirect(`/Processcustomer/${newCustomer._id}`)

})
exports.addCustomer = catchAsync(async (req, res) => {
    var caseno = 'Rumeraz-' + Math.floor(Math.random() * 900000);
    res.render(`admin/addtestocustomer`, { caseno })
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
    res.redirect(`/Allcustomer`);

})

exports.deleteCustomer = catchAsync(async (req, res) => {
    const customerId = req.params.id;
    await Customer.findByIdAndDelete(customerId);
    res.redirect('/Allcustomer')


})



//-----------------------------Process TEST CRUD

exports.processCustomer = catchAsync(async (req, res) => {
    const customerID = await Customer.findById(req.params.id).populate('testID');
    const allTest = await Testlist.find({});
    const months = month + 1;
    const testref = 'Lab-' + months + '-' + day + '-' + year + '-' + randNum;
    res.status(200).render('admin/process', { customerID, allTest, testref });
})

exports.addCustomerTest = catchAsync(async (req, res) => {

    const customerId = await Customer.findById(req.params.id);
    const newTest = new Processedtest(req.body.tests);
    customerId.testID.push(newTest);

    await newTest.save();
    await customerId.save();

    res.redirect(`/Processcustomer/${customerId._id}`)

})




//------------------------VIEW RESULT ROUTE Route CallBacks
exports.viewResult = catchAsync(async (req, res) => {

    if (req.query) {

        if (req.query.caseno) {
            const caseno = req.query.caseno;
            const customerCaseno = await Customer.findOne({ caseno: `${caseno}` });
            const testCaseno = await Processedtest.find({ caseno: `${caseno}` });
            console.log(customerCaseno, testCaseno);
            res.status(200).render('customer/viewResultForm', { customerCaseno, testCaseno });

        } if (!req.query.caseno) {
            const caseno = req.query.caseno;
            const customerCaseno = await Customer.findOne({ caseno: `${caseno}` });
            const testCaseno = await Processedtest.find({ caseno: `${caseno}` });
            res.status(200).render('customer/viewResultForm', { customerCaseno, testCaseno });

        }
    }
    // res.status(200).render('customer/viewResultForm');

})

exports.editResult = catchAsync(async (req, res) => {
    const customerId = await Customer.findById(req.params.id);
    const resultID = await Processedtest.findById(req.params.resultid);
    const emp = await newUser.find({});

    res.render('admin/updateResult', { customerId, resultID, emp });

})

exports.updateResult = catchAsync(async (req, res) => {
    const customerId = req.params.id;
    const resultID = req.params.resultid;
    const updateTestResult = await Processedtest.findByIdAndUpdate(resultID, { ...req.body.tests });
    res.redirect(`/Processcustomer/${customerId}`)
})
//-------------------------Test CRUD Route CallBacks

exports.test = catchAsync(async (req, res) => {
    const allTest = await Testlist.find({});
    res.status(200).render('admin/testlist', { allTest });
})

exports.addTest = catchAsync(async (req, res) => {
    const newTest = new Testlist(req.body);
    const testID = new newProcessedTest(req.body);

    testID.testid.push(newTest);

    await newTest.save();
    await testID.save();
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
    res.redirect(`/Test`);

})

exports.deleteTest = catchAsync(async (req, res) => {
    const testID = req.params.id;
    await Testlist.findByIdAndDelete(testID);
    res.redirect('/Test')
})

//------------USER MANAGER CALLBACK ROUTES

exports.saveuser = catchAsync(async (req, res) => {
    const newuser = new newUser(req.body);
    await newuser.save();
    res.redirect('/Usermanager');
})

exports.userlist = catchAsync(async (req, res) => {
    const findAlluser = await newUser.find({});

    res.status(200).render('admin/userlist', { findAlluser });
})

exports.userForm = catchAsync(async (req, res) => {
    res.render('admin/new-userForm');
})

exports.updateUser = catchAsync(async (req, res) => {
    const userID = req.params.id;
    const findUserid = await newUser.findById(userID);
    res.render('admin/updateuser', { findUserid });
})

exports.saveupdateUser = catchAsync(async (req, res) => {
    const userID = req.params.id;
    const user = await newUser.findByIdAndUpdate(userID, { ...req.body });

    res.redirect(`/Usermanager`);
})