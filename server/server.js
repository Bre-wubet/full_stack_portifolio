import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authenticateAdmin from './middleware/auth.js';
import mongoose from 'mongoose';
import projectRoutes from './routes/projects.js';
import contactRoute from './routes/contact.js';
import skillRoutes from './routes/skills.js';
import journeyRoutes from './routes/journeys.js';


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both ports
  credentials: true,
}));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    body: req.body,
    headers: req.headers
  });
  next();
});

// Serve static files from public directory
app.use('/uploads', express.static('public/uploads'));

// MongoDB connection

mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


  app.use('/api/contact', contactRoute);

  // API routes
  app.use('/api/projects', projectRoutes);
  app.use('/api/skills', skillRoutes);
  app.use('/api/journeys', journeyRoutes);

// Public route
app.get('/', (req, res) => {
  res.send('Welcome to my portfolio!');
});

// Admin login route
app.post('/api/admin/login', (req, res) => {
  try {
    console.log('Login attempt:', {
      receivedUsername: req.body.username,
      receivedPassword: req.body.password ? '****' : undefined,
      envUsername: process.env.ADMIN_USERNAME,
      envPassword: process.env.ADMIN_PASSWORD ? '****' : undefined,
      hasJwtSecret: !!process.env.JWT_SECRET
    });

    const { username, password } = req.body;
    
    // Check if environment variables are set
    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
      console.error('Missing environment variables:', {
        hasAdminUsername: !!process.env.ADMIN_USERNAME,
        hasAdminPassword: !!process.env.ADMIN_PASSWORD,
        hasJwtSecret: !!process.env.JWT_SECRET
      });
      return res.status(500).json({ message: 'Server configuration error' });
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
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Protected admin route
app.get('/api/admin/dashboard', authenticateAdmin, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  res.send('Welcome to the admin dashboard.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment check:', {
    hasAdminUsername: !!process.env.ADMIN_USERNAME,
    hasAdminPassword: !!process.env.ADMIN_PASSWORD,
    hasJwtSecret: !!process.env.JWT_SECRET,
    hasMongoUri: !!process.env.MONGODB_URI
  });
});
