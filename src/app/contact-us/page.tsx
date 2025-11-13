'use client';

import { useState } from "react";
import Footer from "@/components/footer";
import { toast } from "sonner";
import CircularProgress from "@mui/material/CircularProgress";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Contact StayNest | 24x7 Support & Booking Assistance",
//   description:
//     "Contact StayNest for affordable room bookings, customer support, or partnership inquiries. We’re available 24×7 via phone or email to assist you quickly.",
//   keywords: [
//     "StayNest contact",
//     "StayNest customer support",
//     "StayNest helpline",
//     "room booking help",
//     "affordable stays support",
//   ],
//   openGraph: {
//     title: "Contact StayNest | 24x7 Support & Booking Assistance",
//     description:
//       "Need help? Contact StayNest via email or phone. Our team is ready to assist with bookings, refunds, or general inquiries anytime.",
//     url: "https://staynest.online/contact",
//   },
// };

export default function ContactPage() {
  const PHONE = "9125890877";
  const EMAIL = "staynest0@gmail.com";

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${PHONE}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 antialiased">
      <main className="max-w-5xl mx-auto px-6 sm:px-8 pt-24 pb-20 sm:pt-32">
        {/* Page Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400">
            Contact StayNest
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Need help with bookings or have a question? Contact us anytime — we’re available
            <span className="text-purple-400 font-medium"> 24×7 </span> to assist you.
          </p>
        </section>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Phone */}
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-6 shadow-lg hover:shadow-purple-800/30 transition-all duration-200">
            <h2 className="text-2xl font-semibold text-white mb-3">Call Us</h2>
            <p className="text-slate-300 mb-4">
              Our support team is available by phone 24×7.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-sm text-slate-400">Phone</div>
                <div className="text-lg font-medium">{PHONE}</div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCall}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Call Now
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(PHONE);
                    toast.success("Phone number copied to clipboard!");
                  }}
                  className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md font-medium transition-colors flex-1 sm:flex-initial"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-6 shadow-lg hover:shadow-purple-800/30 transition-all duration-200">
            <h2 className="text-2xl font-semibold text-white mb-3">Email Us</h2>
            <p className="text-slate-300 mb-4">
              Send us your queries or feedback — we usually reply within a few hours.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-sm text-slate-400">Email</div>
                <div className="text-lg font-medium">{EMAIL}</div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={() => (window.location.href = `mailto:${EMAIL}`)}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Email Us
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(EMAIL);
                    toast.success("Email address copied to clipboard!");
                  }}
                  className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md font-medium transition-colors flex-1 sm:flex-initial"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Send us a Message</h3>
          <p className="text-slate-400 mb-6">
            Have a query or feedback? Fill the form below, and we’ll reach out shortly.
          </p>

          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              placeholder="Your Name"
              name="name"
              value={form.name}
              onChange={handleFormChange}
              className="col-span-1 px-4 py-3 rounded-md bg-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              placeholder="Your Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleFormChange}
              className="col-span-1 px-4 py-3 rounded-md bg-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              placeholder="Subject"
              name="subject"
              value={form.subject}
              onChange={handleFormChange}
              className="sm:col-span-2 px-4 py-3 rounded-md bg-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder="Write your message..."
              name="message"
              value={form.message}
              onChange={handleFormChange}
              className="sm:col-span-2 px-4 py-3 rounded-md bg-slate-700 placeholder-slate-400 outline-none h-32 resize-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 px-6 py-3 sm:py-2 rounded-md font-medium transition-colors"
              >
                {loading ? <CircularProgress size={20} color="inherit" /> : "Send Message"}
              </button>
              <button
                type="button"
                onClick={() => setForm({ name: "", email: "", subject: "", message: "" })}
                className="bg-slate-600 hover:bg-slate-500 px-6 py-3 sm:py-2 rounded-md font-medium transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
