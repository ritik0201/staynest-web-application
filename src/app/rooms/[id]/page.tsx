"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import TvIcon from '@mui/icons-material/Tv';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { User, Phone, Mail, Users } from "lucide-react";
import { FanIcon, AirVentIcon, WifiIcon } from "lucide-react";


const StudentStayMap = dynamic(() => import("@/components/StudentStayMap"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const getAmenityDetails = (amenity: string) => {
  const lower = amenity.toLowerCase();

  switch (lower) {
    case "wifi":
      return { Icon: WifiIcon, label: "Free WiFi" };
    case "ac":
    case "air conditioner":
      return { Icon: AirVentIcon, label: "AC" };
    case "tv":
    case "smart tv":
      return { Icon: TvIcon, label: "Smart TV" };
    case "parking":
      return { Icon: LocalParkingIcon, label: "Free Parking" };
    case "fan":
      return { Icon: FanIcon, label: "Fan" };
    default:
      return { Icon: null, label: amenity };
  }
};

export default function RoomDetailPage() {
  const { id } = useParams();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoom() {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        const data = await res.json();
        if (data.success) {
          setRoom(data.room);
          if (data.room.images && data.room.images.length > 0) {
            setSelectedImage(data.room.images[0]); // default first image
          }
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
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex items-center justify-center h-screen">
        Room not found
      </div>
    );
  }

  const roomLocation = room?.currentlocation?.latitude && room?.currentlocation?.longitude ? {
    lat: room.currentlocation.latitude,
    lng: room.currentlocation.longitude,
    name: room.roomOwner,
    price: room.pricePerHour,
    nearByCentre: room.nearByCentre,
    id: room._id
  } : null;

  return (
    <div className="container mx-auto p-6 pt-20 ">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-8/12">
          {/* Big Image */}
          {selectedImage && (
            <div className="w-full max-w-full h-[420px] mb-4 overflow-hidden bg-purple-50 rounded-2xl p-4 border-1 border-purple-300">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Thumbnails */}
          <div className="flex gap-4 md:gap-6 flex-wrap">
            {room.images?.slice(0, 4).map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`w-18 md:w-28 h-18 object-cover p-2 cursor-pointer border-1 bg-purple-50 rounded-xl 
              ${selectedImage === img
                    ? "border-purple-800"
                    : "border-transparent"
                  }`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col md:w-4/12 pt-1 rounded-lg justify-center ">
          {/* map */}
          <div className="w-full h-[320px] bg-purple-50 p-4 rounded-xl mb-4 border border-purple-200 overflow-hidden">
            <h2 className="text-xl font-bold mb-2 text-purple-800">Room Location</h2>
            <div className="w-full h-[250px] overflow-hidden">
              {roomLocation ? (
                <StudentStayMap locations={[roomLocation]} />
              ) : (
                <p>Location not available.</p>
              )}
            </div>
          </div>
          {/* owner Details */}
          <div className="bg-purple-50 p-5 rounded-xl shadow-sm border border-purple-200">
            <h3 className="text-xl font-bold text-purple-800 mb-4">Owner Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-purple-800" />
                <span className="text-gray-900 font-medium">{room.roomOwner}</span>
              </div>
              {room.userId?.mobilenumber && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-800" />
                  <span className="text-gray-800">{room.userId.mobilenumber}</span>
                </div>
              )}
              {room.userId?.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-800" />
                  <a href={`mailto:${room.userId.email}`} className="text-gray-800 hover:text-purple-900 hover:underline">{room.userId.email}</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm text-purple-600 font-semibold tracking-wider uppercase mt-8 mb-2">Room Details</p>
        <h3 className="text-4xl font-bold text-purple-800 font-sans">{room.nearByCentre}</h3>
        <h5 className="text-lg mt-2 text-gray-600 font-sans">Address: {room.address.street}, {room.address.city}, {room.address.state}, {room.address.pincode}</h5>
      </div>
      {/* Amenities */}
      <div className="mt-8">
        <h4 className="text-2xl font-bold text-purple-800 mb-4">What this place offers</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {room.amenities.map((amenity: string, index: number) => {
            const { Icon, label } = getAmenityDetails(amenity);
            return (
              <div key={index} className="flex flex-col items-center justify-center gap-2 p-4 border border-purple-200 rounded-xl bg-purple-50 hover:bg-white hover:shadow-md transition-all">
                {Icon && <Icon className="w-8 h-8 text-purple-700" />}
                <span className="text-sm font-medium text-gray-700 text-center">{label}</span>
              </div>
            );
          })}
          {/* Number of People Card */}
          <div className="flex flex-col items-center justify-center gap-2 p-4 border border-purple-200 rounded-xl bg-purple-50 hover:bg-white hover:shadow-md transition-all">
            <Users className="w-8 h-8 text-purple-700" />
            <span className="text-sm font-medium text-gray-700 text-center">{room.noOfPeople} People</span>
          </div>
          {/* Distance Card */}
          <div className="flex flex-col items-center justify-center gap-2 p-4 border border-purple-200 rounded-xl bg-purple-50 hover:bg-white hover:shadow-md transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-700"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" x2="4" y1="22" y2="15"></line></svg>
            <span className="text-sm font-medium text-gray-700 text-center">{room.dist_btw_room_and_centre}m away</span>
          </div>
        </div>
      </div>
      <div>
      <div className="mt-8 p-6 bg-purple-50 rounded-xl shadow-sm border border-purple-200">
        <h3 className="text-2xl font-bold text-purple-800 mb-4">About Room</h3>
        <p className="text-gray-700 text-base mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio consectetur aliquid ipsum porro. Aliquid placeat animi fugiat incidunt esse ut iure. Obcaecati inventore quam veritatis quidem vero aspernatur doloribus laboriosam ullam tempora! Ea aliquam dolorem rem est explicabo quasi quas, minus maxime, placeat fugit soluta numquam? Quisquam ducimus suscipit consequatur!</p>
      </div>
      </div>
    </div>
  );
}
