import React from "react";
import Footer from "@/components/footer";

export const metadata = {
  title: "About Us | StayNest",
  description:
    "Learn about StayNest — a trusted platform offering affordable and verified accommodations for students and travelers. Founded by Ritik Kumar and Aryan.",
};

const AboutUsPage = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col justify-between">
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4 text-white">About Us</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Welcome to <span className="font-semibold text-white">StayNest</span> —
            your trusted destination for verified, affordable, and comfortable
            stays designed for students, travelers, and working professionals.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="bg-gray-800/70 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-3 text-white">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Our mission is to make finding a perfect stay effortless. StayNest
              provides a transparent and user-friendly platform where users can
              explore, compare, and book accommodations with confidence and
              comfort.
            </p>
          </div>

          <div className="bg-gray-800/70 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-3 text-white">
              Our Vision
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We aim to become India’s most reliable and affordable stay
              platform — empowering students and travelers to experience comfort
              anywhere, anytime.
            </p>
          </div>
        </div>

        {/* Founders Section */}
        <div className="bg-gray-800/70 rounded-2xl shadow-md p-10 mb-16 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Meet Our Founders
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <div className="hover:scale-105 transition-transform">
              <h3 className="text-xl font-semibold text-white">Ritik Kumar</h3>
              <p className="text-gray-400">Founder</p>
            </div>
            <div className="hover:scale-105 transition-transform">
              <h3 className="text-xl font-semibold text-white">Aryan</h3>
              <p className="text-gray-400">Co-Founder</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-3 text-white">Contact Us</h2>
          <p className="text-gray-400">
            Have questions or need assistance? We’d love to hear from you.
          </p>
          <p className="text-blue-400 font-medium mt-3">
            Email:{" "}
            <a
              href="mailto:staynest0@gmail.com"
              className="underline hover:text-blue-300"
            >
              staynest0@gmail.com
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
