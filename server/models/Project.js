import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000
  },
  techStack: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length > 0 && v.every(tech => typeof tech === 'string' && tech.trim().length > 0);
      },
      message: 'Tech stack must be a non-empty array of strings'
    }
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Accept Cloudinary URLs and general image URLs
        return /^https?:\/\/(res\.cloudinary\.com|.+)\/.+/.test(v);
      },
      message: 'Image must be a valid URL'
    }
  },
  githubUrl: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/github\.com\/.+/.test(v);
      },
      message: 'GitHub URL must be a valid GitHub repository URL'
    }
  },
  liveDemoUrl: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Live demo URL must be a valid URL'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;