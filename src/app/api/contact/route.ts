import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, message, subject } = await req.json();

  // Basic validation
  if (!name || !email || !message) {
    return NextResponse.json({ success: false, message: 'Name, email, and message are required.' }, { status: 400 });
  }

  // IMPORTANT: You must set these environment variables in your .env.local file
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS; // Corrected to use the existing EMAIL_PASS variable

  if (!user || !pass) {
    console.error('Email credentials are not set in environment variables.');
    return NextResponse.json({ success: false, message: 'Server configuration error.' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass,
    },
  });

  const mailOptions = {
    from: `"${name}" <${user}>`, // This will show your name and Gmail address
    to: 'ritikkvs2177@gmail.com', // The email address that will receive the form submissions
    replyTo: email, // So you can reply directly to the user
    subject: subject ? `Contact Form: ${subject}` : 'New Message from StayNest Website',
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);

    // Provide a more specific error message for authentication issues
    if (error instanceof Error && 'code' in error && (error as { code: string }).code === 'EAUTH') {
      console.error('Nodemailer authentication error: Please ensure you are using a valid Google App Password.');
      return NextResponse.json({ success: false, message: 'Authentication failed. Check server logs for details.' }, { status: 500 });
    }

    return NextResponse.json({ success: false, message: 'Failed to send message due to a server error.' }, { status: 500 });
  }
}