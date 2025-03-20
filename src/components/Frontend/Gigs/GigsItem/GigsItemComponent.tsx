"use client";

import { useEffect, useState } from "react";
import { Footer } from "../../Footer/Footer";
import { Media } from "../../Home/Media";
import { Breadcrumbs } from "./Breadcrumbs";
import { Navigation } from "../../Navigation/Navigation";
import Loader from "@/components/Loader";
import Link from "next/link";
import { FaArrowRight, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import {
  MdExpandLess,
  MdExpandMore,
  MdOutlineSignalCellularAlt,
} from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { FiBook } from "react-icons/fi";
import { TbPuzzle } from "react-icons/tb";
import { GrCertificate } from "react-icons/gr";
import { IoLanguageSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import company from "../../../../../public/images/logo.webp";
import { LiaFacebookF } from "react-icons/lia";
import { useRouter } from "next/navigation";

interface Gig {
  id: number;
  title: string;
  poster: string;
  overview: string;
  instructor: string;
  level: string;
  certifications: string;
  language: string;
  published: string;
  price: number;
}

interface GigsItemProps {
  gigId: string;
}

export const GigsItemComponent = ({ gigId }: GigsItemProps) => {
  const [gigData, setGigData] = useState<Gig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "curriculum" | "instructor" | "reviews"
  >("overview");
  const [openCourses, setOpenCourses] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const toggleCourse = (course: string) => {
    setOpenCourses((prev) => ({ ...prev, [course]: !prev[course] }));
  };

  const courses = [
    {
      title: "Coming Soon!",
      // episodes: [
      //   { title: "Episode 1", duration: "0h 30m" },
      //   { title: "Episode 2", duration: "0h 45m" },
      //   { title: "Episode 3", duration: "1h 10m" },
      //   { title: "Episode 1", duration: "0h 30m" },
      //   { title: "Episode 2", duration: "0h 45m" },
      //   { title: "Episode 3", duration: "1h 10m" },
      // ],
    },
  ];

  useEffect(() => {
    if (!gigId) return;

    const fetchGigData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/featured-gigs/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Gig-Id": gigId,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch gig data");
        }
        const data = await response.json();
        setGigData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchGigData();
  }, [gigId]);

  if (loading) {
    return (
      <main>
        <Media />
        <div className="sticky top-0 z-50">
          <Navigation />
        </div>
        <Breadcrumbs />
        <div className="overflow-hidden">
          <div className="-mt-52 -mb-52">
            <Loader />
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <Media />
        <div className="sticky top-0 z-50">
          <Navigation />
        </div>
        <Breadcrumbs />
        <div className="overflow-hidden">
          <div className="-mt-52 -mb-52">
            <Loader />
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!gigData) {
    return (
      <main>
        <Media />
        <div className="sticky top-0 z-50">
          <Navigation />
        </div>
        <Breadcrumbs />
        <div className="overflow-hidden">
          <div className="-mt-52 -mb-52">
            <Loader />
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const slug = gigData.title.toLowerCase().replace(/\s+/g, "-");
  // const gigUrl = `/gigs/${slug}-${gigData.id}`;

  const shareUrl = `https://diptyquest.com/gigs/${slug}-${
    gigData?.id || gigId
  }`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnrollClick = () => {
    if (gigData) {
      const gigInfo = {
        id: gigData.id,
        image: gigData.poster,
        title: gigData.title,
        price: gigData.price,
      };
      const existingCart = JSON.parse(
        localStorage.getItem("gigEnrollment") || "[]"
      );
      if (Array.isArray(existingCart)) {
        const isItemInCart = existingCart.some(
          (item) => item.id === gigInfo.id
        );
        if (!isItemInCart) {
          existingCart.push(gigInfo);
          localStorage.setItem("gigEnrollment", JSON.stringify(existingCart));
        }
      } else {
        localStorage.setItem("gigEnrollment", JSON.stringify([gigInfo]));
      }

      router.push("/cart");
    }
  };

  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Breadcrumbs />
      <div className="max-w-screen-xl mx-auto px-4 mt-10 grid grid-cols-4 gap-5">
        <div className="col-span-3 w-full">
          <Image
            src={gigData.poster}
            className="w-full mx-auto rounded-lg shadow-lg"
            alt={gigData.title}
            height={1000}
            width={1000}
          />
          <h1 className="text-[32px] font-bold mt-4">{gigData.title}</h1>
          <div className="flex items-center gap-2 text-gray-500">
            <div className="flex items-center gap-2">
              <Image
                className="border rounded-full bg-gray-100"
                src={company}
                height={40}
                width={40}
                alt="company"
              />
              By <span className="font-semibold">{gigData.instructor}</span>
            </div>
            <GoDotFill className="text-[12px]" />
            <div className="flex items-center">
              <FaRegCalendarAlt className="mr-1" /> {gigData.published}
            </div>
            {/* <GoDotFill className="text-[12px]" />
            <div className="flex items-center">
              <LuGraduationCap className="text-[24px] mr-1" /> 100 Students
            </div>
            <GoDotFill className="text-[12px]" />
            <div className="flex items-center">
              <TiStarOutline className="text-[20px] mr-1" /> 4.8 Ratings
            </div> */}
          </div>

          <div className="flex items-center gap-5 mt-10">
            {["overview", "curriculum", "instructor", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(
                    tab as "overview" | "curriculum" | "instructor" | "reviews"
                  )
                }
                className={`font-semibold px-5 py-2 rounded-full text-[12px] border-b-2 transition-all duration-300 flex items-center
                  ${
                    activeTab === tab
                      ? "bg-[#0E0C25] text-white border-[#FAB616]"
                      : "bg-[#FAB616] text-[#0E0C25] border-[#0E0C25] hover:bg-[#0E0C25] hover:text-white hover:border-[#FAB616]"
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-5 mt-5 mb-10 transition-all duration-500 border rounded-md shadow-lg">
            {activeTab === "overview" && (
              <div className="animate-fadeIn">
                <h2 className="text-[24px] font-bold mb-5">Course Overview</h2>
                <p className="text-gray-700">{gigData.overview}</p>
              </div>
            )}
            {activeTab === "curriculum" && (
              <div className="animate-fadeIn">
                <h2 className="text-[24px] font-bold mb-5">
                  Course Curriculum
                </h2>
                <div>
                  {courses.map((course, index) => {
                    const isOpen = openCourses[course.title];

                    return (
                      <div key={index} className="mb-4">
                        <div
                          className="flex items-center justify-between bg-gray-100 py-3 px-5 cursor-pointer rounded-lg"
                          onClick={() => toggleCourse(course.title)}
                        >
                          <h3 className="text-[20px] font-semibold">
                            {course.title}
                          </h3>
                          {isOpen ? (
                            <MdExpandLess size={24} />
                          ) : (
                            <MdExpandMore size={24} />
                          )}
                        </div>

                        <motion.div
                          initial={false}
                          animate={{
                            height: isOpen ? "auto" : 0,
                            opacity: isOpen ? 1 : 0,
                          }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          {/* <div className="mt-2">
                            {course.episodes.map((episode, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between bg-blue-50 py-3 px-5 mb-1 rounded-md"
                              >
                                <div className="flex items-center gap-3">
                                  <FaRegCirclePlay />
                                  <span>{episode.title}</span>
                                </div>
                                <div className="flex items-center justify-end gap-3">
                                  <span>{episode.duration}</span>
                                  <MdOutlineLock />
                                </div>
                              </div>
                            ))}
                          </div> */}
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {activeTab === "instructor" && (
              <div className="animate-fadeIn">
                <h2 className="text-[24px] font-bold mb-5">
                  Instructor Details
                </h2>
                <div className="flex items-center gap-2">
                  <Image
                    className="border rounded-full bg-gray-100"
                    src={company}
                    height={40}
                    width={40}
                    alt="company"
                  />
                  <span className="font-semibold">{gigData.instructor}</span>
                </div>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="animate-fadeIn">
                <h2 className="text-[24px] font-bold">Student Reviews</h2>
                <div className="mt-5">
                  <div className="flex">
                    <div className="flex flex-col items-center justify-center border shadow-lg px-10">
                      <h3 className="text-[40px] font-bold">0.0</h3>
                      <div className="flex items-center text-[#F8BC24]">
                        <TiStarFullOutline />
                        <TiStarFullOutline />
                        <TiStarFullOutline />
                        <TiStarFullOutline />
                        <TiStarFullOutline />
                      </div>
                      <p>0 Ratings</p>
                    </div>
                    <div className="flex-1 ml-6">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center mb-2">
                          <span className="text-gray-700 text-sm w-5">
                            {star}
                          </span>
                          <span className="text-yellow-400 text-lg">
                            <TiStarFullOutline />
                          </span>
                          <div className="w-full h-2 bg-gray-200 rounded-full mx-2"></div>
                          <span className="text-gray-600 text-sm">0</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="sticky top-[70px]">
          <div className="px-5 py-6 border shadow-lg">
            <h2 className="text-[32px] font-bold mb-2">
              {gigData.price == 0 ? "Free" : `${gigData.price} BDT`}
            </h2>

            <p className="text-[18px] font-semibold leading-tight">
              Included in this course
            </p>
            <div className="divide divide-y-2">
              <div className="flex justify-between py-3">
                <div className="flex items-center gap-2">
                  <MdOutlineSignalCellularAlt />
                  <span className="text-[#131226]">Level</span>
                </div>
                <div className="text-gray-500">{gigData.level}</div>
              </div>
              <div className="flex justify-between py-3">
                <div className="flex items-center gap-2">
                  <FaRegClock />
                  <span className="text-[#131226]">Duration</span>
                </div>
                <div className="text-gray-500">NA</div>
              </div>
              <div className="flex justify-between py-3">
                <div className="flex items-center gap-2">
                  <FiBook />
                  <span className="text-[#131226]">Lessons</span>
                </div>
                <div className="text-gray-500">NA</div>
              </div>
              <div className="flex justify-between py-3">
                <div className="flex items-center gap-2">
                  <TbPuzzle />
                  <span className="text-[#131226]">Quizzes</span>
                </div>
                <div className="text-gray-500">NA</div>
              </div>
              <div className="flex justify-between py-3">
                <div className="flex items-center gap-2">
                  <GrCertificate />
                  <span className="text-[#131226]">Certifications</span>
                </div>
                <div className="text-gray-500">{gigData.certifications}</div>
              </div>
              <div className="flex justify-between py-3">
                <div className="flex items-center gap-2">
                  <IoLanguageSharp />
                  <span className="text-[#131226]">Language</span>
                </div>
                <div className="text-gray-500">{gigData.language}</div>
              </div>
              <div className="py-3">
                Share this course:
                <div className="flex justify-between md:gap-4 mt-2">
                  <Link
                    className="text-white border rounded-full p-2 sm:text-[20px] text-[12px] bg-[#0A66C2] transition duration-300"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                  >
                    <span className="sr-only">Visit LinkedIn profile</span>
                    <FaLinkedinIn />
                  </Link>
                  <Link
                    className="text-white border rounded-full p-2 sm:text-[20px] text-[12px] bg-[#000000] transition duration-300"
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      shareUrl
                    )}&text=Check out this amazing course!`}
                    target="_blank"
                  >
                    <span className="sr-only">Visit Twitter profile</span>
                    <FaXTwitter />
                  </Link>
                  <Link
                    className="text-white border rounded-full p-2 sm:text-[20px] text-[12px] bg-[#0866FF]  transition duration-300"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                  >
                    <span className="sr-only">Visit Facebook profile</span>
                    <LiaFacebookF />
                  </Link>
                  <Link
                    className="text-white border rounded-full p-2 sm:text-[20px] text-[12px] bg-[#E60023] transition duration-300"
                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                      shareUrl
                    )}&description=Check%20out%20this%20course`}
                    target="_blank"
                  >
                    <span className="sr-only">Visit Pinterest profile</span>
                    <FaPinterestP />
                  </Link>
                  <motion.button
                    onClick={handleCopy}
                    className={`border rounded-full p-2 sm:text-[20px] text-[12px] transition duration-300 ${
                      copied
                        ? "text-green-500 border-green-500"
                        : "text-gray-500"
                    }`}
                    whileTap={{ scale: 1.2 }}
                    animate={{ color: copied ? "#16a34a" : "#6b7280" }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaRegCopy />
                  </motion.button>
                </div>
              </div>
              <div className="py-5">
                <button
                  onClick={handleEnrollClick}
                  className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[12px] text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#FAB616] transition-colors duration-300 flex items-center justify-center group"
                >
                  Enroll Now
                  <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-[10px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};
