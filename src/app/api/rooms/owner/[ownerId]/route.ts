import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Room from "@/models/room";
import mongoose from "mongoose";

export async function GET(req: Request, context: { params: Promise<{ ownerId: string }> }) {
  try {
    // Await the params before using them
    const { ownerId } = await context.params;

    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return NextResponse.json(
        { success: false, message: "Invalid owner ID format" },
        { status: 400 }
      );
    }

    const rooms = await Room.find({ userId: ownerId }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      rooms: rooms || [],
    });
  } catch (error) {
    console.error("Error fetching owner's rooms:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
