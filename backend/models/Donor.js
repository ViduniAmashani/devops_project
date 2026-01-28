const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: String,
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    address: { type: String, required: true },

    // ✅ Admin approval status
    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending",
    },
  },
  { timestamps: true } // auto createdAt & updatedAt
);

module.exports = mongoose.model("Donor", donorSchema);
