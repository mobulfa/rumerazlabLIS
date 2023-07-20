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

router.get('/Admin', lisController.adminPage);
router.get('/Testtype', lisController.testTypePage);
router.get('/Allcustomer', lisController.listCustomerPage);

module.exports = router;