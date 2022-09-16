import cors from "cors";
import "dotenv/config";
import express, { Application, Request, Response } from "express";
import path from "path";
const app: Application = express();

/* middleware  */
app.use(cors());
app.use(express.json());

/* here will be all the imports routes */
import testRoute from "./routes/v1/test";

/* here will be the all the routes */
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

/* Here is the User Routes */
app.use("/api/v1/test", testRoute);

// 404 response
app.all("*", (req: Request, res: Response) => {
  res.status(404).send({
    message: "Not Found",
    status: 404,
  });
});
export { app };
