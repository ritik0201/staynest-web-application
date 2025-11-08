import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Blog from "@/models/blog";

// POST — create a new blog
export async function POST(req: Request) {
  try {
    await connectDB(); // connect to MongoDB
    const { title, content, coverImage, slug: incomingSlug } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ message: "Title and content are required" }, { status: 400 });
    }

    // Use the incoming slug, or generate one from the title if it's not provided
    const slug =
      incomingSlug ||
      title
        .toLowerCase()
        .trim()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json({ message: "Blog with this title already exists" }, { status: 400 });
    }

    // Create new blog document
    const newBlog = await Blog.create({
      title,
      slug,
      coverImage,
      content,
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating blog:", error);
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

// GET — fetch all blogs
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching blogs:", error);
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
