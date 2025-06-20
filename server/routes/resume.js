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
      return res.status(404).json({ 
        message: 'No resume found',
        exists: false
      });
    }

    // Always build the file path
    const filePath = path.join(__dirname, '../uploads/resumes', resume.filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: 'Resume file not found',
        exists: false
      });
    }

    // Build the URL
    let absoluteUrl;
    if (process.env.NODE_ENV === 'production') {
      absoluteUrl = `https://brwubet.onrender.com/uploads/resumes/${resume.filename}`;
    } else {
      absoluteUrl = `/uploads/resumes/${resume.filename}`;
    }

    res.json({
      filename: resume.filename,
      url: absoluteUrl,
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

// Upload new resume (admin only)
router.post('/', authenticateToken, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        message: 'No file uploaded',
        exists: false
      });
    }

    // Delete old resume if exists
    const oldResume = await Resume.findOne().sort({ uploadDate: -1 });
    if (oldResume) {
      const oldFilePath = path.join(__dirname, '../uploads/resumes', oldResume.filename);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      await Resume.deleteMany({});
    }

    // Create new resume entry with only the filename
    const resume = new Resume({
      filename: req.file.filename,
      updatedAt: new Date()
    });

    await resume.save();
    
    // Build the URL
    let absoluteUrl;
    if (process.env.NODE_ENV === 'production') {
      absoluteUrl = `https://brwubet.onrender.com/uploads/resumes/${resume.filename}`;
    } else {
      absoluteUrl = `/uploads/resumes/${resume.filename}`;
    }

    res.status(201).json({
      filename: resume.filename,
      url: absoluteUrl,
      exists: true
    });
  } catch (error) {
    console.error('Error uploading resume:', error);
    // Clean up the uploaded file if there was an error
    if (req.file) {
      const filePath = path.join(__dirname, '../uploads/resumes', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.status(500).json({ 
      message: 'Error uploading resume',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      exists: false
    });
  }
});

// Delete current resume (admin only)
router.delete('/', authenticateToken, async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ uploadDate: -1 });
    if (!resume) {
      return res.status(404).json({ 
        message: 'No resume found',
        exists: false
      });
    }

    // Delete the file from the filesystem
    const filePath = path.join(__dirname, '../uploads/resumes', resume.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Resume.deleteMany({});
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