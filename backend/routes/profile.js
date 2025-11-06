const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// GET current user profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST or PUT to create/update profile
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { name, age, gender, bloodGroup, contact, address, type } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.name = name;
    user.age = age;
    user.gender = gender;
    user.bloodGroup = bloodGroup;
    user.contact = contact;
    user.address = address;
    user.type = type;

    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
