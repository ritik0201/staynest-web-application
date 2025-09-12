'use client';
import React, { useState } from 'react';
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function UserProfile() {
  const { data: session } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/update-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    setMessage(data.message);
    toast.success(data.message);
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 p-4 pt-20">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
        
        {/* Left Profile Section */}
        <div className="flex flex-col items-center w-full md:w-1/2 text-center">
          <img 
            src="/image/login-user.webp" 
            alt="User Avatar" 
            className="w-40 h-40 rounded-full shadow-md border-4 border-purple-300 object-cover"
          />
          <h1 className="text-3xl font-semibold mt-4 flex items-center gap-2 text-purple-800">
            <PersonIcon /> {session?.user?.name || "User"}
          </h1>
          <p className="flex items-center justify-center gap-2 text-gray-700 mt-2">
            <EmailIcon /> {session?.user?.email}
          </p>
          <p className="flex items-center justify-center gap-2 text-gray-700">
            <PhoneIphoneIcon /> {session?.user?.mobile || "Not provided"}
          </p>

          {/* Profile Guidelines */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mt-6 text-left w-full">
            <h2 className="flex items-center gap-2 text-purple-700 font-semibold mb-2">
              <InfoIcon /> Profile & Security Guidelines
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed">
              <li>Keep your email up-to-date for account recovery.</li>
              <li>Use a strong password (8+ characters, mix of letters, numbers, symbols).</li>
              <li>Check your email for alerts after password changes.</li>
              <li>Log out from shared devices to stay secure.</li>
            </ul>
          </div>
        </div>

        {/* Right Actions Section */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 gap-6 md:mt-44">
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<LockIcon />} 
            onClick={() => setOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 normal-case rounded-lg shadow-md"
          >
            Change Password
          </Button>

          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="border-purple-600 text-purple-600 hover:bg-purple-50 normal-case rounded-lg shadow-md"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Password Change Modal */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        fullWidth 
        maxWidth="xs"
        PaperProps={{ style: { borderRadius: 16 } }}
      >
        <DialogTitle className="text-purple-700 font-semibold">Change Your Password</DialogTitle>
        <DialogContent>
          <p className="text-sm text-gray-600 mb-4">
            After changing your password, you’ll receive a confirmation email.  
            Make sure you choose a password that you haven’t used before.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <TextField
              type="password"
              label="Current Password"
              variant="outlined"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              fullWidth
            />
            <TextField
              type="password"
              label="New Password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
            />
            {message && <p className="text-sm text-green-600">{message}</p>}
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="secondary" 
                className="bg-purple-600 hover:bg-purple-700"
              >
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
