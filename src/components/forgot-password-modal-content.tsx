'use client';

import { useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "sonner";
import Image from 'next/image';

export default function ForgotPasswordContent({ handleClose }: { handleClose: () => void }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        const res = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        setLoading(false);

        if (res.ok) {
            handleClose();
            toast.success('If an account with that email exists, a password reset email has been sent.');
        } else {
            const data = await res.json();
            toast.error(data.message || 'Failed to send password reset email.');
        }
    };

    return (
        <div className="h-auto flex items-center justify-center">
            <div className="w-full max-w-sm bg-[#f5f5f5] px-8 pt-8 pb-4 space-y-4 rounded-xl">

                <div className="absolute top-4 left-4 flex items-center gap-2 ">
                    <Image src="/image/logo.png" width={32} height={32} alt="logo" />
                    <p className="text-black text-lg font-semibold">StayNest</p>
                </div>

                <div className="pt-4" />
                <h2 className="text-2xl font-semibold text-center text-purple-800">Forgot Password</h2>

                <div>
                    <input
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring border-purple-300 focus:ring-purple-600 text-purple-700 placeholder:text-purple-500"
                        placeholder="Enter your email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <p className="text-xs text-purple-900 mt-1">Enter the email associated with your account.</p>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full py-2 px-4 flex justify-center items-center gap-2 ${
                        loading ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"
                    } text-white font-semibold rounded-md transition duration-200`}
                >
                    {loading ? (
                        <>
                            <CircularProgress size={20} color="inherit" />
                            Sending...
                        </>
                    ) : (
                        "Send Password"
                    )}
                </button>
            </div>
        </div>
    );
}