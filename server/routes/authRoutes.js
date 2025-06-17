import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Admin login route
router.post('/login', (req, res) => {
  try {
    console.log('Login request received:', {
      body: req.body,
      headers: req.headers,
      env: {
        hasAdminUsername: !!process.env.ADMIN_USERNAME,
        hasAdminPassword: !!process.env.ADMIN_PASSWORD,
        hasJwtSecret: !!process.env.JWT_SECRET,
        nodeEnv: process.env.NODE_ENV
      }
    });

    const { username, password } = req.body;
    
    // Check if environment variables are set
    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
      const missingVars = [];
      if (!process.env.ADMIN_USERNAME) missingVars.push('ADMIN_USERNAME');
      if (!process.env.ADMIN_PASSWORD) missingVars.push('ADMIN_PASSWORD');
      if (!process.env.JWT_SECRET) missingVars.push('JWT_SECRET');
      
      console.error('Missing environment variables:', missingVars);
      return res.status(500).json({ 
        message: 'Server configuration error',
        details: `Missing required environment variables: ${missingVars.join(', ')}`
      });
    }

    // Validate request body
    if (!username || !password) {
      console.log('Missing username or password in request');
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check credentials
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      console.log('Login successful for user:', username);
      const token = jwt.sign(
        { username, role: 'admin' }, 
        process.env.JWT_SECRET, 
        { expiresIn: '2h' }
      );
      return res.json({ token });
    }

    // Invalid credentials
    console.log('Invalid credentials for user:', username);
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', {
      message: error.message,
      stack: error.stack,
      env: {
        hasAdminUsername: !!process.env.ADMIN_USERNAME,
        hasAdminPassword: !!process.env.ADMIN_PASSWORD,
        hasJwtSecret: !!process.env.JWT_SECRET,
        nodeEnv: process.env.NODE_ENV
      }
    });
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Verify token route
router.get('/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

export default router; 