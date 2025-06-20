import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Import modules
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projects.js';
import contactRoute from './routes/contact.js';
import skillRoutes from './routes/skills.js';
import journeyRoutes from './routes/journeys.js';
import resumeRoutes from './routes/resume.js';

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

// Initialize Express app
const app = express();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173', // Vite development server
  'http://localhost:5000',
  'http://localhost:3000',
  'https://brwubet.onrender.com',
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'));
    }
  },
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Create upload directories
const uploadsDir = path.join(__dirname, 'uploads');
['projects', 'resumes'].forEach(subDir => {
  const dirPath = path.join(uploadsDir, subDir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
});

// Serve static assets
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoute);
app.use('/api/skills', skillRoutes);
app.use('/api/journeys', journeyRoutes);
app.use('/api/resume', resumeRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Warn if no resumes exist at startup
const resumesDir = path.join(uploadsDir, 'resumes');
try {
  const resumeFiles = fs.readdirSync(resumesDir).filter(f => f.endsWith('.pdf'));
  if (resumeFiles.length === 0) {
    console.warn('No resume PDFs found in uploads/resumes. If you are in production, upload a resume using the admin panel.');
  } else {
    console.log(`Found ${resumeFiles.length} resume(s) in uploads/resumes.`);
  }
} catch (err) {
  console.warn('Could not read uploads/resumes directory:', err.message);
}

// Serve frontend
const clientBuildPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientBuildPath)) {
  console.log('Serving client build from:', clientBuildPath);
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(clientBuildPath, 'index.html'));
  });
} else {
  console.warn('Client build directory not found at:', clientBuildPath);
  app.get('/', (req, res) => {
    res.send('Server is running. Client build not found.');
  });
}

// Error Handling Middleware
app.use(errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start Server
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Environment:', {
        nodeEnv: process.env.NODE_ENV,
        adminUser: !!process.env.ADMIN_USERNAME,
    });
  });
};

startServer();
