import express from 'express';
const router = express.Router();
import Journey from '../models/Journey.js';
import authenticateAdmin from '../middleware/auth.js';

// Get all journeys
router.get('/', async (req, res) => {
  try {
    const journeys = await Journey.find().sort('-startDate');
    res.json(journeys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new journey (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const {
      year,
      title,
      description
    } = req.body;

    if (!year || !title || !description) {
      return res.status(400).json({
        message: 'Title, Year, description are required'
      });
    }

    const journey = new Journey({
        year,
        title,
        description
    });

    const newJourney = await journey.save();
    res.status(201).json(newJourney);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a journey (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const journey = await Journey.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!journey) return res.status(404).json({ message: 'Journey not found' });
    res.json(journey);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a journey (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const journey = await Journey.findByIdAndDelete(req.params.id);
    if (!journey) return res.status(404).json({ message: 'Journey not found' });
    res.json({ message: 'Journey deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;