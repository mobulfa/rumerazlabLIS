const express = require('express');
const router = express.Router();
const lisController = require('../controllers/lisController');
const customer = require('../../models/customer');
const { model } = require('mongoose');



//CUSTOMER ROUTER

router.get('/Home', lisController.landingPage);
router.get('/About', lisController.aboutPage);
router.get('/Faq', lisController.faqsPage);
router.get('/User-Login', lisController.userLogin);
router.get('/Sign-up', lisController.signupPage);


module.exports = router;