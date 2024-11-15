import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";

export const verifyUserToken = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.status(401).send({ status: "error", message: "Unauthorized request" });
    return;
  }

  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    res
      .status(401)
      .send({ status: "error", message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ status: "error", message: "Invalid token." });
  }
};
