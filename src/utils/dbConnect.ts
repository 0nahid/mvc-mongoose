import colors from "colors";
import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI || "";
const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(colors.cyan.italic(`Database connection is successful 🛢`));
  } catch (error) {
    console.log(colors.red.italic(`Database connection failed 🛢`));
  }
};
export default dbConnect;
