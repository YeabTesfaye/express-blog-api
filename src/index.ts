import dotenv from "dotenv";
dotenv.config();
import express, {
  Express,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "./routes/api";
import {connectDB} from "./config/db";

connectDB();
console.log(process.env.DATABASE_URL)
const port = process.env.PORT || 3000;

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to your Express App API" });
});

app.use("/api/v1/", apiRouter);

/* Error handler middleware */
app.use(((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
}) as ErrorRequestHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
