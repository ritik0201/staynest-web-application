'use client'
import Image from "next/image";
import { FlipWords } from "@/components/ui/flip-words";
import { useState } from "react";

export default function Home() {
  const words = ["STAY", "PEACE", "REST ROOM", "ON CENTER"];

  const [openPanel, setOpenPanel] = useState<string | null>("panel1");

  const togglePanel = (panel: string) => {
    setOpenPanel(openPanel === panel ? null : panel);
  }

  return (
    <div>
      <div className="relative bg-[url('/image/background-image.jpg')] bg-cover bg-center h-screen text-white">

        <div className="flex flex-col justify-end h-full px-6 md:px-16 md:pb-45 pb-20 ">

          {/* Header Section of home page*/}
          <button data-aos="fade-up" data-aos-delay="300"  className="bg-gray-600 w-fit p-0.5 md:p-1 px-2 md:px-4 text-sm border-none rounded-2xl ml-1 md:ml-2 text-center flex justify-center items-center 
  hover:scale-105 active:scale-95 transition-transform duration-300 ease-in-out animate-bounce">
            🎉 get ready for exam
          </button>
          <div className="mb-3 ml-4">
            <h1 data-aos="fade-up" data-aos-delay="600" className="text-2xl sm:text-3xl md:text-5xl max-w-136 font-bold mb-1 drop-shadow-lg text-gray-700">
              Welcome to <br /> Student <FlipWords words={words} />
            </h1>
            <p data-aos="fade-up" data-aos-delay="900" className="text-sm sm:text-base md:text-[16px] leading-relaxed max-w-[500px] text-black drop-shadow-sm">
              “A calm stay before the big test,
              So you can give your absolute best.”
            </p>
          </div>

          {/* Search Section */}
          <div data-aos="fade-up" data-aos-delay="1200" className="w-full max-w-3xl bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 w-full">

              <input
                type="text"
                placeholder="Enter your center name"
                className="w-full p-3 rounded-md border border-gray-300 placeholder-gray-500 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="date"
                className="w-full p-3 rounded-md border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Number of Guest"
                className="w-full p-3 rounded-md border border-gray-300 placeholder-gray-500 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button className="w-full md:w-auto bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-md transition">
                Search
              </button>

            </div>
          </div>


        </div>
      </div>


      {/* 2nd page */}
      <div className="container mx-auto px-4 pt-18">
        <h3
          data-aos="fade-up"
          className="text-5xl text-center font-bold text-purple-700 mb-4"
        >
          Who we are
        </h3>
        <p
          data-aos="fade-up"
          data-aos-delay="300"
          className="text-center text-gray-600 mt-4 md:px-30"
        >
          We are a dedicated platform created especially for students who travel
          across cities to appear for competitive and university exams. We
          understand how stressful it can be to find a place to rest before an
          important test.
        </p>

        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className="flex flex-wrap mt-2 w-full py-10 justify-center items-center"
        >
          {/* Left side image */}
          <div className="w-full md:w-5/12 flex justify-center items-center">
            <img src="/image/home1.png" alt="" />
          </div>

          {/* Right side accordion */}
          <div className="w-full md:w-7/12 flex flex-col justify-center items-center">
            <div className="w-full max-w-4xl space-y-4">
              {/* Panel 1 */}
              <div className="border rounded-lg shadow w-full">
                <button
                  className={"w-full flex justify-between items-center p-4 text-left font-semibold text-lg text-white rounded-t-lg bg-purple-600 hover:bg-purple-700"}
                  onClick={() => togglePanel("panel1")}
                >
                  Stress-Free Stays for Exam Travelers
                  <span>{openPanel === "panel1" ? "−" : "+"}</span>
                </button>
                {openPanel === "panel1" && (
                  <div className="p-4 text-gray-700 bg-purple-50">
                    We are a dedicated platform created especially for students who
                    travel across cities to appear for competitive and university
                    exams. We understand how stressful it can be to find a place to
                    rest before an important test..
                  </div>
                )}
              </div>

              {/* Panel 2 */}
              <div className="border rounded-lg shadow w-full">
                <button
                  className={"w-full flex justify-between items-center p-4 text-left font-semibold text-lg text-white rounded-t-lg bg-purple-600 hover:bg-purple-700"}
                  onClick={() => togglePanel("panel2")}
                >
                  Affordable, Comfortable Rooms Near Exams
                  <span>{openPanel === "panel2" ? "−" : "+"}</span>
                </button>
                {openPanel === "panel2" && (
                  <div className="p-4 text-gray-700 bg-purple-50">
                    Our mission is simple: to provide affordable, short-term, and
                    comfortable stays near exam centers so students can relax,
                    refresh, and focus entirely on their performance. Instead of
                    spending a lot on hotels or struggling with last-minute
                    arrangements, students can book a clean and peaceful room with us
                    in just a few clicks.
                  </div>
                )}
              </div>

              {/* Panel 3 */}
              <div className="border rounded-lg shadow w-full">
                <button
                  className={"w-full flex justify-between items-center p-4 text-left font-semibold text-lg text-white rounded-t-lg bg-purple-600 hover:bg-purple-700"}
                  onClick={() => togglePanel("panel3")}
                >
                  Verified, Safe, Student-Friendly Rooms
                  <span>{openPanel === "panel3" ? "−" : "+"}</span>
                </button>
                {openPanel === "panel3" && (
                  <div className="p-4 text-gray-700 bg-purple-50">
                    Every room we list is verified, safe, and student-friendly. With
                    us, you don’t just get a place to sleep—you get a supportive
                    environment that values your preparation, time, and peace of mind.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">Dream Destination</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea similique reprehenderit labore animi cumque beatae.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
            <Image
              src="/image/image2.jpeg"
              alt="A tropical beach with palm trees and clear water"
              width={400}
              height={192}
              className="w-full h-48 object-cover" />
            <p className="p-4 text-center text-gray-700 font-medium">Tropical Beach</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
            <Image
              src="/image/image3.jpg"
              alt="Misty mountains at sunrise"
              width={400}
              height={192}
              className="w-full h-48 object-cover" />
            <p className="p-4 text-center text-gray-700 font-medium">Misty Mountains</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
            <Image
              src="/image/image4.jpg"
              alt="A modern cityscape at night with illuminated skyscrapers"
              width={400}
              height={192}
              className="w-full h-48 object-cover" />
            <p className="p-4 text-center text-gray-700 font-medium">Modern Cityscape</p>
          </div>
        </div>
      </div>

    </div>

  );
}
