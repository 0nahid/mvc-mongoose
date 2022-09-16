import colors from "colors";
import "dotenv/config";
import mongoose from "mongoose";
import { app } from "./app";

const MONGO_URI = process.env.MONGO_URI || "";

const port: string | number = process.env.PORT || 5000;
const startServer = async (): Promise<void> => {
  try {
    app.listen(port, () => {
      mongoose.connect(MONGO_URI).then(() => {
        console.log(`Database connection is successful 🛢`, colors.red.bold);
      });
    });
  } catch (error) {
    console.log(`Server error: ${error}`);
  }
};
startServer();
