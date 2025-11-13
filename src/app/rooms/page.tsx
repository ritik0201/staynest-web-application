'use client'
import { useEffect, useState, Suspense } from "react"
import TvIcon from '@mui/icons-material/Tv';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { Chip } from "@mui/material";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from 'react'
import { FanIcon, AirVentIcon, WifiIcon } from "lucide-react";
import { IRoom } from "@/models/room";
import Footer from "@/components/footer";

interface IRoomWithRating extends IRoom {
  averageRating: number;
}

const StudentStayMap = dynamic(() => import("@/components/StudentStayMap"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const getAmenityDetails = (amenity: string) => {
  const lower = amenity.toLowerCase();
  switch (lower) {
    case "wifi": return { Icon: WifiIcon, label: "Free WiFi" };
    case "ac":
    case "air conditioner": return { Icon: AirVentIcon, label: "AC" };
    case "tv":
    case "smart tv": return { Icon: TvIcon, label: "Smart TV" };
    case "parking": return { Icon: LocalParkingIcon, label: "Free Parking" };
    case "fan": return { Icon: FanIcon, label: "Fan" };
    default: return { Icon: null, label: amenity };
  }
};

function RoomsPageContent() {
  const searchParams = useSearchParams();
  const centerQuery = searchParams.get("center")?.toLowerCase() || "";
  const cityQuery = searchParams.get("city")?.toLowerCase() || "";
  const guestsQuery = Number(searchParams.get("guests") || 0);

  const [allRooms, setAllRooms] = useState<IRoomWithRating[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<IRoomWithRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [localSearchQuery, setLocalSearchQuery] = useState(centerQuery || cityQuery);

  const [selectedPeople, setSelectedPeople] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    async function fetchRoom() {
      try {
        const response = await fetch('/api/rooms');
        const data = await response.json();
        if (data.success) setAllRooms(data.rooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast.error("Failed to fetch rooms.");
      } finally {
        setLoading(false);
      }
    }
    fetchRoom();
  }, []);

  useEffect(() => {
    const filtered = allRooms.filter((room) => {
      const localQuery = localSearchQuery.toLowerCase();
      const matchesLocalSearch = localQuery
        ? room.nearByCentre.toLowerCase().includes(localQuery) ||
          room.address.city.toLowerCase().includes(localQuery)
        : true;

      const initialGuestsQuery = guestsQuery > 0 ? room.noOfPeople >= guestsQuery : true;
      const matchesPeople = selectedPeople !== null ? (selectedPeople === 5 ? room.noOfPeople > 4 : room.noOfPeople === selectedPeople) : true;
      const matchesPrice = selectedPrice !== null ? room.pricePerHour <= selectedPrice : true;
      const normalizeAmenity = (a: string) => a.trim().toLowerCase();
      const matchesAmenities = selectedAmenities.length > 0
        ? selectedAmenities.every(a => room.amenities.map(normalizeAmenity).includes(normalizeAmenity(a)))
        : true;

      return matchesLocalSearch && initialGuestsQuery && matchesPeople && matchesPrice && matchesAmenities;
    });
    setFilteredRooms(filtered);
  }, [localSearchQuery, guestsQuery, allRooms, selectedPeople, selectedPrice, selectedAmenities]);

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const roomLocations = filteredRooms
    .filter((room) => room.currentlocation?.latitude && room.currentlocation?.longitude)
    .map((room) => ({
      lat: room.currentlocation.latitude,
      lng: room.currentlocation.longitude,
      name: room.roomOwner,
      nearByCentre: room.nearByCentre,
      price: room.pricePerHour,
      id: String(room._id)
    }));

  const peopleOptions = [
    { label: "1 Person", value: 1 },
    { label: "2 People", value: 2 },
    { label: "3 People", value: 3 },
    { label: "4 People", value: 4 },
    { label: "More than 4", value: 5 },
  ];

  const priceOptions = [
    { label: "Under ₹50", value: 50 },
    { label: "Under ₹80", value: 80 },
    { label: "Under ₹100", value: 100 },
    { label: "Under ₹200", value: 200 },
  ];

  const amenityOptions = ["Wifi", "Fan", "AC", "Parking"];

  if (loading) return <div className="items-center justify-center flex h-screen">Loading...</div>;

  return (
    <div className="w-full min-h-screen text-foreground bg-gray-900 flex flex-col items-center">
      
      <h1 className="text-3xl sm:text-4xl font-bold text-center mt-24 mb-6 text-white">
        Explore Affordable and Verified Rooms at StayNest
      </h1>

      {/* Search Box */}
      <div className="w-full max-w-6xl mb-6 px-4 sm:px-0">
        <input
          type="text"
          placeholder="Search by center name or city..."
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none text-white"
        />
      </div>

      {/* Filter Toggle (Mobile) */}
      <div className="w-full max-w-6xl md:hidden mb-4 px-4 sm:px-0">
        <button
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          className="w-full py-2.5 bg-purple-700 text-white rounded-lg shadow-lg hover:bg-purple-600 transition"
        >
          {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Container for Rooms + Filters */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-xl border-2 border-purple-600 overflow-hidden shadow-lg shadow-purple-600/20 mb-10">
        
        {/* Filter Section */}
        <div className={`${isFilterVisible ? 'block' : 'hidden'} md:block w-full md:w-80 bg-gray-800 p-6 border-b md:border-b-0 md:border-r border-gray-700`}>
          <h3 className="text-xl font-bold mb-4 text-white">Filters</h3>

          {/* Number of People */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2 text-gray-300">Number of People</h4>
            {peopleOptions.map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-gray-400">
                <input type="radio" name="people" value={opt.value}
                  checked={selectedPeople === opt.value}
                  onChange={() => setSelectedPeople(opt.value)} />
                {opt.label}
              </label>
            ))}
          </div>

          {/* Price Filter */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2 text-gray-300">Price per Hour</h4>
            {priceOptions.map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-gray-400">
                <input type="radio" name="price" value={opt.value}
                  checked={selectedPrice === opt.value}
                  onChange={() => setSelectedPrice(opt.value)} />
                {opt.label}
              </label>
            ))}
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2 text-gray-300">Amenities</h4>
            <div className="grid grid-cols-2 gap-2">
              {amenityOptions.map(amenity => (
                <label key={amenity} className="flex items-center gap-2 cursor-pointer text-gray-400">
                  <input type="checkbox" checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)} />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setSelectedPeople(null); setSelectedPrice(null); setSelectedAmenities([]); }}
            className="w-full py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition"
          >
            Clear All Filters
          </button>
        </div>

        {/* Room List Section */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col gap-6 items-center">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <Link
                href={`/rooms/${room._id}`}
                key={String(room._id)}
                onClick={(e) => {
                  if (!room.isAvailable) {
                    e.preventDefault();
                    toast.error("This room is currently not available.");
                  }
                }}
                className="flex flex-col sm:flex-row w-full bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition"
              >
                {/* Image */}
                <div className="flex-shrink-0 w-full sm:w-1/3 h-56 sm:h-64">
                  <Image
                    src={room.images[0] || '/image/login.png'}
                    alt={room.roomOwner}
                    width={400}
                    height={256}
                    //sizes="(max-width: 640px) 90vw, (max-width: 768px) 30vw, 33vw"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col justify-between w-full sm:w-2/3 text-gray-300">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-white">{room.nearByCentre}</h2>
                        <p className="text-sm mt-1">Room Owner: {room.roomOwner}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <Chip label={room.isAvailable ? "Available" : "Unavailable"} color={room.isAvailable ? "success" : "error"} size="small" />
                        <div className="flex items-center text-yellow-400 mt-1">
                          <StarIcon className="mr-1" />
                          <span>{room.averageRating ? room.averageRating.toFixed(1) : 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-1 text-sm">
                      {room.address.street}, {room.address.city}, {room.address.state} - {room.address.pincode}
                    </p>

                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <div className="flex items-center">
                        <GroupAddIcon className="mr-1" />
                        <span>{room.noOfPeople} People</span>
                      </div>

                      {room.currentlocation.latitude && (
                        <button
                          className="flex items-center text-purple-500 hover:text-purple-400"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(`https://www.google.com/maps?q=${room.currentlocation.latitude},${room.currentlocation.longitude}`, '_blank');
                          }}
                        >
                          <LocationOnIcon className="mr-1" />
                          View on Map
                        </button>
                      )}
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-4 mt-4 text-sm">
                      {room.amenities.map((amenity, i) => {
                        const { Icon, label } = getAmenityDetails(amenity);
                        return (
                          <div key={i} className="flex items-center">
                            {Icon && <Icon className="mr-1" />}
                            {label}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price & Book */}
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-semibold text-purple-400">
                      ₹{room.pricePerHour} / hour
                    </p>
                    <button className="bg-purple-700 text-white px-5 py-2 rounded-lg hover:bg-purple-600 transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-gray-400 mt-6">No rooms available.</div>
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full max-w-6xl px-4 sm:px-0 mt-6 mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Rooms on Map</h2>
        <div className="w-full h-[500px] bg-gray-800 rounded-xl border-2 border-purple-500 overflow-hidden shadow-lg">
          {roomLocations.length > 0 ? (
            <StudentStayMap locations={roomLocations} />
          ) : (
            <p className="text-gray-400 p-6">No locations to show on map.</p>
          )}
        </div>
      </div>

      {/* Full Width Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default function RoomsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading rooms...</div>}>
      <RoomsPageContent />
    </Suspense>
  );
}
