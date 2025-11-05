import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { z } from "zod";

const orderSchema = z.object({
  amount: z.number().positive(),
  bookingId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = orderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, message: "Invalid request body", errors: validation.error.issues }, { status: 400 });
    }

    const { amount, bookingId } = validation.data;

    const razorpay = new Razorpay({
      key_id: process.env.RP_KEY_ID!,
      key_secret: process.env.RP_KEY_SECRET!,
    });

    // --- THIS IS THE FIX ---
    // Convert amount from rupees to paise and ensure it's an integer
    const amountInPaise = Math.round(amount * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_booking_${bookingId}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ success: false, message: "Failed to create Razorpay order" }, { status: 500 });
  }
}