import { Request, Response } from "express";
import { BlogService } from "../services/blogService";
import { validationResult } from "express-validator";
import { Serializer } from "../serializers/serializers";
import Blog from "../models/blog";
import catchAsync from "../utils/catchAsync";
import logger from "../configs/logger";

interface userRequest extends Request {
  user?: any;
}

export const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const startIndex = (page - 1) * limit;
  const total = await Blog.countDocuments();

  // Calculate the total number of pages
  const totalPages = Math.ceil(total / limit);

  const blogs = await BlogService.getAllBlogs(startIndex, limit);
  logger.info("Blogs fetched successfully!");
  res.json({
    status: "success",
    data: Serializer.blogsSerializer(blogs),
    pagination: {
      total,
      totalPages,
      currentPage: page,
      limit,
    },
  });
});

export const createBlog = catchAsync(
  async (req: userRequest, res: Response) => {
    const errors = validationResult(req);
    // if there is error then return Error
    if (!errors.isEmpty()) {
      logger.warn("Blog creation validation failed");
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }
    req.body.author = req.user._id;

    const blog = await BlogService.createBlog(req.body);
    logger.info("Creating a new blog");
    res.json({
      status: "success",
      message: "blog created successfully.",
      data: Serializer.blogSerializer(blog),
    });
  }
);

export const getBlogById = catchAsync(async (req: Request, res: Response) => {
  const blog = await BlogService.getBlogById(req.params.id);
  if (!blog) {
    logger.warn("Blog not found");
    res.status(404).json({
      status: "error",
      message: "Blog not found",
    });
    return;
  }
  logger.info("Blog fetched successfully");
  res.json({ status: "success", data: Serializer.blogSerializer(blog) });
});

export const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const blog = await BlogService.updateBlog(req.params.id, req.body);
  logger.info("Blog updated successfully");
  res.json({
    status: "success",
    message: "blog updated successfully.",
    data: Serializer.blogSerializer(blog),
  });
});

export const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  await BlogService.deleteBlog(req.params.id);
  logger.info("Deleting blog");
  res.sendStatus(204);
});
