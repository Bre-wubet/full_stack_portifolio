import mongoose from 'mongoose';

const connectDB = async () => {
  const connectWithRetry = async () => {
    try {
      console.log('Attempting to connect to MongoDB...');
      console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Present' : 'Missing');
      
      if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is not set');
      }
      
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4
      });
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      console.error('Full error:', error);
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    }
  };
  await connectWithRetry();
};

export default connectDB; 