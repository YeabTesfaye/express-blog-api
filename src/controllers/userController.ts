import { userService } from "../services/userService";
import { Request, Response } from "express";
import { Serializer } from "../serializers/serializers";
import catchAsync from "../utils/catchAsync";
import logger from "../configs/logger";

export const UserController = {
  getAllUsers: catchAsync(async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    logger.info("Fetched all users successfully");
    res.json({ status: "success", data: Serializer.usersSerializer(users) });
  }),

  createUser: catchAsync(async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    logger.info("User created successfully");
    res.json({ status: "success", data: user });
  }),

  getUserById: catchAsync(async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      logger.warn("User not found");
    }
    res.json({ status: "success", data: user });
  }),

  updateUser: catchAsync(async (req: Request, res: Response) => {
    const user = await userService.updateUser(req.params.id, req.body);
    logger.info("User fetched successfully");

    res.json({ status: "success", data: user });
  }),

  deleteUser: catchAsync(async (req: Request, res: Response) => {
    const user = await userService.deleteUser(req.params.id);
    logger.info("User deleted successfully");
    res.json({ status: "success", data: user });
  }),
};
