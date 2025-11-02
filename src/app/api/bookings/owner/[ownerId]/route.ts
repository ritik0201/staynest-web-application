import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/booking";
import Room from "@/models/room";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ ownerId: string }> }
) {
  try {
    const { ownerId } = await context.params;
    await dbConnect();

    // Find all rooms owned by the user
    const ownerRooms = await Room.find({ userId: ownerId }).select('_id');
    const ownerRoomIds = ownerRooms.map(room => room._id);

    // Find all bookings for those rooms
    const bookings = await Booking.find({ roomId: { $in: ownerRoomIds } })
      .populate('userId', 'username email') // User who booked
      .populate('roomId', 'nearByCentre') // Room details
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, bookings });

  } catch (error) {
    console.error("Error fetching owner's bookings:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}