'use client'
import { useState } from "react";
import Footer from "@/components/footer";

export default function ContactPage() {
  const PHONE = "9125890877";
  const EMAIL = "staynest0@gmail.com";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleMailTo = (subject = "Support request from StayNest") => {
    const body = `Name: ${name || "N/A"}%0D%0AEmail: ${email || "N/A"}%0D%0A%0D%0A${message || ""}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const handleCall = () => {
    window.location.href = `tel:${PHONE}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 antialiased">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400">Contact StayNest</h1>
        <p className="mt-3 text-lg text-slate-400 max-w-2xl">
          Need help? Call us 24/7 or send an email. We&apos;re happy to assist with bookings, refunds, or any questions.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact card */}
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-white">Get in touch</h2>
            <p className="mt-2 text-slate-300">Support available 24×7 — call or email anytime.</p>

            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-slate-300">Phone</div>
                  <div className="text-lg font-medium">{PHONE}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCall}
                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-medium transition-colors"
                    aria-label="Call now"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.6a1 1 0 01.95.68l.9 2.7a1 1 0 01-.24 1.02L8.4 9.6a12 12 0 005 5l1.5-1.35a1 1 0 011.02-.24l2.7.9A1 1 0 0121 15.4V18a2 2 0 01-2 2H19C9.716 20 4 14.284 4 5V5z"/></svg>
                    Call
                  </button>

                  <button
                    onClick={() => navigator.clipboard?.writeText(PHONE)}
                    className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-md font-medium transition-colors"
                    aria-label="Copy phone"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-slate-300">Email</div>
                  <div className="text-lg font-medium">{EMAIL}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMailTo("General enquiry for StayNest")}
                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-medium transition-colors"
                    aria-label="Email us"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8"/></svg>
                    Email
                  </button>

                  <button
                    onClick={() => navigator.clipboard?.writeText(EMAIL)}
                    className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-md font-medium transition-colors"
                    aria-label="Copy email"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-700 pt-4 text-sm text-slate-400">
                <div>Support Response Time: Usually within a few hours</div>
                <div className="mt-1">Emergency/phone support: 24×7</div>
              </div>
            </div>
          </div>

          {/* About / founders */}
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-white">About us</h2>
            <p className="mt-2 text-slate-300">
              StayNest was built to help students find short-term, verified stays near exam centres with ease and safety.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-none w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-400 text-white flex items-center justify-center font-semibold text-lg">RK</div>
                <div>
                  <div className="font-medium text-white">Ritik Kumar</div>
                  <div className="text-sm text-slate-400">Co-founder</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-none w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-400 text-white flex items-center justify-center font-semibold text-lg">AF</div>
                <div>
                  <div className="font-medium text-white">Arayn</div>
                  <div className="text-sm text-slate-400">Co-founder</div>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-700 pt-4">
                <h3 className="text-sm font-semibold text-white">Office</h3>
                <p className="text-sm text-slate-400">Remote-first · Serving students across cities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form (sends mailto:) */}
        <div className="mt-12 rounded-2xl bg-slate-800/80 border border-slate-700 p-6 shadow-lg">
          <h3 className="text-xl font-semibold">Send us a message</h3>
          <p className="text-sm text-slate-300 mt-1">Fill below and we&apos;ll open your email client to send the message.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleMailTo("Contact from StayNest website");
            }}
            className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)} // prettier-ignore
              className="md:col-span-1 px-3 py-2 rounded-md bg-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
            />
            <input
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // prettier-ignore
              className="md:col-span-1 px-3 py-2 rounded-md bg-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
            />
            <input
              placeholder="Subject (optional)"
              className="md:col-span-1 px-3 py-2 rounded-md bg-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)} // prettier-ignore
              className="md:col-span-3 px-3 py-3 rounded-md bg-slate-700 placeholder-slate-400 outline-none h-28 focus:ring-2 focus:ring-purple-500 transition-shadow"
            />
            <div className="md:col-span-3 flex justify-end gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-md font-medium transition-colors"
              >
                Send message
              </button>
              <button
                type="button"
                onClick={() => { setName(""); setEmail(""); setMessage(""); }}
                className="inline-flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-md font-medium transition-colors"
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