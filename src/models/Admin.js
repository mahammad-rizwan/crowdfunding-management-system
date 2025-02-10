const db = require('../config/dbConnect');
const bcrypt = require('bcryptjs');

const saltRounds = 10; 

const Admin = {

  createAdmin: async (name, email, contactNumber, password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      return new Promise((resolve, reject) => {
        const query = `INSERT INTO admin (name, email, contactNumber, password) VALUES (?, ?, ?, ?)`;

        db.query(query, [name, email, contactNumber, hashedPassword], (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });
    } catch (error) {
      throw new Error("Error hashing password");
    }
  },

  
  getAdminByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM admin WHERE email = ?`;

      db.query(query, [email], (err, result) => {
        if (err) {
          reject(err);
        }
        if (result.length === 0) {
          reject('Admin not found');
        }
        resolve(result[0]);
      });
    });
  },

  
};

module.exports = Admin;
