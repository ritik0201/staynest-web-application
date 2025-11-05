import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email } = body;

        // Validate input
        try {
            forgotPasswordSchema.parse(body);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return NextResponse.json(
                    { message: "Invalid email format", errors: error.issues },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                { message: "Invalid request body" },
                { status: 400 }
            );
        }

        await dbConnect();

        const user = await User.findOne({ email });

        if (!user) {
            // For security reasons, do not reveal if the email exists or not.
            // Always send a success message, but only send the email if the user exists.
            console.warn(`Forgot password attempt for non-existent email: ${email}`);
            return NextResponse.json(
                { message: "If an account with that email exists, a password reset email has been sent." },
                { status: 200 }
            );
        }

        // Retrieve the plaintext password (as per previous request, this is stored directly)
        const userPassword = user.password;

        // Setup email transport
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Ensure these environment variables are set
                pass: process.env.EMAIL_PASS,
            },
        });

        const now = new Date();
        const dateTime = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

        // Send the password via email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your StayNest Password",
            text: `Hi ${user.username},\n\nYour password for StayNest is: ${userPassword}\n\nPlease keep this safe. \n ${dateTime}`,
        });

        return NextResponse.json(
            { message: "If an account with that email exists, a password reset email has been sent." },
            { status: 200 }
        );

    } catch (error) {
        console.error('FORGOT_PASSWORD_ERROR', error);
        return NextResponse.json(
            { message: "An internal server error occurred." },
            { status: 500 }
        );
    }
}
