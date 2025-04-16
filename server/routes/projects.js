import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { auth, adminOnly } from '../middleware/auth.js';
import Project from '../models/Project.js';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer for image upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new project (admin only)
router.post('/', auth, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { title, description, techStack, githubUrl, liveDemoUrl, status, category } = req.body;

    // Validate required fields
    if (!title || !description || !techStack || !githubUrl || !liveDemoUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // // Validate status and category if provided
    // if (status && !['in-progress', 'completed', 'archived'].includes(status)) {
    //   return res.status(400).json({ message: 'Invalid status value' });
    // }
    // if (category && !['web', 'mobile', 'desktop', 'other'].includes(category)) {
    //   return res.status(400).json({ message: 'Invalid category value' });
    // }

    // Ensure techStack is an array of strings
    const techStackArray = Array.isArray(techStack) ? techStack : techStack.split(',').map(tech => tech.trim()).filter(Boolean);
    if (!techStackArray.length) {
      return res.status(400).json({ message: 'Tech stack must not be empty' });
    }

    // Upload image to Cloudinary if provided
    let imageUrl = '';
    if (req.file) {
      const buffer = req.file.buffer;
      const base64Image = buffer.toString('base64');
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${base64Image}`,
        { folder: 'portfolio-projects' }
      );
      imageUrl = result.secure_url;
    } else {
      return res.status(400).json({ message: 'Project image is required' });
    }

    const project = new Project({
      title,
      description,
      techStack,
      imageUrl,
      githubUrl,
      liveDemoUrl,
      status,
      category
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update project (admin only)
router.put('/:id', auth, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const updates = req.body;
    
    if (req.file) {
      const buffer = req.file.buffer;
      const base64Image = buffer.toString('base64');
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${base64Image}`,
        { folder: 'portfolio-projects' }
      );
      updates.imageUrl = result.secure_url;
    }

    if (updates.techStack) {
      const techStackArray = Array.isArray(updates.techStack) ? updates.techStack : updates.techStack.split(',').map(tech => tech.trim()).filter(Boolean);
      if (!techStackArray.length) {
        return res.status(400).json({ message: 'Tech stack must not be empty' });
      }
      updates.techStack = techStackArray;
    }

    // Validate status and category if being updated
    if (updates.status && !['in-progress', 'completed', 'archived'].includes(updates.status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    if (updates.category && !['web', 'mobile', 'desktop', 'other'].includes(updates.category)) {
      return res.status(400).json({ message: 'Invalid category value' });
    }

    // Update the updatedAt field
    updates.updatedAt = new Date();

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete project (admin only)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete image from Cloudinary if it exists
    if (project.imageUrl && project.imageUrl.includes('cloudinary')) {
      const publicId = project.imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`portfolio-projects/${publicId}`);
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;