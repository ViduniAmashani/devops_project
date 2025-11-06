const mongoose = require("mongoose");

// ✅ Name must be donorSchema (not donorScheme)
const donorSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: String,
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// ✅ Export with correct variable name
module.exports = mongoose.model("Donor", donorSchema);
