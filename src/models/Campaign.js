const db = require('../config/dbConnect');

const Campaign = {
 
  createCampaign: (title, description, goalAmount, raisedAmount,status,user_email) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO campaigns (title, description, goalAmount, raisedAmount, status,user_email) VALUES (?, ?, ?, ?, ?,?)';
      db.query(query, [title, description, goalAmount,raisedAmount, status,user_email], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },


  getCampaignByTitle: (title) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM campaigns WHERE title = ?';
      db.query(query, [title], (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result[0]);
      });
    });
  },
 
  getCampaignsByStatus: (status) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM campaigns WHERE status = ?';
      db.query(query, [status], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  getCampaignsByUseremail: (status) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM campaigns WHERE user_email=?';
      db.query(query, [status], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  

  updateCampaignStatus: (title, newStatus) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE campaigns SET status = ? WHERE title = ?';
      db.query(query, [newStatus, title], (err, result) => {
        if (err) {
          reject(err); 
          return;
        }
        
        
        if (result && result.affectedRows === 0) {
          reject('Campaign not found or status update failed');
          return;
        }
  
        resolve(result);
      });
    });
  },

  deleteCampaignByTitle: (title) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM campaigns WHERE title = ?';
      db.query(query, [title], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};

module.exports = Campaign;
