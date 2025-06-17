import express from 'express';
const router = express.Router();
import Journey from '../models/Journey.js';
import { authenticateToken } from '../middleware/auth.js';

// Get all journeys
router.get('/', async (req, res) => {
  try {
    const journeys = await Journey.find().sort('-date');
    res.json(journeys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new journey (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      type
    } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({
        message: 'Title, description, and date are required'
      });
    }

    const journey = new Journey({
      title,
      description,
      date: new Date(date),
      type: type || 'education'
    });

    const newJourney = await journey.save();
    res.status(201).json(newJourney);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a journey (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }
    
    const journey = await Journey.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!journey) return res.status(404).json({ message: 'Journey not found' });
    res.json(journey);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a journey (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const journey = await Journey.findByIdAndDelete(req.params.id);
    if (!journey) return res.status(404).json({ message: 'Journey not found' });
    res.json({ message: 'Journey deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;