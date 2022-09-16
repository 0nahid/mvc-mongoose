import colors from "colors";
import "dotenv/config";
import mongoose from "mongoose";
import { app } from "./app";
import dbConnect from "./utils/dbConnect";

const MONGO_URI = process.env.MONGO_URI || "";

const port: string | number = process.env.PORT || 5000;
const startServer = async (): Promise<void> => {
  try {
    app.listen(port, () => {
     dbConnect();
    });
  } catch (error) {
    console.log(`Server error: ${error}`);
  }
};
startServer();
