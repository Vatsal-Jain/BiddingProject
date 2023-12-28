import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/BidProject`
    );
    console.log(`
      Mongo DB Connected ! DB host: ${connectionInstance.connection.host}
      `);
  } catch (error) {
    console.log("MongoDB connection failed error is", error);
    process.exit(1);
  }
};

export default connectDB;
