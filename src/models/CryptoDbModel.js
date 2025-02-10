const mongoose = require('mongoose');

const cryptoDonationSchema = new mongoose.Schema({
  donor_address: { type: String, required: true },   
  amount_in_ether: { type: mongoose.Types.Decimal128, required: true }, 
  transaction_hash: { type: String, unique: true, required: true }, 
  campaign_title: { type: String, required: true }, 
  created_at: { type: Date, default: Date.now }  
});


const CryptoDonations = mongoose.model('CryptoDonations', cryptoDonationSchema);

module.exports = CryptoDonations;
