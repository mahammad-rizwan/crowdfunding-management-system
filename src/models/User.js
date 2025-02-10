const db = require('../config/dbConnect');


const User = {
    createUser: ( name,email, contactNumber, password) => {
      return new Promise((resolve, reject) => {

        const query = `INSERT INTO users (name,email, contactNumber, password) VALUES (?, ?, ?, ?, ?)`;
        
        db.query(query, [ name,email, contactNumber, password], (err, result) => {
          if (err) {
            reject(err);  
          }
          resolve(result);  
        });
      });
    },
  

    getUserByEmail: (email) => {
      return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE email = ?`;

        db.query(query, [email], (err, result) => {
          if (err) {
            reject(err);  
          }
          if (result.length === 0) {
            reject('User not found');  
          }
          resolve(result[0]);  
        });
      });
    },

    getAllUsers: () => {
      return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users`;
    

        db.query(query, (err, result) => {
          if (err) {
            reject(err); 
          }
          if (result.length === 0) {
            reject('No users found'); 
          }
          resolve(result); 
        });
      });
    },
    
    
  };
  
  module.exports = User;