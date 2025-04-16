import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Admin registration (should be used only once to create admin account)
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      email,
      password,
      role: 'admin'
    });

    await user.save();
    const token = user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = user.generateAuthToken();
    res.json({ 
      user: { 
        _id: user._id,
        email: user.email,
        role: user.role 
      }, 
      token 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Verify token and get current user
router.get('/me', auth, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;