const db = require('../config/dbConnect'); // Assuming dbConnect is properly configured to connect to your database

const Gallery = {
 
  addPhoto: (fileType, campaignTitle, photoUrl) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO gallery (fileType, campaignTitle, photoUrl)
        VALUES (?, ?, ?)
      `;
      db.query(query, [fileType, campaignTitle, photoUrl], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  

  getAllPhotos: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM gallery`;
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  

  getPhotosByCampaign: (campaignTitle) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM gallery WHERE campaignTitle = ?
      `;
      db.query(query, [campaignTitle], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  deletePhotosByCampaign: (campaignTitle) => {
    return new Promise((resolve, reject) => {
      const query = `
        DELETE FROM gallery WHERE campaignTitle = ?
      `;
      db.query(query, [campaignTitle], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};

module.exports = Gallery;
