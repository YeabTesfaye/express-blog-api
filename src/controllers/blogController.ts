import { Request, Response } from "express";
import { BlogService } from "../services/blogService";
import { validationResult } from "express-validator";
import { Serializer } from "../serializers/serializers";
import Blog from "../models/blog";
import catchAsync from "../utils/catchAsync";

interface userRequest extends Request {
  user?: any;
}

export const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const startIndex = (page - 1) * limit;
    const total = await Blog.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(total / limit);

    const blogs = await BlogService.getAllBlogs(startIndex, limit);
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
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

export const createBlog = catchAsync(
  async (req: userRequest, res: Response) => {
    const errors = validationResult(req);
    // if there is error then return Error
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }
    req.body.author = req.user._id;

    const blog = await BlogService.createBlog(req.body);
    res.json({
      status: "success",
      message: "blog created successfully.",
      data: Serializer.blogSerializer(blog),
    });
  }
);

export const getBlogById = catchAsync(async (req: Request, res: Response) => {
  const blog = await BlogService.getBlogById(req.params.id);
  res.json({ status: "success", data: Serializer.blogSerializer(blog) });
});

export const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const blog = await BlogService.updateBlog(req.params.id, req.body);
  res.json({
    status: "success",
    message: "blog updated successfully.",
    data: Serializer.blogSerializer(blog),
  });
});

export const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const blog = await BlogService.deleteBlog(req.params.id);
  res.sendStatus(204);
});
