import mongoose from 'mongoose';

const journeySchema = new mongoose.Schema({
  Year: { type: Date, required: true },
  title: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Journey', journeySchema);