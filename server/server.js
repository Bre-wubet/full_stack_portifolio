import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Portfolio API',
    endpoints: {
      auth: '/api/auth',
      projects: '/api/projects'
    },
    status: 'healthy'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const startServer = async (initialPort) => {
  const findAvailablePort = async (startPort) => {
    let port = startPort;
    while (port < startPort + 10) { // Try up to 10 ports
      try {
        await new Promise((resolve, reject) => {
          const server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            resolve();
          }).on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
              console.log(`Port ${port} is in use, trying next port...`);
              port++;
              server.close();
              resolve(port);
            } else {
              reject(err);
            }
          });
        });
        return; // If we get here, the server started successfully
      } catch (error) {
        console.error(`Error starting server on port ${port}:`, error);
        port++;
      }
    }
    throw new Error('Could not find an available port after multiple attempts');
  };

  try {
    await findAvailablePort(initialPort);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;
startServer(PORT);