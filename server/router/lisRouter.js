const express = require('express');
const router = express.Router();
const lisController = require('../controllers/lisController');
const customer = require('../../models/customer');
const { model } = require('mongoose');

const credential = {
    email: "admin",
    password: "password"
}

const Validateuser = (req, res, next) => {
    if (req.body.email == credential.email && req.body.password == credential.password) {
        next();
    } else {
        res.send('Unauthorized User')
        res.redirect('admin/login')

    }

}

//CUSTOMER ROUTER OR CLIENT SIDE

router.get('/Home', lisController.landingPage);
router.get('/About', lisController.aboutPage);
router.get('/Faq', lisController.faqsPage);
// router.get('/User-Login', lisController.userLogin);
// router.get('/Sign-up', lisController.signupPage);


//ADMIN SIDE ROUTER
router.get('/Admin/Login', lisController.login);
router.post('/Admin', Validateuser, lisController.adminPage);
router.get('/Dashboard', Validateuser, lisController.dashboard);
router.get('/Testtype', Validateuser, lisController.testTypePage);
router.get('/Allcustomer', Validateuser, lisController.listCustomerPage);
router.get('/Test', Validateuser, lisController.test);


//ADMIN CUSTOMER CRUD

router.post('/Allcustomer', Validateuser, lisController.saveCustomer);
router.get('/Allcustomer/new', Validateuser, lisController.addCustomer)
router.get('/Allcustomer/:id', Validateuser, lisController.editCustomer);
router.patch('/Allcustomer/:id', Validateuser, lisController.updateCustomer);
router.delete('/Allcustomer/:id', Validateuser, lisController.deleteCustomer);



//ADMIN TEST CRUD
router.post('/Test', Validateuser, lisController.addTest);
router.get('/Test/:id', Validateuser, lisController.editTest);
router.patch('/Test/:id', Validateuser, lisController.updateTest);
router.delete('/Test/:id', Validateuser, lisController.deleteTest);





//Process Customer Test
router.post('/Processcustomer/:id/savetest', lisController.addCustomerTest);
router.get('/Processcustomer/:id', lisController.processCustomer);



//VIEW CUSTOMER RESULT ROUTE
router.get('/ViewResult', lisController.viewResult);
router.get('/Processcustomer/:id/updateresult/:resultid', lisController.editResult);
router.patch('/Processcustomer/:id/updateresult/:resultid', lisController.updateResult);

//USER MANAGER ROUTES
router.post('/Usermanager', lisController.saveuser);
router.get('/Usermanager', lisController.userlist);
router.get('/Usermanager/new-userForm', lisController.userForm);
router.get('/Usermanager/:id', lisController.updateUser);
router.patch('/Usermanager/:id', lisController.saveupdateUser);




module.exports = router;