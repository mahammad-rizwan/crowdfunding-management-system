const Campaign = require('../models/Campaign'); 
const Gallery = require('../models/Gallery');  
const Donation = require('../models/Donation'); 


const campaignController = {
  createCampaign: (req, res) => {
    const  title  = req.body.title;
    const  description =req.body.description;
    const  goalAmount =req.body.goalAmount;
    const raisedAmount=0;
    const status="hold";
    const user_email=req.cookies.donar_email;

    Campaign.createCampaign(title, description, goalAmount, raisedAmount,status,user_email)
      .then((result) => {
        
      })
      .catch((err) => {
        console.error(err);
        
      });
  },

 
  getCampaignByTitle: (req, res) => { 
    const title = req.params.title;
    
    Promise.all([
      Campaign.getCampaignByTitle(title),
      Gallery.getAllPhotos(),
      Donation.getDonationsByCampaignTitle(title)
    ])
      .then(([campaigns, allPhotos,donations]) => {
        res.render('campaign', {
          campaign: campaigns || [],
          allPhotos: allPhotos || [],
          donations :donations ||[],
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error fetching campaigns or photos');
      });
  },

  
  approveCampaign: (req, res) => {
    const title = req.params.title; 

    Campaign.updateCampaignStatus(title, 'ongoing')  
      .then((result) => {
        res.status(200).send('Campaign approved successfully!');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error1 approving campaign');
      });
  },

  showOngoingCampaigns: (req, res) => {
    Promise.all([
      Campaign.getCampaignsByStatus('ongoing'), 
      Gallery.getAllPhotos() 
    ])
      .then(([ongoingCampaigns, allPhotos]) => {
        res.render('ongoingCampaigns', {
          ongoingCampaigns: ongoingCampaigns || [],
          allPhotos: allPhotos || [],
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error fetching campaigns or photos');
      });
  },
  showOngoingCampaignsForAdmin: (req, res) => {
    Promise.all([
      Campaign.getCampaignsByStatus('ongoing'), 
      Gallery.getAllPhotos() 
    ])
      .then(([ongoingCampaigns, allPhotos]) => {
        res.render('editOngoingCampaigns', {
          ongoingCampaigns: ongoingCampaigns || [],
          allPhotos: allPhotos || [],
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error fetching campaigns or photos');
      });
  },

  showOngoingCampaignsForHome :(req, res) => {
    Promise.all([
      Campaign.getCampaignsByStatus('ongoing'), 
      Gallery.getAllPhotos() 
    ])
      .then(([ongoingCampaigns, allPhotos]) => {
        res.render('home', {
          ongoingCampaigns: ongoingCampaigns || [],
          allPhotos: allPhotos || [],
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error fetching campaigns or photos');
      });
  },

  showCampaignByTitle: (req, res) => {
    const campaignTitle = req.params.title; 

    Campaign.getCampaignByTitle(campaignTitle)
      .then((campaign) => {
        if (!campaign) {
          return res.status(404).send('Campaign not found');
        }

        res.render('campaign', { campaign: campaign });
      })
      .catch((err) => {
        console.error(`Error fetching campaign: ${campaignTitle}`, err);
        res.status(500).send('Error fetching campaign details');
      });
  },
  
  
  
  rejectCampaign: (req, res) => {
    const title = req.params.title; 

    Campaign.deleteCampaignByTitle(title)  
      .then((result) => {
        res.status(200).send('Campaign rejected and deleted');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error rejecting campaign');
      });
  },
};

module.exports = campaignController;
