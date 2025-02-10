const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController'); 
const galleryController = require('../controllers/galleryController'); 
const userController = require('../controllers/userController'); 
const {verifyUserToken} = require('../middleware/jwt_verify_user.js'); 




router.get('/about',verifyUserToken, (req, res) => {
  res.render("about.ejs");  
});

router.get('/user/logout',(req, res) => {
  res.clearCookie('auth_token1');
  res.redirect('/login'); 
  });

router.get('/user/home',verifyUserToken,campaignController.showOngoingCampaignsForHome);
router.get('/user/home', (req, res) => {
 
  res.render("home.ejs"); 
});
router.get('/createCampaign',verifyUserToken, (req, res) => {
  res.render("createCampaign.ejs"); 
});

router.post('/myprofile',verifyUserToken,userController.getUserDetails);



router.get('/campaign/:title',verifyUserToken,campaignController.getCampaignByTitle);

router.get('/ongoingCampaigns',verifyUserToken,campaignController.showOngoingCampaigns);



module.exports = router;
