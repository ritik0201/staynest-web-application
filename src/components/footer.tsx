'use client';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 mt-12">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand / About Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">StayNest</h2>
            <p className="text-sm">
              Find the comfort of your home at affordable prices. Explore our wide range of student accommodations tailored to your needs, especially for exam-related stays.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
              <li><Link href="/rooms" className="hover:text-white transition-colors">Rooms</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">Legal</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-cancellation-policy" className="hover:text-white transition-colors">Refund / Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">Follow Us</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="https://github.com/ritik2177" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://www.instagram.com/r2iitiik_.xii._/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://x.com/RitikKumar40926" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter (X)</a></li>
              <li><a href="https://www.linkedin.com/in/ritik-kumar-058694318/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p> {new Date().getFullYear()} StayNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;