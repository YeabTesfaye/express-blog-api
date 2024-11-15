import express, { Request, Response } from "express";
import userRouter from "./userRoutes";

const apiRouter = express.Router();

apiRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to your Express App API." });
});

apiRouter.use("/user", userRouter);

export default apiRouter;