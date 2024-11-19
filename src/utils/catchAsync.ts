import { Request, Response, NextFunction } from "express";
import logger from "../configs/logger";

type AsyncHanlder = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const catchAsync =
  (fn: AsyncHanlder) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    logger.error("An error occurred in an async handler");
  };

export default catchAsync;
