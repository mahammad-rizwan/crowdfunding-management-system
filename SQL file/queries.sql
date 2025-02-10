create database crowdfundding_system;
use crowdfundding_system;

CREATE TABLE admin (
    name VARCHAR(255) NOT NULL,               
    email VARCHAR(255) NOT NULL PRIMARY KEY,  
    contactNumber VARCHAR(15) DEFAULT NULL,  
    password VARCHAR(255) NOT NULL      ,
    address VARCHAR(255) NOT NULL     
);


CREATE TABLE users (
    name VARCHAR(255) NOT NULL,                
    email VARCHAR(255) NOT NULL PRIMARY KEY,    
    contactNumber VARCHAR(15) DEFAULT NULL,     
    password VARCHAR(255) NOT NULL             
);


CREATE TABLE campaign (
    title VARCHAR(255) NOT NULL PRIMARY KEY,        
    description TEXT NOT NULL,             
    goalAmount DECIMAL(15,2) NOT NULL,              
    raisedAmount DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,  
    status ENUM('hold', 'ongoing', 'completed') DEFAULT 'hold' 
);


CREATE TABLE gallery (
    
     VARCHAR(50) NOT NULL,                     
    campaignTitle VARCHAR(255) DEFAULT NULL,           
    photoUrl VARCHAR(255) NOT NULL,                    
    uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP,     
    FOREIGN KEY (campaignTitle) REFERENCES campaign(title), 
    INDEX(campaignTitle)                            
);


CREATE TABLE donations (
    transaction_id VARCHAR(255) PRIMARY KEY,
    campaign_title VARCHAR(255),                  
    donar_email VARCHAR(255),                     
    donar_name VARCHAR(255), 
    amount DECIMAL(10, 2) NOT NULL,               
    payment_method ENUM('upi', 'qr', 'card') NOT NULL, 
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, 

    CONSTRAINT fk_donar_email FOREIGN KEY (donar_email) REFERENCES users(email) 
    ON DELETE CASCADE ON UPDATE CASCADE,
    
    CONSTRAINT fk_campaign_title FOREIGN KEY (campaign_title) REFERENCES campaigns(title) 
    ON DELETE CASCADE ON UPDATE CASCADE
);

//NO SQL for innovative part B

const cryptoDonationSchema = new mongoose.Schema({
  donor_address: { type: String, required: true },   // Crypto wallet address
  amount_in_ether: { type: mongoose.Types.Decimal128, required: true }, // Crypto amount (use Decimal128 for precision)
  transaction_hash: { type: String, unique: true, required: true }, // Transaction hash
  campaign_title: { type: String, required: true },  // Campaign name
  created_at: { type: Date, default: Date.now }  // Auto timestamp
});
