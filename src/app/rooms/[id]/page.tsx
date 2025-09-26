"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function RoomDetailPage() {
  const { id } = useParams();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoom() {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        const data = await res.json();
        if (data.success) {
          setRoom(data.room);
        }
      } catch (err) {
        console.error("Failed to fetch room", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchRoom();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!room) {
    return <div className="flex items-center justify-center h-screen">Room not found</div>;
  }

  return (
    <div className="p-6 pt-20">
     {/* {room._id} */}
     {id}
    </div>
  );
}
