const CryptoDonations = require('../models/CryptoDbModel'); 
const mongoose = require('mongoose');
const db = require('../config/dbConnect');

const cryptoDonationController = {
  createcryptoDonation: async (req, res) => {
    try {
      console.log(req.body);  

      const { donor_address, amount_in_ether, transaction_hash, inrAmount, campaign_title } = req.body;

      if (!donor_address || !amount_in_ether || !transaction_hash || !inrAmount || !campaign_title) {
        return res.status(400).json({ error: 'All fields are required' });
      }


      const donation = new CryptoDonations({
        donor_address,
        amount_in_ether: mongoose.Types.Decimal128.fromString(amount_in_ether),  
        transaction_hash,
        campaign_title
      });

  
      const savedDonation = await donation.save(); 
      console.log("Donation saved:", savedDonation);  


      const updateCampaignQuery = `
        UPDATE campaigns
        SET raisedAmount = raisedAmount + ?
        WHERE title = ?
      `;


      db.query(updateCampaignQuery, [inrAmount, campaign_title], (err, result) => {
        if (err) {
          console.error("Error updating campaign raisedAmount:", err);
          return res.status(500).json({ error: 'Error updating campaign', details: err.message });
        }

        res.status(201).json({
          message: 'Donation created successfully',
          data: { donation: savedDonation, campaignUpdate: result }
        });
      });

    } catch (err) {
      console.error('Error creating donation:', err);  
      res.status(500).json({ error: 'Error creating donation', details: err.message });
    }
  },

  getAllCryptoDonations: async (req, res) => {
    try {
      const cryptodonations = await CryptoDonations.find().sort({ created_at: -1 });;  // Returns an array of all donations

      if (cryptodonations.length === 0) {
        return res.status(404).send('No donations found');
      }

      res.render('cryptodonationList', { cryptodonations });
      
    } catch (err) {
      console.error('Error retrieving donations:', err); 
      res.status(500).send('Error fetching donations');
    }
  }
};

module.exports = cryptoDonationController;
