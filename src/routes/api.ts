import express, { Request, Response } from "express";
import userRouter from "./userRoutes";
import blogRouter from "./blogRoutes";
const apiRouter = express.Router();

apiRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to your Express App API." });
});

apiRouter.use("/user", userRouter);
apiRouter.use("/blogs", blogRouter);


export default apiRouter;
