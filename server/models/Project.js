import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: String,
  publicId: String,
  githubLink: String,
  liveDemo: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Project', projectSchema);
