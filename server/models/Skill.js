import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { 
    type: Number, 
    required: true,
    min: 0,
    max: 100
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Skill', skillSchema);