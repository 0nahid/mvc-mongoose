import "dotenv/config";
import { app } from "./app";
import dbConnect from "./utils/dbConnect";
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
export { app };
