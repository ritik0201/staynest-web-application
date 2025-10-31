import dbConnect from "@/lib/dbConnect";
import Room from "@/models/room";
import Review from "@/models/review"; 
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  Review.findOne(); // Ensure Review model is registered

  try {
    const { id } = await context.params;

    const room = await Room.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "userId",
          model: "User",
          select: "username email", // only required fields
        },
      })
      .populate("userId", "username email mobilenumber"); // Room owner details

    if (!room) {
      return NextResponse.json(
        { success: false, message: "Room not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, room });
  } catch (error) {
    console.error("Failed to fetch room:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch room" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const { id } = await context.params;
    const { isAvailable } = await request.json();

    if (typeof isAvailable !== "boolean") {
      return NextResponse.json(
        { success: false, message: "Invalid 'isAvailable' status provided." },
        { status: 400 }
      );
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { isAvailable },
      { new: true, runValidators: true }
    );

    if (!updatedRoom) {
      return NextResponse.json(
        { success: false, message: "Room not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, room: updatedRoom });
  } catch (error) {
    console.error("Failed to update room status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update room status" },
      { status: 500 }
    );
  }
}
