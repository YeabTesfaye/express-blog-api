import { userService } from "../services/userService";
import { Request, Response } from "express";
import { Serializer } from "../serializers/serializers";
import catchAsync from "../utils/catchAsync";

export const UserController = {
  getAllUsers: catchAsync(async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.json({ status: "success", data: Serializer.usersSerializer(users) });
  }),

  createUser: catchAsync(async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    res.json({ status: "success", data: user });
  }),

  getUserById: catchAsync(async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id);
    res.json({ status: "success", data: user });
  }),

  updateUser: catchAsync(async (req: Request, res: Response) => {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ status: "success", data: user });
  }),

  deleteUser: catchAsync(async (req: Request, res: Response) => {
    const user = await userService.deleteUser(req.params.id);
    res.json({ status: "success", data: user });
  }),
};
