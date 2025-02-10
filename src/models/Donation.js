const db = require('../config/dbConnect');
const { v4: uuidv4 } = require('uuid'); 

const Donation = {
  
  createDonation: (campaign_title,donar_email,donar_name,amount, payment_method) => {

    return new Promise((resolve, reject) => {
      const transaction_id = uuidv4();  
      const query = `INSERT INTO donations (transaction_id, campaign_title, donar_email,donar_name, amount, payment_method) 
                     VALUES (?, ?, ?,?, ?, ?)`;

      const updateCampaignQuery = `
                     UPDATE campaigns
                     SET raisedAmount = raisedAmount + ?
                     WHERE title = ?
                   `;
      
      db.query(query, [transaction_id, campaign_title,donar_email,donar_name, amount, payment_method], (err, result) => {
        if (err) {
          reject(err); 
        }
    
       
        db.query(updateCampaignQuery, [amount, campaign_title], (updateErr, updateResult) => {
          if (updateErr) {
            reject(updateErr); 
          }
          resolve(updateResult);
        });
      });
    });
  },

  
  deleteDonationByCampaign: (campaign_title) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM donations WHERE campaign_title = ?`;

      db.query(query, [campaign_title], (err, result) => {
        if (err) {
          reject(err); 
        }
        if (result.affectedRows === 0) {
          reject('No donations found for this campaign'); 
        }
        resolve('All donations deleted for the campaign successfully'); 
      });
    });
  },


  getDonationsByEmail: (donar_email) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM donations WHERE donar_email = ?`;

      db.query(query, [donar_email], (err, result) => {
        if (err) {
          reject(err); 
        }
        if (result.length === 0) {
          reject('No donations found for this email'); 
        }
        resolve(result);  
      });
    });
  },

  getAllDonations: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM donations ORDER BY timestamp DESC';  

      db.query(query, (err, result) => {
        if (err) {
          reject(err);  
        }
        if (result.length === 0) {
          reject('No donations found');  
        }
        resolve(result); 
      });
    });
  },


  getDonationsByCampaignTitle: (campaign_title) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM donations WHERE campaign_title = ? ORDER BY timestamp DESC`;

      db.query(query, [campaign_title], (err, result) => {
        if (err) {
          reject(err);  
        }
        resolve(result); 
      });
    });
  }
};

module.exports = Donation;
