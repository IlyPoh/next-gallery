import mongoose from "mongoose";
import { env } from "process";

const connectMongoDB = () => {
  try {
    mongoose.connect(env.MONGODB_URI);
  } catch (error) {
    console.error(error);
  }
};

export default connectMongoDB;
