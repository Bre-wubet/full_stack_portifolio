import express from 'express';
const router = express.Router();
import Skill from '../models/Skill.js';
import { authenticateToken } from '../middleware/auth.js';

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort('category');
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new skill (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, level } = req.body;
    
    if (!name || !level ) {
      return res.status(400).json({ message: 'Name, level, and category are required' });
    }

    const skill = new Skill({
      name,
      level,
    });

    const newSkill = await skill.save();
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a skill (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a skill (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;