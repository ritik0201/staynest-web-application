import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/blog";
import { getServerSession } from "next-auth/next";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params; // ✅ await the Promise
    await dbConnect();

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching blog:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in to comment." },
        { status: 401 }
      );
    }

    const { slug } = await context.params;
    const { comment } = await req.json();

    if (!comment) {
      return NextResponse.json(
        { message: "Comment text is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const newComment = {
      comment,
      username: session.user.name,
    };

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      { $push: { comments: newComment } },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error("Error adding comment:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
