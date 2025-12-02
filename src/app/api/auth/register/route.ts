import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { registrationSchema } from "@/schema/registrationSchema";
import nodemailer from "nodemailer";
import crypto from "crypto";


function generateRandomPassword(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomBytes = crypto.randomBytes(length);
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = randomBytes[i] % chars.length;
        password += chars[randomIndex];
    }
    return password;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, email, mobilenumber } = body;

        // Validate input without password
        try {
            registrationSchema.omit({ password: true }).parse(body);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return NextResponse.json(
                    { message: "Enter valid data", errors: error.issues },
                    { status: 400 }
                );
            }
        }

        if (!username || !email) {
            return NextResponse.json(
                { message: "Username and Email are required" },
                { status: 400 }
            );
        }

        //console.log('Registering user:', { username, email, mobilenumber });
        await dbConnect();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        // Generate a secure 8-character random password with capital letters and numbers
        const randomPassword = generateRandomPassword(6);

        const newUser = new User({
            username,
            email,
            password: randomPassword,
            mobilenumber,
        });

        await newUser.save();

        // Setup email transport
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
            to: email,
            subject: "Registration Successful 🎉",
            text: `Hi ${username},\n\nYour account has been created successfully.\n\nUsername: ${username}\nPassword: ${randomPassword}\n\nPlease keep this safe. \n ${dateTime}`,
        });

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.error('REGISTRATION_ERROR', error);
        return NextResponse.json(
            { message: "An internal server error occurred." },
            { status: 500 }
        );
    }
}
