import colors from "colors";
import mongoose from "mongoose";
const MONGODB_CONNECTION = process.env.MONGO_URI || "";
const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_CONNECTION);
    console.log(colors.cyan.bold.italic(`Database connection is successful 🛢`));
  } catch (error) {
    console.log(colors.red.italic(`Database connection failed 🛢`));
  }
};
export default dbConnect;
