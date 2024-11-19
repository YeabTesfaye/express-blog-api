import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "./src/routes/api";
import envVarSchema from "./src/configs/env.config";
import { connectDB } from "./src/configs/db";

connectDB(envVarSchema.DATABASE_URL);
const port = envVarSchema.PORT;

const app: Express = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to your Express App API" });
});

app.use("/api/v1/", apiRouter);

// 404 Page Not Found handler (Catch-all for unmatched routes)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "404 - Page Not Found" });
});

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
