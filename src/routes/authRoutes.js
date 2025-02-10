const express = require('express');
const bcrypt = require('bcryptjs'); 
const router = express.Router();
const db = require('../config/dbConnect'); 
const jwt = require('../middleware/jwt_generate_token.js'); 

const saltRounds = 10; 

 

router.get('/signup', (req, res) => {
    res.render("signup.ejs");  
  });
  
  
  router.get('/login', (req, res) => {
    res.render("login.ejs");  
  });

router.post('/signup', async (req, res) => {
    const { name, email, contactNumber, password, address } = req.body;

    if (!email || !name || !contactNumber || !password || !address) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {

        const checkQuery = `SELECT * FROM users WHERE email = ?`;
        db.query(checkQuery, [email], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Database error" });
            }
            if (results.length > 0) {
                return res.status(409).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);

        
            const insertQuery = `INSERT INTO users (name, email, contactNumber, password, address) VALUES (?, ?, ?, ?, ?)`;
            db.query(insertQuery, [name, email, contactNumber, hashedPassword, address], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Error creating user" });
                }
                res.redirect('/login');
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.post('/login', async (req, res) => {
    const { email, password, userType } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const tableName = userType === "User" ? "users" : "admin";
        const checkQuery = `SELECT * FROM ${tableName} WHERE email = ?`;

        db.query(checkQuery, [email], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Database error" });
            }
            if (results.length === 0) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const user = results[0];

            
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            

            

            if (userType === "User") {
                res.cookie('donar_email', email, { httpOnly: true });
                const token = jwt.generateToken(req.body);
                res.cookie('auth_token1', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production',  
                maxAge: 3600000  
            });
                return res.redirect('/user/home');
            } else {
                const token = jwt.generateToken(req.body);
                res.cookie('auth_token2', token, {
                httpOnly: true,  
                secure: process.env.NODE_ENV === 'production',  
                maxAge: 3600000  
            });
                return res.redirect('/admin/dashboard');
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
