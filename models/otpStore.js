const mongoose = require('mongoose');

const OtpStoreSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, expires: 120 }, // Auto-delete after 2 minutes
});

module.exports = mongoose.model('OtpStore', OtpStoreSchema);
