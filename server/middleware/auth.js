import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication token required' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};

export const adminOnly = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      throw new Error('Admin access required');
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Access denied' });
  }
};