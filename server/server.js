import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Import routes
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projects.js';
import contactRoute from './routes/contact.js';
import skillRoutes from './routes/skills.js';
import journeyRoutes from './routes/journeys.js';
import resumeRoutes from './routes/resume.js';
import { authenticateToken } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'PORT', 'ADMIN_USERNAME', 'ADMIN_PASSWORD', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  process.exit(1);
}

const app = express();

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [process.env.CLIENT_URL, 'https://briewubet.onrender.com/'] // Add your production URLs
  : ['http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Origin ${origin} not allowed by CORS`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Create uploads directories if they don't exist
const uploadsDir = path.join(__dirname, 'uploads');
const projectsDir = path.join(uploadsDir, 'projects');
const resumesDir = path.join(uploadsDir, 'resumes');

// Ensure directories exist
[uploadsDir, projectsDir, resumesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    } catch (error) {
      console.error(`Error creating directory ${dir}:`, error);
    }
  }
});

// Serve static files with proper MIME types
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.pdf')) {
      res.set('Content-Type', 'application/pdf');
    }
  }
}));

// Serve static files from the client build directory
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
console.log('Client build path:', clientBuildPath);

// Check if dist directory exists
if (!fs.existsSync(clientBuildPath)) {
  console.error('Client build directory not found at:', clientBuildPath);
  console.log('Current directory:', __dirname);
  console.log('Parent directory contents:', fs.readdirSync(path.join(__dirname, '..')));
  console.log('Client directory contents:', fs.readdirSync(path.join(__dirname, '..', 'client')));
}

// Serve static files
app.use(express.static(clientBuildPath, {
  setHeaders: (res, path) => {
    // Set proper MIME types
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html');
    } else if (path.endsWith('.ico')) {
      res.setHeader('Content-Type', 'image/x-icon');
    }
  }
}));

// Handle React routing, return all requests to React app
app.get('*', (req, res, next) => {
  const indexPath = path.join(clientBuildPath, 'index.html');
  console.log('Attempting to serve:', req.path);
  console.log('Looking for index.html at:', indexPath);
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error('index.html not found at:', indexPath);
    console.log('Available files in dist:', fs.readdirSync(clientBuildPath));
    res.status(500).json({
      error: 'Client build is missing',
      details: 'index.html not found',
      path: indexPath,
      availableFiles: fs.existsSync(clientBuildPath) ? fs.readdirSync(clientBuildPath) : 'dist directory not found'
    });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: {
      hasAdminUsername: !!process.env.ADMIN_USERNAME,
      hasAdminPassword: !!process.env.ADMIN_PASSWORD,
      hasJwtSecret: !!process.env.JWT_SECRET,
      nodeEnv: process.env.NODE_ENV
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoute);
app.use('/api/skills', skillRoutes);
app.use('/api/journeys', journeyRoutes);
app.use('/api/resume', resumeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    env: {
      hasAdminUsername: !!process.env.ADMIN_USERNAME,
      hasAdminPassword: !!process.env.ADMIN_PASSWORD,
      hasJwtSecret: !!process.env.JWT_SECRET,
      nodeEnv: process.env.NODE_ENV
    }
  });
  
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong!',
    details: process.env.NODE_ENV === 'development' ? err : undefined,
    path: req.path,
    method: req.method
  });
});

// MongoDB connection with retry logic
const connectWithRetry = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });
    console.log('Connected to MongoDB successfully');
    
    // Protected admin route
    app.get('/api/admin/dashboard', authenticateToken, (req, res) => {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
      }
      res.send('Welcome to the admin dashboard.');
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log('Environment check:', {
        nodeEnv: process.env.NODE_ENV,
        hasAdminUsername: !!process.env.ADMIN_USERNAME,
        hasAdminPassword: !!process.env.ADMIN_PASSWORD,
        hasJwtSecret: !!process.env.JWT_SECRET,
        mongoUri: process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//****:****@') // Hide credentials
      });
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});

// Start the server
connectWithRetry();
