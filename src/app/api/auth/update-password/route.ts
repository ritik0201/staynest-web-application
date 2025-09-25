import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { NewPasswordSchema } from "@/schema/updatePassSchema";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Get logged-in user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();
    try {
      NewPasswordSchema.parse({ newPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { message: "Enter valid stronge password", errors: error.issues },
          { status: 400 }
        );
      }
    }

    // Check if current and new password are provided
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Current and new password are required" },
        { status: 400 }
      );
    }

    // Check if current and new password are same
    if(currentPassword === newPassword){
      return NextResponse.json(
        { message: "Current and new password cannot be same" },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const now = new Date();
    const dateTime = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Send generated password via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: session.user.email,
      subject: "Password changed Successful 🎉",
      text: `Hi ${session.user.name},\n\nPlease keep this safe. \n ${dateTime}`,
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE_PASSWORD_ERROR", error);
    return NextResponse.json(
      { message: "An error occurred while updating password" },
      { status: 500 }
    );
  }
}
