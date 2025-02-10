const express = require('express');
const router = express.Router();
const donationController= require('../controllers/donationController');
const {verifyUserToken} = require('../middleware/jwt_verify_user.js'); 

router.post('/paymentGateway/:title',verifyUserToken, (req, res) => {
    const donar_email = req.cookies.donar_email;
    const entered_amount=req.body.amount;
    res.render('paymentGateway',{email:donar_email,amount:entered_amount}); 
  });

  router.post('/submitPayment',verifyUserToken,donationController.createDonation);

  module.exports=router;