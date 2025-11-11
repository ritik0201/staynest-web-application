'use client'
import { FlipWords } from "@/components/ui/flip-words";
import Footer from "@/components/footer";
import RegisterModal from "@/components/modal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { useDebounce } from 'use-debounce';

interface IBlog {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  content: string;
  writerName: string;
  createdAt: string;
}

export default function Home() {
  const router = useRouter();
  const [center, setCenter] = useState("");
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState("");
  const [centerSuggestions, setCenterSuggestions] = useState<string[]>([]);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showCenterSuggestions, setShowCenterSuggestions] = useState(false);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [debouncedCenter] = useDebounce(center, 300);
  const [debouncedCity] = useDebounce(city, 300);
  const { data: session } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (center) query.append("center", center);
    if (city) query.append("city", city);
    if (guests) query.append("guests", guests);

    router.push(`/rooms?${query.toString()}`);
  };

  const handleListRoomClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!session) {
      e.preventDefault();
      toast.info("Please login first to add new room.");
      setIsLoginModalOpen(true);
    }
  };


  const fetchSuggestions = useCallback(async (type: 'center' | 'city', query: string) => {
    if (query.length < 2) {
      if (type === 'center') {
        setCenterSuggestions([]);
      } else {
        setCitySuggestions([]);
      }
      return;
    }
    try {
      const response = await fetch(`/api/search/suggestions?type=${type}&query=${query}`);
      const data = await response.json();
      if (data.success) {
        if (type === 'center') {
          setCenterSuggestions(data.suggestions);
        } else {
          setCitySuggestions(data.suggestions);
        }
      }
    } catch (error) {
      console.error(`Failed to fetch ${type} suggestions:`, error);
    }
  }, []);

  useEffect(() => {
    fetchSuggestions('center', debouncedCenter);
  }, [debouncedCenter, fetchSuggestions]);

  useEffect(() => {
    fetchSuggestions('city', debouncedCity);
  }, [debouncedCity, fetchSuggestions]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (res.ok) {
          setBlogs(data.slice(0, 3)); // Get the first 3 blogs
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const stripHtml = (html: string) => {
    if (typeof window !== 'undefined') {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    }
    // Basic fallback for server-side rendering
    return html.replace(/<[^>]*>/g, '');
  };

  const words = ["STAY", "PEACE", "REST ROOM", "ON CENTER"];

  const [openPanel, setOpenPanel] = useState<string | null>("panel1");

  const togglePanel = (panel: string) => {
    setOpenPanel(openPanel === panel ? null : panel);
  }

  return (
    <div className="relative overflow-hidden">
      <div className="relative bg-[url('/image/background-image.jpg')] bg-cover bg-center h-screen text-white">
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="relative z-10 flex flex-col justify-end h-full px-6 md:px-16 md:pb-45 pb-20 ">

          {/* Header Section of home page*/}
          <div data-aos="fade-up" data-aos-delay="300" className="bg-gray-600 w-fit p-0.5 md:p-1 px-2 md:px-4 text-sm border-none rounded-2xl ml-1 md:ml-2 text-center flex justify-center items-center">
            🎉 get ready for exam
          </div>
          <div className="mb-3 ml-4">
            <h1 data-aos="fade-up" data-aos-delay="600" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 drop-shadow-lg text-gray-700">
              <span className="block">StayNest:</span>
              <span>
                Student Stays Near <FlipWords words={words} />
              </span>
            </h1>
            <h2 data-aos="fade-up" data-aos-delay="900" className=" leading-relaxed  text-black drop-shadow-sm font-normal">
              “A calm stay before the big test,
              So you can give your absolute best.”
            </h2>
          </div>

          {/* Search Section */}
          <div data-aos="fade-up" data-aos-delay="1200" className="w-full max-w-3xl bg-white/70 dark:bg-black/50 backdrop-blur-md rounded-xl p-4 shadow-lg">
           <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Enter your center name"
                  className="w-full p-3 rounded-md border border-gray-300 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={center}
                  onChange={(e) => setCenter(e.target.value)}
                  onFocus={() => setShowCenterSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowCenterSuggestions(false), 150)}
                />
                {showCenterSuggestions && debouncedCenter.length > 1 && (
                  <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                    {centerSuggestions.length > 0 ? (
                      centerSuggestions.map((suggestion, index) => (
                        <li key={index} className="p-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" onMouseDown={() => { setCenter(suggestion); setShowCenterSuggestions(false); }}>
                          {suggestion}
                        </li>
                      ))
                    ) : (
                      <li className="p-2 text-gray-500">No matching result found</li>
                    )}
                  </ul>
                )}
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Enter your city"
                  className="w-full p-3 rounded-md border border-gray-300 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onFocus={() => setShowCitySuggestions(true)}
                  onBlur={() => setTimeout(() => setShowCitySuggestions(false), 150)}
                />
                {showCitySuggestions && debouncedCity.length > 1 && (
                  <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                    {citySuggestions.length > 0 ? (
                      citySuggestions.map((suggestion, index) => (
                        <li key={index} className="p-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" onMouseDown={() => { setCity(suggestion); setShowCitySuggestions(false); }}>
                          {suggestion}
                        </li>
                      ))
                    ) : (
                      <li className="p-2 text-gray-500">No matching result found</li>
                    )}
                  </ul>
                )}
              </div>

              <input
                type="number"
                placeholder="Number of Guest"
                className="w-full p-3 rounded-md border border-gray-300 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />

              <div className="relative rounded-md">
                <button
                  className="w-full md:w-auto bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-md transition"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>


      {/* 2nd page */}
      <div className="container mx-auto px-4 pt-18">
        <h3
          data-aos="fade-up"
          className="text-4xl md:text-5xl text-center font-bold text-purple-400 mb-4"
        >
          Who we are
        </h3>
        <p
          data-aos="fade-up"
          data-aos-delay="300"
          className="text-center text-muted-foreground text-base md:text-lg mt-4 md:px-30"
        >
          We are a dedicated platform created especially for students who travel
          across cities to appear for competitive and University exams. We
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
            <Image src="/image/home1.png" alt="Illustration of a person studying" width={500} height={500} />
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
                  <div className="p-4 text-gray-700 text-base bg-purple-50">
                    We are a dedicated platform created especially for students who
                    travel across cities to appear for competitive and University 
                    exams.  We understand how stressful it can be to find a place to
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
                  Affordable, Comfortable Rooms Near Exams Centers
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

      {/* Blog Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 data-aos="fade-up" className="text-4xl md:text-5xl font-bold text-purple-400 text-center mb-4">
          Latest From Our Blog
        </h2>
        <p data-aos="fade-up" data-aos-delay="150" className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Fresh perspectives and helpful tips for your academic journey.
        </p>
        <div data-aos="fade-up" data-aos-delay="300" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog._id} href={`/blogs/${blog.slug}`} passHref>
              <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/40 border border-border group transform hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                <div className="relative w-full h-56">
                  <Image
                    src={blog.coverImage || '/image/placeholder.png'}
                    alt={blog.title}
                    layout="fill"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-purple-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {stripHtml(blog.content).substring(0, 100)}...
                  </p>
                  <div className="text-xs text-gray-500 mt-auto">
                    <span>{blog.writerName}</span> &middot; <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div data-aos="fade-up" className="text-center mt-12">
          <Link href="/blogs" className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 shadow-lg text-lg">
            Explore More Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className='flex justify-center'>
        <div className='py-30 container'>
          <h2 className='text-4xl md:text-5xl font-bold text-purple-400 text-center'>Facility we Provide</h2>
          <p className='text-center px-2 md:px-40 text-base md:text-lg text-muted-foreground mt-4 md:mt-10'> We provide affordable, safe, and comfortable stays near exam centers with all essential facilities for students. Our services include clean and hygienic rooms, 24/7 water supply, and a peaceful environment for focused preparation. With quick booking, time-saving check-ins, and reliable shelter, we ensure students experience a stress-free and comfortable stay.</p>
          <div className='flex flex-wrap w-full justify-center mt-5 md:mt-15'>
            <div data-aos="zoom-in" data-aos-delay="900" className='h-[120px] md:h-[200px] w-[120px] md:w-[200px] flex flex-col items-center justify-center mr-4 mt-4 rounded-2xl bg-purple-400 hover:shadow-xl transition-shadow duration-300'>
              <Image width="94" height="94" src="https://img.icons8.com/3d-fluency/94/money-bag.png" alt="Affordable Price Icon" />
              <p className="text-sm md:text-xl font-semibold md:font-bold text-white">Affordable Price</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="600" className='h-[120px] md:h-[200px] w-[120px] md:w-[200px] flex flex-col items-center justify-center mr-4 mt-4 rounded-2xl bg-purple-400 hover:shadow-xl transition-shadow duration-300'>
              <Image width="94" height="94" src="https://img.icons8.com/3d-fluency/94/sand-clock-1.png" alt="Time Saving Icon" />
              <p className="text-sm md:text-xl font-semibold md:font-bold text-white">Time Saving</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="300" className='h-[120px] md:h-[200px] w-[120px] md:w-[200px] flex flex-col items-center justify-center mr-4 mt-4 rounded-2xl bg-purple-400 hover:shadow-xl transition-shadow duration-300'>
              <Image width="94" height="94" src="https://img.icons8.com/3d-fluency/94/bed.png" alt="Comfortable Stay Icon" />
              <p className="text-sm md:text-xl font-semibold md:font-bold text-white">Comfortable Stay</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="600" className='h-[120px] md:h-[200px] w-[120px] md:w-[200px] flex flex-col items-center justify-center mr-4 mt-4 rounded-2xl bg-purple-400 hover:shadow-xl transition-shadow duration-300'>
              <Image width="94" height="94" src="https://img.icons8.com/3d-fluency/94/shower.png" alt="Shower Icon" />
              <p className="text-sm md:text-xl font-semibold md:font-bold text-white">Shower</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="900" className='h-[120px] md:h-[200px] w-[120px] md:w-[200px] flex flex-col items-center justify-center mr-4 mt-4 rounded-2xl bg-purple-400 hover:shadow-xl transition-shadow duration-300'>
              <Image width="94" height="94" src="https://img.icons8.com/3d-fluency/94/real-estate.png" alt="Shelter Icon" />
              <p className="text-sm md:text-xl font-semibold md:font-bold text-white">Shelter</p>
            </div>

          </div>
        </div>
      </div>

      {/* Become a Host Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold text-purple-400 mb-4">
          Become a Host with StayNest
        </h2>
        <p data-aos="fade-up" data-aos-delay="200" className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
          Have a spare room? Turn it into an opportunity. Help students find a safe and comfortable place to stay for their exams and earn extra income with ease. Join our community of hosts today!
        </p>
        <div data-aos="fade-up" data-aos-delay="400">
          <Link href="/owner/new-room" passHref>
            <button
              onClick={handleListRoomClick}
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-10 rounded-lg transition-transform transform hover:scale-105 shadow-lg text-lg"
            >
              List Your Room
            </button>
          </Link>
        </div>
      </div>
      <RegisterModal open={isLoginModalOpen} handleClose={() => setIsLoginModalOpen(false)} />
      <Footer />
    </div>

  );
}
