import mongoose from 'mongoose';

const journeySchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Journey', journeySchema);