const express = require('express');
const router = express.Router();
const lisController = require('../controllers/lisController');
const customer = require('../../models/customer');
const { model } = require('mongoose');



//CUSTOMER ROUTER OR CLIENT SIDE

router.get('/Home', lisController.landingPage);
router.get('/About', lisController.aboutPage);
router.get('/Faq', lisController.faqsPage);
router.get('/User-Login', lisController.userLogin);
router.get('/Sign-up', lisController.signupPage);


//ADMIN SIDE ROUTER
router.get('/Admin/Login', lisController.login);
router.post('/Admin', lisController.adminPage);
router.get('/Dashboard', lisController.dashboard);
router.get('/Testtype', lisController.testTypePage);
router.get('/Allcustomer', lisController.listCustomerPage);
router.get('/Test', lisController.test);


//ADMIN CUSTOMER CRUD
router.post('/Allcustomer', lisController.addCustomer);
router.get('/Allcustomer/:id', lisController.editCustomer);
router.patch('/Allcustomer/:id', lisController.updateCustomer);
router.delete('/Allcustomer/:id', lisController.deleteCustomer);

//ADMIN TEST CRUD
router.post('/Test', lisController.addTest);
router.get('/Test/:id', lisController.editTest);
router.patch('/Test/:id', lisController.updateTest);
router.delete('/Test/:id', lisController.deleteTest);





//Process Customer Test
router.get('/Processcustomer/:id', lisController.processCustomer);

router.post('/Processcustomer', lisController.addCustomerTest);

router.post('/SaveTest', lisController.savetest);


module.exports = router;