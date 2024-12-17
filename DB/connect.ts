import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DATABASE_URL!);
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectMongo;
