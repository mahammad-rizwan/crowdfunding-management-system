const mysql = require('mysql2');


const db = mysql.createPool({
  host: process.env.HOST,        
  user: process.env.USER,       
  password: process.env.PASSWORD, 
  database: process.env.DB,   
  waitForConnections: true,
  connectionLimit: 10,              
  queueLimit: 0,
});

module.exports = db;
