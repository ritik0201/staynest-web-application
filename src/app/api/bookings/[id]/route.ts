import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Booking from '@/models/booking';
import nodemailer from 'nodemailer';

interface IParams {
  id: string;
}

export async function PUT(req: Request, context: { params: Promise<IParams> }) {
  await dbConnect();

  try {
    const { id } = await context.params; 
    const { paymentId } = await req.json();

    if (!paymentId) {
      return NextResponse.json({ message: 'Payment ID is required' }, { status: 400 });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { paymentId, status: 'booked' },
      { new: true }
    );

    if (!updatedBooking) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }

    // --- Email Notification Logic ---
    // We need to fetch the full booking details to get user and owner emails
    const populatedBooking = await Booking.findById(updatedBooking._id)
      .populate<{ userId: { username: string; email: string, mobilenumber: string } }>('userId', 'username email mobilenumber') // The user who booked
      .populate({
        path: 'roomId',
        select: 'nearByCentre roomOwner currentlocation', // Room details
        populate: {
          path: 'userId', // The owner of the room
          model: 'User',
          select: 'username email mobilenumber'
        }
      });

    const now = new Date();
    const dateTime = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    if (populatedBooking) {
      const user = populatedBooking.userId;
      const room = populatedBooking.roomId as {
        nearByCentre: string;
        currentlocation?: {
          latitude: number;
          longitude: number;
        };
        userId: {
          username: string;
          email: string;
          mobilenumber: string;
        }
      };
      const owner = room.userId;

      // Generate HTML for food items list
      const foodItemsHtml = populatedBooking.foods && populatedBooking.foods.length > 0
        ? `<h3>Ordered Food Items:</h3>
           <ul>
             ${populatedBooking.foods.map((food: { name: string; price: number }) => `<li>${food.name} - ₹${food.price}</li>`).join('')}
           </ul>`
        : '<p>No food items were ordered.</p>';

      const emailStyles = `
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; line-height: 1.6; }
          .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          h1 { color: #444; }
          h3 { color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px; }
          ul { list-style-type: none; padding: 0; }
          li { margin-bottom: 10px; }
          b { color: #0056b3; }
          a { color: #007bff; text-decoration: none; }
          .footer { margin-top: 20px; text-align: center; font-size: 0.9em; color: #777; }
        </style>
      `;

      const userEmailHtml = `
        <html>
          <head>${emailStyles}</head>
          <body>
            <div class="container">
              <h1>Hi ${user.username},</h1>
              <p>Your booking for the room near the "<b>${room.nearByCentre}</b>" exam center is confirmed.</p>
              <p><b>Booking ID:</b> ${populatedBooking._id}</p>
              ${foodItemsHtml}
              <h3>Owner Details:</h3>
              <ul>
                <li><b>Name:</b> ${owner.username}</li>
                <li><b>Email:</b> <a href="mailto:${owner.email}">${owner.email}</a></li>
                ${owner.mobilenumber ? `<li><b>Contact:</b> ${owner.mobilenumber}</li>` : ''}
                ${room.currentlocation?.latitude && room.currentlocation?.longitude ? `<li><b>Location:</b> <a href="https://www.google.com/maps?q=${room.currentlocation.latitude},${room.currentlocation.longitude}" target="_blank">View on Google Maps</a></li>` : ''}
              </ul>
              <p>Thank you for choosing Student Stay!</p>
              <div class="footer">Sent on: ${dateTime}</div>
            </div>
          </body>
        </html>`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // 1. Send email to the user who booked
      if (user?.email) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: `Booking Confirmed for Your room near by ${room.nearByCentre} exam center! ✅`,
          html: userEmailHtml,
        }).catch(e => console.error("Failed to send confirmation email to user:", e));
      }

      // 2. Send email to the room owner
      if (owner?.email) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: owner.email,
          subject: `New Booking for Your Room which near by: ${room.nearByCentre} exam center🏡`,
          html: `
            <html>
              <head>${emailStyles}</head>
              <body>
                <div class="container">
                  <h1>Hi ${owner.username},</h1>
                  <p>You have a new booking for your room near the "<b>${room.nearByCentre}</b>" exam center.</p>
                  <h3>Booking Details:</h3>
                  <ul>
                    <li><b>Booked By:</b> ${populatedBooking.fullName}</li>
                    <li><b>User Email:</b> <a href="mailto:${user.email}">${user.email}</a></li>
                    <li><b>Enrollment No:</b> ${populatedBooking.enrollmentNumber}</li>
                    ${user.mobilenumber ? `<li><b>User Contact:</b> ${user.mobilenumber}</li>` : ''}
                    <li><b>Total Hours:</b> ${populatedBooking.totalHours}</li>
                    <li><b>Total Amount:</b> ₹${populatedBooking.totalCost}</li>
                  </ul>
                  ${foodItemsHtml}
                  <div class="footer">Sent on: ${dateTime}</div>
                </div>
              </body>
            </html>`,
        }).catch(e => console.error("Failed to send notification email to owner:", e));
      }
    }
    // --- End of Email Logic ---

    return NextResponse.json(
      { message: 'Booking updated successfully', booking: updatedBooking },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ message: 'Error updating booking' }, { status: 500 });
  }
}
