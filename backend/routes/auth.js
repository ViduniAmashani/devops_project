const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (!name || !password || !email) {
      return res.status(400).json({ error: 'Name, password and email are required' });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Default role = 'user' (admin is manually created)
    const user = new User({
      name,
      password: hashed,
      email: email.toLowerCase(),
      role: 'user'
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'User already exists' });
    }
    console.error("Register error:", error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Login user (supports admin too)
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    // Include role in JWT payload
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      role: user.role, // ✅ important for frontend redirect
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
