import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Room from "@/models/room";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await dbConnect();

    const room = await Room.findById(id).populate(
      "userId",
      "username email mobilenumber"
    );

    if (!room) {
      return NextResponse.json(
        { success: false, message: "Room not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, room }, { status: 200 });
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch room" },
      { status: 500 }
    );
  }
}
