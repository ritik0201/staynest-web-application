import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Blog from "@/models/blog";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> } 
) {
  try {
    const { slug } = await context.params; 
    await connectDB();

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching blog:", error);
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
