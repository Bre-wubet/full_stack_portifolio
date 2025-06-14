import express from 'express';
import Project from '../models/Project.js';
import authenticateAdmin from '../middleware/auth.js';
import { upload, cloudinary } from '../config/cloudinary.js';

const router = express.Router();

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: err.message });
  }
});

// Upload project image (admin only)
router.post('/upload', authenticateAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Log the file details for debugging
    console.log('Uploaded file:', {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      filename: req.file.filename
    });

    if (!req.file.path) {
      throw new Error('No file path received from Cloudinary');
    }

    res.json({ 
      imageUrl: req.file.path,
      publicId: req.file.filename
    });
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({ 
      message: 'Error uploading image',
      error: err.message,
      details: err.stack
    });
  }
});

// Add new project (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      imageUrl: req.body.imageUrl || '',
      publicId: req.body.publicId || ''
    });
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error('Error adding project:', err);
    res.status(400).json({ message: err.message });
  }
});

// Update project (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // If there's a new image and an old image exists, delete the old one from Cloudinary
    if (req.body.imageUrl && project.publicId) {
      try {
        await cloudinary.uploader.destroy(project.publicId);
      } catch (err) {
        console.error('Error deleting old image:', err);
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        imageUrl: req.body.imageUrl || project.imageUrl,
        publicId: req.body.publicId || project.publicId
      },
      { new: true }
    );
    res.json(updatedProject);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(400).json({ message: err.message });
  }
});

// Delete project (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete image from Cloudinary if it exists
    if (project.publicId) {
      try {
        await cloudinary.uploader.destroy(project.publicId);
      } catch (err) {
        console.error('Error deleting image:', err);
      }
    }

    await project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ message: err.message });
  }
});

export default router;

