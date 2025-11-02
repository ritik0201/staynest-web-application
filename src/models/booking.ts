import mongoose, { Schema, Document } from "mongoose";
import Room from "./room";

const foodSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export interface IBooking extends Document {
  userId: Schema.Types.ObjectId;
  roomId: Schema.Types.ObjectId;
  fullName: string;
  noOfPeople: number;
  enrollmentNumber: string;
  address: string;
  email: string;
  mobile: string;
  startTime: Date;
  endTime: Date;
  totalHours: number;
  totalCost: number;
  paymentId?: string;
  status: 'booked' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  foods?: { name: string; price: number }[];
}

const bookingSchema = new Schema<IBooking>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  paymentId: { 
    type: String,
  },
  totalHours: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  noOfPeople: {
    type: Number,
    required: true,
  },
  enrollmentNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String, 
    enum: ['booked', 'completed'],
    default: 'booked',
  },
  foods: {
    type: [foodSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

bookingSchema.post('findOneAndUpdate', async function (res) {
  if (!res) return;
  if (res.status === 'completed') {
    await Room.findByIdAndUpdate(res.roomId, { isAvailable: true });
  }
});

export default mongoose.models.Booking ||
  mongoose.model<IBooking>('Booking', bookingSchema);
