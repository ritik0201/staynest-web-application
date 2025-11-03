'use client';

import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand / About Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Student Stay</h2>
          <p className="text-sm text-gray-400">
            Find the comfort of your home at affordable prices. Explore our wide range of student accommodations tailored to your needs.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
            <li><Link href="/rooms" className="text-gray-300 hover:text-white">Destinations</Link></li>
            <li><Link href="/rooms" className="text-gray-300 hover:text-white">Room</Link></li>
            <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4 text-sm">
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <i className="fab fa-twitter"></i> Twitter
            </a>
          </div>
        </div>

      </div>

      <div className="text-center text-gray-500 mt-10 text-sm">
        © {new Date().getFullYear()} Dream Destinations. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;