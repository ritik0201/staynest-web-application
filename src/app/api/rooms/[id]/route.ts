import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Room from "@/models/room";
import mongoose from "mongoose";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  // Await the params before using them
  const { id } = await context.params;

  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid room ID format" },
      { status: 400 }
    );
  }

  try {
    const room = await Room.findById(id);
    if (!room) {
      return NextResponse.json(
        { success: false, message: "Room not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, room });
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch room" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  // Await the params before using them
  const { id } = await context.params;
  const body = await req.json();

  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid room ID format" },
      { status: 400 }
    );
  }

  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, body, { new: true });
    if (!updatedRoom) {
      return NextResponse.json(
        { success: false, message: "Room not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, room: updatedRoom });
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update room" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  // Await the params before using them
  const { id } = await context.params;

  await dbConnect();

  try {
    await Room.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json({ success: false, message: "Failed to delete room" }, { status: 500 });
  }
}