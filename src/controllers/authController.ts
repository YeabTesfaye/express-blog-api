import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { userService } from "../services/userService";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Serializer } from "../serializers/serializers";
import catchAsync from "../utils/catchAsync";
import logger from "../configs/logger";

interface profileRequest extends Request {
  user?: any;
}

export const AuthController = {
  /* register/create new user */
  registerUser: catchAsync(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    // if there is error then return Error
    if (!errors.isEmpty()) {
      logger.warn("Validation failed during user registration", {
        errors: errors.array(),
      });

      res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
      return;
    }
    const user = req.body;
    if (!user.email || !user.password) {
      logger.warn("Email or password missing during user registration");
      res.status(400).send({
        status: "error",
        message: "Username and password are required.",
      });
      return;
    }
    const reg_user = await userService.createUser({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    logger.info(`User registered successfully: ${reg_user.email}`);
    res.json({
      status: "success",
      message: "user created successfuly",
      data: Serializer.userSerializer(reg_user),
    });
  }),

  /* user login */
  loginUser: catchAsync(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    // if there is error then return Error
    if (!errors.isEmpty()) {
      logger.warn("Validation failed during login", { errors: errors.array() });
      res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
      return;
    }

    /* check user is exist with our system */
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      logger.warn(
        `Login failed: No account found for email: ${req.body.email}`
      );

      res.status(400).send({
        status: "error",
        message: "No account is associated with the given email",
      });
      return;
    }

    /* compare password */
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      logger.warn(
        `Login failed: Incorrect password for email: ${req.body.email}`
      );
      res.status(400).send({ status: "error", message: "Auth Failed!" });
      return;
    }
    //create token
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );
    logger.info(`User logged in successfully: ${user.email}`);

    res.json({
      status: "success",
      data: { token, user: Serializer.userSerializer(user) },
    });
  }),

  /* get user profile */
  getUser: catchAsync(async (req: profileRequest, res: Response) => {
    const user = await User.findOne({
      email: req.user.email,
    });
    if (!user) {
      logger.warn(`User profile not found for email: ${req.user.email}`);
      return;
    }
    logger.info(`User profile fetched successfully: ${user.email}`);

    res.json({
      status: "success",
      data: Serializer.userSerializer(user),
    });
  }),
};
