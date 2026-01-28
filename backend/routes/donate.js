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

// GET all donors (for admin dashboard)
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error });
  }
});

// GET accepted donors by blood group (for users)
router.get("/accepted/:bloodGroup", async (req, res) => {
  try {
    const { bloodGroup } = req.params;
    const donors = await Donor.find({ bloodGroup, status: "accepted" }).sort({ createdAt: -1 });
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error });
  }
});


// ✅ Accept donor
router.put("/:id/accept", async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });

    donor.status = "accepted";
    await donor.save();

    res.status(200).json({ message: "Donor accepted" });
  } catch (error) {
    res.status(500).json({ message: "Error accepting donor", error });
  }
});

// ✅ Delete donor
router.delete("/:id", async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });

    res.status(200).json({ message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting donor", error });
  }
});

module.exports = router;
