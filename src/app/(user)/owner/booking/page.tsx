"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { BookUser, Utensils, Calendar, Clock } from 'lucide-react';

interface IBooking {
  _id: string;
  roomId: { nearByCentre: string };
  userId: { username: string };
  fullName: string;
  enrollmentNumber: string;
  startTime: string;
  endTime: string;
  totalCost: number;
  foods?: { name: string; price: number }[];
  status: 'booked' | 'completed' | 'canceled';
}

export default function OwnerBookingsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (session?.user?.id) {
        try {
          const res = await fetch(`/api/bookings/owner/${session.user.id}`);
          const data = await res.json();
          if (data.success) {
            setBookings(data.bookings);
          } else {
            toast.error("Failed to fetch bookings.");
          }
        } catch (error) {
          console.error("Error fetching bookings:", error);
          toast.error("An error occurred while fetching bookings.");
        } finally {
          setLoading(false);
        }
      }
    };

    if (session) {
      fetchBookings();
    }
  }, [session]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading bookings...</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 pt-24 md:pt-28 min-h-full">
      <div className="flex items-center mb-8">
        <BookUser className="w-8 h-8 mr-3 text-primary" />
        <h1 className="text-2xl md:text-4xl font-bold text-foreground">My Room Bookings</h1>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-gray-800 rounded-xl border border-dashed border-border">
          <BookUser size={48} className="mx-auto text-muted-foreground" />
          <p className="text-xl text-muted-foreground mt-4">You have no bookings for your rooms yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-gray-800 rounded-xl shadow-md p-6 border border-border">
              <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-gray-700 pb-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary">{booking.roomId.nearByCentre}</h3>
                  <p className="text-sm text-muted-foreground">Booked by: {booking.fullName} ({booking.userId?.username})</p>
                  <p className="text-sm text-muted-foreground">Enrollment No: {booking.enrollmentNumber}</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <p className="text-lg font-semibold text-green-500">Total: ₹{booking.totalCost.toFixed(2)}</p>
                  <p className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full inline-block mt-1 ${booking.status === 'booked' ? 'bg-green-500/20 text-green-400' : booking.status === 'completed' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
                    {booking.status}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar size={16} className="text-primary" />
                    <span><strong>Start:</strong> {new Date(booking.startTime).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={16} className="text-primary" />
                    <span><strong>End:</strong> {new Date(booking.endTime).toLocaleString()}</span>
                  </div>
                </div>

                {booking.foods && booking.foods.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                      <Utensils size={16} />
                      <span>Food Order</span>
                    </div>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {booking.foods.map((food, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{food.name}</span>
                          <span>₹{food.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}