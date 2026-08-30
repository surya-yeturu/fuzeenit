import '../config/env.js';
import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      'MONGODB_URI is missing. Add it to server/.env (see server/.env.example).'
    );
  }

  try {
    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
};

export default connectDB;
