import mongoose from 'mongoose';

const journeySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['education', 'experience'],
    default: 'education'
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Journey', journeySchema);