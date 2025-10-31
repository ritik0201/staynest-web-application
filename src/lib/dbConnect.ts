import mongoose from 'mongoose';

console.warn(" MONGODB_URI not defined — skipping DB connection (likely build phase).");
const MONGODB_URI = 'mongodb+srv://ritik123:ritik1234@cluster0.ekoze50.mongodb.net/';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

async function dbConnect(): Promise<typeof mongoose> {
  try {
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