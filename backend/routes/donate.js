const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");

// POST donor details
router.post("/", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json({ message: "Donor details submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving donor details", error });
  }
});

// GET donors by blood group
router.get("/:bloodGroup", async (req, res) => {
  try {
    const { bloodGroup } = req.params;
    // Only select name and mobile number
    const donors = await Donor.find({ bloodGroup }).select("fullName mobileNumber -_id");
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error });
  }
});

module.exports = router;
