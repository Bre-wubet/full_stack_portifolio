import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { authenticateToken } from '../middleware/auth.js';
import Resume from '../models/Resume.js';
import fs from 'fs/promises';
import cors from 'cors';

const router = express.Router();

// Configure CORS
router.use(cors({
  origin: ['http://localhost:5173', 'https://brwubet.onrender.com'],
  credentials: true
}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
fs.mkdir(uploadsDir, { recursive: true }).catch(console.error);

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, 'resume.pdf');
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

// Get resume
router.get('/', async (req, res) => {
  try {
    const resume = await Resume.findOne();
    
    if (!resume) {
      return res.status(404).json({ 
        message: 'No resume found',
        exists: false
      });
    }

    // Check if file exists
    try {
      await fs.access(path.join(uploadsDir, resume.filename));
    } catch (error) {
      console.error('Resume file not found:', error);
      return res.status(404).json({ 
        message: 'Resume file not found',
        exists: false
      });
    }

    // Construct URL based on environment
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://brwubet.onrender.com/api'
      : 'http://localhost:5000/api';

    const resumeUrl = `${baseUrl}/uploads/${resume.filename}`;

    res.json({
      url: resumeUrl,
      filename: resume.filename,
      exists: true
    });
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ 
      message: 'Error fetching resume',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      exists: false
    });
  }
});

// Upload resume
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        message: 'No file uploaded',
        exists: false
      });
    }

    // Delete existing resume if any
    const existingResume = await Resume.findOne();
    if (existingResume) {
      try {
        await fs.unlink(path.join(uploadsDir, existingResume.filename));
        await Resume.deleteOne({ _id: existingResume._id });
      } catch (error) {
        console.error('Error deleting existing resume:', error);
      }
    }

    // Create new resume document
    const resume = new Resume({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size
    });

    await resume.save();

    // Construct URL based on environment
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://brwubet.onrender.com/api'
      : 'http://localhost:5000/api';

    const resumeUrl = `${baseUrl}/uploads/${resume.filename}`;

    res.status(201).json({
      message: 'Resume uploaded successfully',
      url: resumeUrl,
      filename: resume.filename,
      exists: true
    });
  } catch (error) {
    console.error('Error uploading resume:', error);
    res.status(500).json({ 
      message: 'Error uploading resume',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      exists: false
    });
  }
});

// Delete resume
router.delete('/', async (req, res) => {
  try {
    const resume = await Resume.findOne();
    
    if (!resume) {
      return res.status(404).json({ 
        message: 'No resume found',
        exists: false
      });
    }

    // Delete file
    try {
      await fs.unlink(path.join(uploadsDir, resume.filename));
    } catch (error) {
      console.error('Error deleting resume file:', error);
    }

    // Delete from database
    await Resume.deleteOne({ _id: resume._id });

    res.json({ 
      message: 'Resume deleted successfully',
      exists: false
    });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ 
      message: 'Error deleting resume',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      exists: false
    });
  }
});

export default router;