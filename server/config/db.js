import mongoose from 'mongoose';

const connectDB = async () => {
  const connectWithRetry = async () => {
    try {
      console.log('Attempting to connect to MongoDB...');
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4
      });
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    }
  };
  await connectWithRetry();
};

export default connectDB; 