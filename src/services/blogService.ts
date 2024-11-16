import Blog from "../models/blog";

export const BlogService = {
  getAllBlogs: async (startIndex: number, limit: number) => {
    return await Blog.find().skip(startIndex).limit(limit);
  },

  createBlog: async (blog: any) => {
    return await Blog.create(blog);
  },
  getBlogById: async (id: any) => {
    return await Blog.findById(id);
  },

  updateBlog: async (id: any, blog: any) => {
    return await Blog.findByIdAndUpdate(id, blog);
  },

  deleteBlog: async (id: any) => {
    return await Blog.findByIdAndDelete(id);
  },
};
