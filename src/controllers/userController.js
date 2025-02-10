

const Campaign = require('../models/Campaign');
const User = require('../models/User');
const Donation = require('../models/Donation');
const { createUser } = require('../models/User');  


const userController = {

    signup: (req, res) => {
      const { name,email, contactNumber, password } = req.body;
      
      User.createUser(name,email, contactNumber, password)
        .then((result) => {
          res.status(201).send('User created successfully!');
        })
        .catch((err) => {
          res.status(500).send('Error creating user');
        });
    },

   

    getUserDetails: async (req, res) => { 
      try {
          const email = req.cookies.donar_email;
  
          if (!email) {
              console.error("No email found in cookies");
              return res.status(400).send("User not logged in");
          }
  
          console.log("Fetching data for email:", email);
  
          const [user, donations,campaigns] = await Promise.all([
              User.getUserByEmail(email),
              Donation.getDonationsByEmail(email),
              Campaign.getCampaignsByUseremail(email).catch((err) => {
                  console.error("Error fetching donations:", err);
                  return [];  // Return an empty array if fetching donations fails
              })
          ]);
  
          // console.log("User Data:", user);
          // console.log("Donations Data:", donations);
          // console.log("Donations Data:", campaigns);
  
          const userData = user || {
              name: "Not provided",
              email: email,
              address: "Not provided",
              contactNumber: "Not provided"
          };
  
          res.render('myProfile', {
              user: userData,
              donations: Array.isArray(donations) ? donations : [],
              campaigns: Array.isArray(campaigns) ? campaigns : []
          });
      } catch (err) {
          console.error("Error fetching User details:", err);
          res.status(500).send("Error fetching User details");
      }
  },
  
  
  

    getUser: (req, res) => {
      const email = req.params.email; 
  
      User.getUserByEmail(email)
        .then((user) => {
          res.status(200).json(user);  
        })
        .catch((err) => {
          console.error(err);
          res.status(404).send('User not found');
        });
    },

    getAllUsers: (req, res) => {
      User.getAllUsers()
        .then((users) => {
          res.render('userList.ejs',{users})
        })
        .catch((err) => {
          console.error(err);
          res.status(404).send('No users found');
        });
    },

    
  };
  
  module.exports = userController;