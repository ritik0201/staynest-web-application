'use client'
import { useEffect, useState } from "react"
import CellWifiIcon from '@mui/icons-material/CellWifi';
import TvIcon from '@mui/icons-material/Tv';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

import React from 'react'
import Image from "next/image";

export default function RoomCard() {
    const [rooms, setRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAmentities, setSelectedAmenities] = useState<string[]>([]);
    const [selectedPeople, setSelectedPeople] = useState<string[]>([]);


    useEffect(() => {
        async function fetchRoom(){
            try {
                const response = await fetch('/api/rooms');
                const data = await response.json();
                if(data.success){
                    setRooms(data.rooms);
                }
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }finally{
                setLoading(false);
            }
        }
        fetchRoom();
    }, []);

    if(loading){
        return <div className=" items-center justify-center flex h-screen">Loading...</div>
    }
  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 flex justify-center">
        {/* container */}
        <div className="w-full mt-20 max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r p-4">
                {/* filter section */}
            </div>

            {/* room card section */}
            <div className="flex-1 p-6 flex flex-col gap-6 items-center">
                {rooms.length >  0 ? (
                    rooms.map((room) => (
                        <div
                            key={room._id}
                            className="flex flex-col sm:flex-row w-full bg-white shadow-md rounded-2xl overflow-hidden border hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* image */}
                            <div className="flex-shrink-0 w-full sm:w-1/3 h-64 overflow-hidden">
                                <img
                                src={room.images[0] || '/image/login.png'}
                                alt={room.roomOwner}
                                className="w-full h-full object-cover"
                                />
                            </div>

                            {/* details */}
                            <div className="p-6 flex flex-col justify-between w-full sm:w-2/3">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            {room.nearByCentre}
                                        </h2>
                                        <div className="flex items-center text-yellow-500">
                                            <StarIcon className="mr-1" />
                                            <span>{room.ratings || 4.5}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-400 mt-1">
                                        Room Owner: {room.roomOwner}
                                    </p>
                                    <p className="text-gray-600 mt-1">
                                        {room.address.street}, {room.address.city}, {room.address.state} - {room.address.pincode}
                                    </p>

                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <GroupAddIcon className="mr-1" />
                                            <span>{room.noOfPeople} People</span>
                                        </div>
                                        {room.currentlocation.latitude &&
                                        room.currentlocation.longitude && (
                                            <button
                                                className="flex items-center text-purple-600 hover:text-purple-700 cursor-pointer"
                                                onClick={() => {
                                                    window.open(
                                                        `https://www.google.com/maps?q=${room.currentlocation.latitude},${room.currentlocation.longitude}`,
                                                        '_blank'
                                                    );
                                                }}
                                            >
                                                <LocationOnIcon className="mr-1" />
                                                <span>View on Map</span>
                                            </button>
                                        )
                                        }
                                    </div>

                                    {/* amentities */}
                                    <div className="flex flex-wrap gap-4 mt-4">

                                    </div>
                                </div>
                                {/* price and book */}
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-lg font-semibold text-purple-700">
                                        ₹{room.pricePerHour} / hour
                                    </p>
                                    <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300">
                                        Book Now
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))
                ) : (
                    <div className="text-gray-600 mt-6">No rooms available.</div>
                )}
                    
            </div>
        </div>
    </div>
  )
}
