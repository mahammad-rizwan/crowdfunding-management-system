const express =require('express');
const dotenv=require('dotenv').config();
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const multer = require('multer');
const db = require('./config/dbConnect');
const mongoose = require('mongoose');

const {verifyUserToken} = require('../src/middleware/jwt_verify_user.js'); 
const {verifyAdminToken} = require('../src/middleware/jwt_verify_admin.js'); 


const cryptodonationController = require('./controllers/cryptodonationController.js');


const uri = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000, 
    });
    // console.log("Connected to MongoDB with Mongoose");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); 
  }
}

connectDB();


const app=express();


//middelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(methodOverride('_method'));

const path=require("path");


const userRoutes = require('./routes/userRoutes');
// const campaignRoutes = require('./routes/campaignRoutes');
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes");
const campaignGalleryRoutes = require("./routes/campaignGalleryRoutes");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));




app.use(authRoutes);
app.use(campaignGalleryRoutes );
app.use(donationRoutes);
app.use(userRoutes);
app.use(adminRoutes);
// app.use(campaignRoutes);


app.post("/save-donation",cryptodonationController.createcryptoDonation);



// start server
const PORT=process.env.PORT || 5500;
app.listen(PORT,(req,res)=>{
    console.log("app is listening at port ",process.env.PORT);

  });