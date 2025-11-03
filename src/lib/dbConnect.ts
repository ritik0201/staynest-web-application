import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  console.warn("MONGODB_URI not defined — skipping DB connection (likely build phase).");
  // In a production environment or when a DB is strictly required, you might want to throw an error.
  // throw new Error('Please define the MONGODB_URI environment variable');
}
async function dbConnect(): Promise<typeof mongoose> {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in the environment variables.');
    }
    const connection = await mongoose.connect(MONGODB_URI, {
      dbName: 'studentStayDB',
      bufferCommands: false,
    });
    console.log('MongoDB connected successfully');
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
export default dbConnect;



//d