const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic account fields
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },

  // ✅ ADD THIS (for admin / user)
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  // Profile fields
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  bloodGroup: { type: String },
  contact: { type: String },
  address: { type: String },
  type: { type: String, enum: ['donor', 'receiver'], default: 'donor' },

  // Optional tracking fields
  donationHistory: [
    {
      date: { type: String },
      location: { type: String }
    }
  ],
  requestHistory: [
    {
      date: { type: String },
      bloodGroup: { type: String },
      status: { type: String }
    }
  ],
  nextEligibleDate: { type: String }
});

module.exports = mongoose.model('User', userSchema);
