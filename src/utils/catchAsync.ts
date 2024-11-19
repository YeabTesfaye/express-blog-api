import { Request, Response, NextFunction } from "express";

type AsyncHanlder = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const catchAsync =
  (fn: AsyncHanlder) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export default catchAsync;
