import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  comment: string;
    username: string;
    createdAt: Date;
}


export interface IBlog extends Document {
  _id: string;
  title: string;
  slug: string;
  content: string;
  writerName: string;
  createdAt: Date;
  updatedAt: Date;
  coverImage?: string;
  comments: IComment[];
}

const commentSchema: Schema = new Schema(
  {
    comment: { type: String, required: true },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    slug: { type: String, required: true, unique: true },
    writerName: {
      type: String,
      default: "Team of StayNest",
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
