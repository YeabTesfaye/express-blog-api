import { model, Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Blog description required"],
    },
    image: String,
    tags: {
      type: Array,
      required: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = model("Blog", blogSchema);
export default Blog;