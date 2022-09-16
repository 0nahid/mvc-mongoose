import colors from "colors";
import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI || "";
const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Database connection is successful 🛢`, colors.green);
  } catch (error) {
    console.log(`Database connection error: ${error}`);
  }
};
export default dbConnect;
