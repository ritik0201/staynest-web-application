"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Chip, Switch, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress, IconButton } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { Trash2, BedDouble, CheckCircle, XCircle, Edit, PlusCircle, MinusCircle } from 'lucide-react';

// Define a plain interface for the room data to be used in the client-side state
interface IRoomData {
  _id: string;
  roomOwner: string;
  nearByCentre: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: number;
  };
  pricePerHour: number;
  images: string[];
  isAvailable: boolean;
  foods?: { name: string; price: number }[];
  // Add any other fields from IRoom that you use in this component
}

export default function OwnerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [rooms, setRooms] = useState<IRoomData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State for delete confirmation
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // State for food menu editing modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<IRoomData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(room => room.isAvailable).length;

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.replace("/");
      return;
    }

    const fetchRooms = async () => {
      if (session?.user?.id) {
        try {
          const res = await fetch(`/api/rooms/owner/${session.user.id}`);
          const data = await res.json();
          if (data.success) {
            setRooms(data.rooms);
          } else {
            toast.error("Failed to fetch rooms.");
          }
        } catch {
          toast.error("An error occurred while fetching rooms.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRooms();
  }, [session, status, router]);

  const handleAvailabilityToggle = async (roomId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    // Optimistically update UI
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room._id === roomId ? { ...room, isAvailable: newStatus } : room
      )
    );

    try {
      const res = await fetch(`/api/rooms/${roomId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }
      toast.success(`Room is now ${newStatus ? "available" : "unavailable"}.`);
    } catch {
      // Revert UI on failure
      setRooms(prevRooms =>
        prevRooms.map(room =>
          room._id === roomId ? { ...room, isAvailable: currentStatus } : room
        )
      );
      toast.error("Failed to update room status. Please try again.");
    }
  };

  const handleDeleteClick = (roomId: string) => {
    setRoomToDelete(roomId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!roomToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/rooms/${roomToDelete}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete room');
      }

      setRooms(prevRooms => prevRooms.filter(room => room._id !== roomToDelete));
      toast.success('Room deleted successfully.');
    } catch {
      toast.error('Failed to delete room. Please try again.');
    } finally {
      setIsDeleting(false);
      setOpenDeleteDialog(false);
      setRoomToDelete(null);
    }
  };

  // --- Food Menu Modal Functions ---
  const openEditModal = (room: IRoomData) => {
    setEditingRoom(JSON.parse(JSON.stringify(room))); // Deep copy to avoid direct state mutation
    setIsEditModalOpen(true);
  };

  const handleModalFoodChange = (index: number, field: 'name' | 'price', value: string) => {
    if (!editingRoom) return;
    const newFoods = [...(editingRoom.foods || [])];
    newFoods[index] = { ...newFoods[index], [field]: value };
    setEditingRoom({ ...editingRoom, foods: newFoods });
  };

  const addFoodItemToModal = () => {
    if (!editingRoom) return;
    const newFoods = [...(editingRoom.foods || []), { name: '', price: 0 }];
    setEditingRoom({ ...editingRoom, foods: newFoods });
  };

  const removeFoodItemFromModal = (index: number) => {
    if (!editingRoom) return;
    const newFoods = editingRoom.foods?.filter((_, i) => i !== index) || [];
    setEditingRoom({ ...editingRoom, foods: newFoods });
  };

  const handleSaveChanges = async () => {
    if (!editingRoom) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/rooms/${editingRoom._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foods: editingRoom.foods }),
      });

      if (!res.ok) {
        throw new Error('Failed to save food menu');
      }

      // Update the main rooms list with the new data
      setRooms(prevRooms => prevRooms.map(r => r._id === editingRoom._id ? editingRoom : r));
      toast.success('Food menu updated successfully!');
      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to save food menu. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading your rooms...</div>;
  }
  return (
    <div className="container mx-auto p-4 sm:p-6 pt-20 sm:pt-20 lg:p-8  lg:pt-20 min-h-full">
      
      <div className="flex justify-between items-center mb-8 ">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground">My Rooms</h1>
        <Link href="/owner/new-room" className="px-4 md:px-6 py-2 md:py-3 bg-purple-600 text-white text-sm md:text-xl rounded-lg hover:bg-purple-700 transition shadow-md flex items-center gap-2">
          <BedDouble size={20} />
          <span>List a New Room</span>
        </Link>
      </div>

      <div className="w-full md:w-8/12">
        <p className="text-muted-foreground mb-4 font-bold"> Welcome to your Room Owner Dashboard! 🏠</p>
        <p className="text-muted-foreground mb-4"> This is your central hub to manage everything about your listed rooms. Easily add new rooms, edit details, and update availability with just a few clicks. Track your bookings, monitor payment status, and stay informed about guest activity — all in real time. Simplify your management process and keep your listings active, attractive, and up-to-date effortlessly! 🌟</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-border flex items-center gap-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full z-10"><BedDouble size={28} className="text-purple-600" /></div>
          <div>
            <p className="text-muted-foreground text-sm">Total Rooms</p>
            <p className="text-3xl font-bold text-foreground">{totalRooms}</p>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-border flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full z-10"><CheckCircle size={28} className="text-green-600" /></div>
          <div>
            <p className="text-muted-foreground text-sm">Available</p>
            <p className="text-3xl font-bold text-green-700">{availableRooms}</p>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-border flex items-center gap-4">
          <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full z-10"><XCircle size={28} className="text-red-500" /></div>
          <div>
            <p className="text-muted-foreground text-sm">Unavailable</p>
            <p className="text-3xl font-bold text-red-600">{totalRooms - availableRooms}</p>
          </div>
        </div>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-20 bg-gray-800 rounded-xl border border-dashed border-border">
          <BedDouble size={48} className="mx-auto text-muted-foreground" />
          <p className="text-xl text-muted-foreground mt-4">You havent listed any rooms yet.</p>
          <p className="text-muted-foreground/70">Click the button above to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rooms.map((room) => (
            <div key={room._id} className="bg-gray-800 rounded-xl shadow-md p-4 flex flex-col md:flex-row items-start md:items-center gap-4 border border-border hover:shadow-lg transition-shadow">
              <Image src={(room.images && room.images[0]) ? room.images[0] : '/image/login.png'} alt={room.nearByCentre} width={128} height={128} className="w-full md:w-32 h-32 object-cover rounded-lg" />
              <div className="flex-grow">
                <p className="text-xl font-bold text-foreground">{room.nearByCentre}</p>
                <p className="text-sm text-muted-foreground">{room.address.street}, {room.address.city}</p>
                <p className="text-lg font-semibold text-green-600">₹{room.pricePerHour}/hour</p>

                {/* Food Menu */}
                {room.foods && room.foods.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-700">
                    <ul className="space-y-1 text-xs max-h-20 overflow-y-auto">
                      {room.foods.map((food, index) => (
                        <li key={index} className="flex justify-between text-muted-foreground pr-2">
                          <span>{food.name}</span>
                          <span>₹{food.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 self-center md:self-auto">
                <IconButton size="small" onClick={() => openEditModal(room)} className="text-blue-500 hover:bg-blue-900/20">
                  <Edit size={20} />
                </IconButton>
                <Chip label={room.isAvailable ? "Available" : "Unavailable"} color={room.isAvailable ? "success" : "error"} />
                <Switch checked={room.isAvailable} onChange={() => handleAvailabilityToggle(room._id, room.isAvailable)} />
              </div>
              <div className="flex gap-2 self-center md:self-auto">
                <button onClick={() => handleDeleteClick(room._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full transition">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this room? This action can&apos;t be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Food Menu Modal */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Food Menu for <span className="text-primary">{editingRoom?.nearByCentre}</span></DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-2 max-h-[60vh] overflow-y-auto pr-2">
            {editingRoom?.foods?.map((food, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Food Name"
                  value={food.name}
                  onChange={(e) => handleModalFoodChange(index, 'name', e.target.value)}
                  className="bg-gray-700 text-white p-2 rounded w-full focus:ring-1 focus:ring-purple-500 focus:outline-none"
                />
                <div className="flex items-center bg-gray-700 rounded">
                  <span className="text-gray-400 pl-2">₹</span>
                  <input
                    type="number"
                    placeholder="Price"
                    value={food.price}
                    onChange={(e) => handleModalFoodChange(index, 'price', e.target.value)}
                    className="bg-transparent text-white p-2 rounded w-24 focus:outline-none"
                  />
                </div>
                <IconButton onClick={() => removeFoodItemFromModal(index)} className="text-red-500">
                  <MinusCircle size={20} />
                </IconButton>
              </div>
            ))}
          </div>
          <Button
            startIcon={<PlusCircle size={18} />}
            onClick={addFoodItemToModal}
            className="mt-4"
            sx={{ textTransform: 'none', color: 'white' }}
          >
            Add New Food Item
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveChanges} color="primary" variant="contained" disabled={isSaving}>
            {isSaving ? <CircularProgress size={24} /> : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
