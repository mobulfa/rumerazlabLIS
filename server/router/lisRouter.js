const express = require('express');
const router = express.Router();
const lisController = require('../controllers/lisController');
const customer = require('../../models/customer');
const { model } = require('mongoose');



//CUSTOMER ROUTER OR CLIENT SIDE

router.get('/Home', lisController.landingPage);
router.get('/About', lisController.aboutPage);
router.get('/Faq', lisController.faqsPage);
// router.get('/User-Login', lisController.userLogin);
// router.get('/Sign-up', lisController.signupPage);


//ADMIN SIDE ROUTER
router.get('/Admin/Login', lisController.login);
router.post('/Admin', lisController.adminPage);
router.get('/Dashboard', lisController.dashboard);
router.get('/Testtype', lisController.testTypePage);
router.get('/Allcustomer', lisController.listCustomerPage);
router.get('/Test', lisController.test);


//ADMIN CUSTOMER CRUD

router.post('/Allcustomer', lisController.saveCustomer);
router.get('/Allcustomer/new', lisController.addCustomer)
router.get('/Allcustomer/:id', lisController.editCustomer);
router.patch('/Allcustomer/:id', lisController.updateCustomer);
router.delete('/Allcustomer/:id', lisController.deleteCustomer);



//ADMIN TEST CRUD
router.post('/Test', lisController.addTest);
router.get('/Test/:id', lisController.editTest);
router.patch('/Test/:id', lisController.updateTest);
router.delete('/Test/:id', lisController.deleteTest);





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