import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Room from "@/models/room";

export async function GET(req: NextRequest, context: { params: Promise<{ ownerId: string }> }) {
  try {
    const { ownerId } = await context.params; // ✅ await params
    await dbConnect();

    const rooms = await Room.find({ userId: ownerId }).sort({ createdAt: -1 });

    if (!rooms || rooms.length === 0) {
      return NextResponse.json(
        { success: false, message: "Rooms not found for this owner" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, rooms });
  } catch (error) {
    console.error("Error fetching owner's rooms:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
