import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Room from "@/models/room";
import Review from "@/models/review"; // Import the Review model to ensure it's registered
import User from "@/models/user"; // Import the User model for nested population
import { getToken } from "next-auth/jwt";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // The import above is usually enough, but this ensures it's used.
    await dbConnect();
    // Explicitly register models to prevent MissingSchemaError in serverless environments.
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    User.modelName;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    Review.modelName;
    const { id } = await context.params;
    const room = await Room.findById(id)
      .populate('userId', 'username email mobilenumber')
      .populate({
        path: 'reviews',
        populate: {
          path: 'userId',
          select: 'username email'
        }
      });

    if (!room) {
      return NextResponse.json({ success: false, message: "Room not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, room });
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch room" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: roomId } = await context.params;
    await dbConnect();
    const body = await req.json();

    const room = await Room.findById(roomId);

    if (!room) {
      return NextResponse.json({ success: false, message: "Room not found" }, { status: 404 });
    }

    // Security check: Ensure the user updating the room is the owner
    if (room.userId.toString() !== token.sub) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { $set: body },
      { new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, message: "Room updated successfully", room: updatedRoom });
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json({ success: false, message: "Failed to update room" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  _context: { params: Promise<{ id: string }> }
) {
    // Similar logic for DELETE can be implemented here, including ownership check
    // For now, returning a placeholder
    return NextResponse.json({ success: true, message: "DELETE method placeholder" });
}