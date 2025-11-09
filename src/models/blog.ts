import mongoose, { Document, Schema } from "mongoose";
export interface IBlog extends Document {
  _id: string;
  title: string;
  slug: string;
  content: string;
  writerName: string;
  createdAt: Date;
  updatedAt: Date;
  coverImage?: string;
}

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
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
