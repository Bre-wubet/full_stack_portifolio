import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { authenticateToken } from '../middleware/auth.js';
import Resume from '../models/Resume.js';
import fs from 'fs';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/resumes');
    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create a unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `resume-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept only PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get current resume
router.get('/', async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ uploadDate: -1 });
    if (!resume) {
      return res.status(404).json({ message: 'No resume found' });
    }
    
    // Ensure the URL is absolute
    const absoluteUrl = `${req.protocol}://${req.get('host')}${resume.url}`;
    const resumeData = {
      ...resume.toObject(),
      url: absoluteUrl
    };
    
    res.json(resumeData);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ 
      message: 'Error fetching resume',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Upload new resume (admin only)
router.post('/', authenticateToken, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Delete old resume if exists
    await Resume.deleteMany({});

    // Create new resume entry with absolute URL
    const resume = new Resume({
      filename: req.file.filename,
      path: req.file.path,
      url: `/uploads/resumes/${req.file.filename}`,
      updatedAt: new Date()
    });

    await resume.save();
    
    // Return resume with absolute URL
    const absoluteUrl = `${req.protocol}://${req.get('host')}${resume.url}`;
    const resumeData = {
      ...resume.toObject(),
      url: absoluteUrl
    };
    
    res.status(201).json(resumeData);
  } catch (error) {
    console.error('Error uploading resume:', error);
    res.status(500).json({ 
      message: 'Error uploading resume',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Delete current resume (admin only)
router.delete('/', authenticateToken, async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ uploadDate: -1 });
    if (!resume) {
      return res.status(404).json({ message: 'No resume found' });
    }

    await Resume.deleteMany({});
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ message: 'Error deleting resume' });
  }
});

export default router; 