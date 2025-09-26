// import React, { useState, FormEvent } from "react";

// const Footer: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [message, setMessage] = useState<string>("");

//   const isValidEmail = (email: string): boolean => {
//     const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
//     e.preventDefault();
//     if (isValidEmail(email.trim())) {
//       setMessage("Thank you for subscribing! You'll receive our updates soon.");
//       setEmail("");
//     } else {
//       setMessage("Please enter a valid email.");
//     }
//   };

//   return (
//     <footer className="bg-gradient-to-br from-blue-900 to-blue-500 text-white py-12 mt-8">
//       <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {/* About Us */}
//         <div>
//           <h3 className="text-xl font-bold mb-4">About Us</h3>
//           <p className="text-gray-300 mb-4">
//             We are a leading digital agency focused on creating unique,
//             responsive designs. Our footer exemplifies clean, engaging content
//             tailored for modern users.
//           </p>
//           <img
//             src="https://placehold.co/150x100"
//             alt="Stylized globe icon with interconnected digital elements and glowing nodes, symbolizing global connectivity and technology in a futuristic, colorful illustration"
//             className="rounded"
//           />
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-xl font-bold mb-4">Quick Links</h3>
//           <ul className="space-y-2">
//             <li>
//               <a
//                 href="#home"
//                 className="text-gray-300 hover:text-white transition"
//               >
//                 Home
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#portfolio"
//                 className="text-gray-300 hover:text-white transition"
//               >
//                 Portfolio
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#blog"
//                 className="text-gray-300 hover:text-white transition"
//               >
//                 Blog
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#careers"
//                 className="text-gray-300 hover:text-white transition"
//               >
//                 Careers
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Social Media */}
//         <div>
//           <h3 className="text-xl font-bold mb-4">Follow Us</h3>
//           <p className="text-gray-300 mb-4">
//             Stay connected on social media for updates and inspiration.
//           </p>
//           <div className="flex space-x-4">
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Facebook"
//             >
//               <img
//                 src="https://placehold.co/40x40"
//                 alt="Facebook icon in blue color, featuring a lowercase f inside a white square on a blue background"
//                 className="social-icon rounded-full"
//               />
//             </a>
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Instagram"
//             >
//               <img
//                 src="https://placehold.co/40x40"
//                 alt="Instagram icon in purple and pink gradient, white magnifying glass focusing on a camera with a flash"
//                 className="social-icon rounded-full"
//               />
//             </a>
//             <a
//               href="https://twitter.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Twitter"
//             >
//               <img
//                 src="https://placehold.co/40x40"
//                 alt="Twitter icon with a stylized bird in light blue, oriented to the left"
//                 className="social-icon rounded-full"
//               />
//             </a>
//           </div>
//         </div>

//         {/* Newsletter Signup */}
//         <div>
//           <h3 className="text-xl font-bold mb-4">Newsletter</h3>
//           <p className="text-gray-300 mb-4">
//             Subscribe to get the latest updates and exclusive content.
//           </p>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter your email"
//               className="newsletter-input w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               aria-label="Email address"
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//             >
//               Subscribe
//             </button>
//           </form>
//           {message && (
//             <p
//               className={`mt-2 ${
//                 message.startsWith("Thank") ? "text-green-400" : "text-red-400"
//               }`}
//               role="alert"
//             >
//               {message}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="border-t border-gray-500 mt-8 pt-4 text-center text-gray-300 text-sm">
//         <p>© 2023 Brand Footer Page. All rights reserved.</p>
//         <p>Privacy Policy | Terms of Service</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

'use client';
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand / About Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Student Stay</h2>
          <p className="text-gray-400">
            Find the comfort of your home at affordable prices. Explore our wide range of student accommodations tailored to your needs.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Destinations</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
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