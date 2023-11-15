import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? "");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error to connencting to MongoDB :", err);
  }
};
