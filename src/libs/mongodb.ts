import mongoose from 'mongoose';
import { env } from 'process';

const connectMongoDB = () => {
  try {
    mongoose.connect(env.MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
