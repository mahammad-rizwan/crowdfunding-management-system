const Donation = require('../models/Donation');  

const donationController = {
  createDonation: (req, res) => {
    const donar_name=req.body.donar_name;
    const {  campaign_title,donar_email,amount, payment_method } = req.body;
    
    if (!donar_email || !campaign_title || !donar_name|| !amount || !payment_method) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    Donation.createDonation(campaign_title,donar_email,donar_name, amount, payment_method)
      .then(result => {
        res.status(201).json({ message: 'Donation created successfully', data: result });
      })
      .catch(err => {
        res.status(500).json({ error: 'Error creating donation', details: err });
      });
  },

  deleteDonationByCampaign: (req, res) => {
    const { campaign_title } = req.params;
    
    if (!campaign_title) {
      return res.status(400).json({ error: 'Campaign title is required' });
    }

    Donation.deleteDonationByCampaign(campaign_title)
      .then(message => {
        res.status(200).json({ message: message });
      })
      .catch(err => {
        res.status(500).json({ error: 'Error deleting donations', details: err });
      });
  },

  getDonationsByEmail: (req, res) => {
    const { donar_email } = req.params;
    
    if (!donar_email) {
      return res.status(400).json({ error: 'Donor email is required' });
    }

    Donation.getDonationsByEmail(donar_email)
      .then(donations => {
        res.status(200).json({ donations: donations });
      })
      .catch(err => {
        res.status(500).json({ error: 'Error retrieving donations', details: err });
      });
  },

  getAllDonations: (req, res) => {
    Donation.getAllDonations()
      .then((donations) => {
        res.render('donationList', { donations });   
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error fetching donations'); 
      });
  },

  getDonationsByCampaignTitle: (req, res) => {
    const { campaign_title } = req.params;

    if (!campaign_title) {
      return res.status(400).json({ error: 'Campaign title is required' });
    }

    Donation.getDonationsByCampaignTitle(campaign_title)
      .then(donations => {
        res.status(200).json({ donations: donations });
      })
      .catch(err => {
        res.status(500).json({ error: 'Error retrieving donations for this campaign', details: err });
      });
  }
};

module.exports = donationController;
