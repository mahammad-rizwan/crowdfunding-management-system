const express = require('express');
const upload = require('../middleware/upload');  
const campaignController = require('../controllers/campaignController');  
const galleryController = require('../controllers/galleryController');  
const {verifyUserToken} = require('../middleware/jwt_verify_user.js'); 

const router = express.Router();

router.get('/createCampaign', verifyUserToken,(req, res) => {
    res.render('createCampaign.ejs');  
  });

router.post('/createCampaign', verifyUserToken,upload.array('photos', 10), async (req, res) => {
  try {

    console.log('Request Body:', req.body);

    console.log('Uploaded Files:', req.files);

    const campaignData = req;
    await campaignController.createCampaign(campaignData); 

    const files = req;
    await galleryController.uploadPhotos(files); 

    res.status(201).send({message:'Campaign and files uploaded successfully!' });
    

  } catch (error) {
    console.error('Error in POST /createCampaign:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
