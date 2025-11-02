import dbConnect from "@/lib/dbConnect";
import Room from "@/models/room";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const query = searchParams.get("query");

    if (!type || !query) {
      return NextResponse.json(
        { success: false, message: "Type and query are required" },
        { status: 400 }
      );
    }

    let suggestions;
    const queryRegex = new RegExp(query, "i");

    if (type === "center") {
      suggestions = await Room.distinct("nearByCentre", {
        nearByCentre: { $regex: queryRegex },
      });
    } else if (type === "city") {
      suggestions = await Room.distinct("address.city", {
        "address.city": { $regex: queryRegex },
      });
    } else {
      return NextResponse.json({ success: false, message: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json({ success: true, suggestions });
  } catch (error: unknown) {
    console.error("Error fetching suggestions:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
