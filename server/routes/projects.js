
import express from 'express';
const router = express.Router();
import Project from '../models/Project.js';
import authenticateAdmin from '../middleware/auth.js';


// Create a new project (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.title) {
      return res.status(400).json({ message: 'Project title is required' });
    }

    // Create project with validated data
    const projectData = {
      title: req.body.title,
      description: req.body.description || '',
      imageUrl: req.body.imageUrl || '',
      githubLink: req.body.githubLink || '',
      liveDemo: req.body.liveDemo || '',
      tags: req.body.tags || []
    };

    const project = new Project(projectData);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }
    res.status(400).json({ message: err.message });
  }
});

// Update a project (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a project (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

