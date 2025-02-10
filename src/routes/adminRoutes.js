
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');  
const galleryController = require('../controllers/galleryController');  
const campaignController = require('../controllers/campaignController');  
const userController = require('../controllers/userController');
const donationController = require('../controllers/donationController');
const cryptodonationController = require('../controllers/cryptodonationController');


const {verifyAdminToken} = require('../middleware/jwt_verify_admin.js'); 




router.get('/admin/dashboard', verifyAdminToken,(req, res) => {
   
    res.render("dashboard.ejs"); 
  });

router.get('/admin/addadmins',verifyAdminToken, (req, res) => {
    res.render("addAdmins.ejs"); 
  });

router.get('/admin/logout',(req, res) => {
  res.clearCookie('auth_token2');
  res.redirect('/login'); 
  });

router.post('/addadmins', adminController.createAdmin);

router.get('/admin/editCampaign',verifyAdminToken,campaignController.showOngoingCampaignsForAdmin);


router.get('/admin/waitinglist', verifyAdminToken,adminController.showwaitinglist);

router.get('/admin/userlist', verifyAdminToken,userController.getAllUsers);

router.get('/admin/donationlist',verifyAdminToken,donationController.getAllDonations);

router.get('/admin/cryptodonationlist',verifyAdminToken,cryptodonationController.getAllCryptoDonations);


router.post('/admin/campaigns/:title/accept',verifyAdminToken, adminController.approveCampaign);



router.post('/admin/campaigns/:title/reject',verifyAdminToken, adminController.rejectCampaign,galleryController.deletePhotosByCampaign);

router.post('/admin/campaigns/:title/delete', verifyAdminToken,adminController.deleteCampaign,galleryController.deletePhotosByCampaign);

router.post('/admin/campaigns/:title/complete',verifyAdminToken,adminController.completeCampaign);



module.exports = router; 