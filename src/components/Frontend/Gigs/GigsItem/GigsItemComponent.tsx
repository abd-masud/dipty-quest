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

  if (loading || error || !gigData) {
    return (
      <main className="min-h-screen flex flex-col">
        <Media />
        <div className="sticky top-0 z-50">
          <Navigation />
        </div>
        <Breadcrumbs />
        <div className="flex-grow flex items-center justify-center">
          <Loader />
        </div>
        <Footer />
      </main>
    );
  }

  const slug = gigData.title.toLowerCase().replace(/\s+/g, "-");
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
        const isItemInCart = existingCart.some((item) => item.id == gigInfo.id);
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
    <main className="min-h-screen flex flex-col">
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image
                src={gigData.poster}
                className="object-cover w-full h-full"
                alt={gigData.title}
                height={600}
                width={1000}
                priority
              />
            </div>
            <div className="mt-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {gigData.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-gray-600 mt-3">
                <div className="flex items-center gap-2">
                  <Image
                    className="border rounded-full bg-gray-100"
                    src={company}
                    height={40}
                    width={40}
                    alt="company"
                  />
                  <span className="font-medium">{gigData.instructor}</span>
                </div>
                <GoDotFill className="text-xs" />
                <div className="flex items-center">
                  <FaRegCalendarAlt className="mr-1" /> {gigData.published}
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-8 mb-6">
                {["overview", "curriculum", "instructor", "reviews"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() =>
                        setActiveTab(
                          tab as
                            | "overview"
                            | "curriculum"
                            | "instructor"
                            | "reviews"
                        )
                      }
                      className={`font-semibold px-4 py-2 rounded-full text-sm transition-all duration-300
                      ${
                        activeTab == tab
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }
                    `}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  )
                )}
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border">
                {activeTab == "overview" && (
                  <div className="animate-fadeIn">
                    <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
                    <p className="text-gray-700 leading-relaxed">
                      {gigData.overview}
                    </p>
                  </div>
                )}
                {activeTab == "curriculum" && (
                  <div className="animate-fadeIn">
                    <h2 className="text-2xl font-bold mb-4">
                      Course Curriculum
                    </h2>
                    <div className="space-y-3">
                      {courses.map((course, index) => {
                        const isOpen = openCourses[course.title];
                        return (
                          <div
                            key={index}
                            className="border rounded-lg overflow-hidden"
                          >
                            <div
                              className="flex items-center justify-between bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                              onClick={() => toggleCourse(course.title)}
                            >
                              <h3 className="font-semibold">{course.title}</h3>
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
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 bg-gray-50">
                                <p className="text-gray-500 italic">
                                  Content coming soon
                                </p>
                              </div>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {activeTab == "instructor" && (
                  <div className="animate-fadeIn">
                    <h2 className="text-2xl font-bold mb-4">
                      Instructor Details
                    </h2>
                    <div className="flex items-center gap-3">
                      <Image
                        className="border rounded-full bg-gray-100"
                        src={company}
                        height={60}
                        width={60}
                        alt="company"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">
                          {gigData.instructor}
                        </h3>
                        <p className="text-gray-600">DiptyQuest Instructor</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab == "reviews" && (
                  <div className="animate-fadeIn">
                    <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center justify-center border rounded-lg p-6 shadow-sm w-full md:w-auto">
                        <h3 className="text-4xl font-bold mb-2">0.0</h3>
                        <div className="flex items-center text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <TiStarFullOutline key={i} />
                          ))}
                        </div>
                        <p className="text-gray-600">0 Ratings</p>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center mb-3">
                            <span className="text-gray-700 w-6">{star}</span>
                            <TiStarFullOutline className="text-yellow-400 mx-1" />
                            <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2 overflow-hidden">
                              <div
                                className="h-full bg-gray-300"
                                style={{ width: "0%" }}
                              ></div>
                            </div>
                            <span className="text-gray-600 text-sm">0</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="lg:w-1/4 lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3">
                  {gigData.price == 0 ? "Free" : `${gigData.price} BDT`}
                </h2>
                <button
                  onClick={handleEnrollClick}
                  className="font-semibold bg-[#FAB616] w-full px-5 py-2 mb-5 rounded-full text-[12px] text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#FAB616] transition-colors duration-300 flex items-center justify-center group"
                >
                  Enroll Now
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <h3 className="text-lg font-semibold mb-3">
                  Included in this course
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MdOutlineSignalCellularAlt />
                      <span>Level</span>
                    </div>
                    <div className="text-gray-500">{gigData.level}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 text-gray-700">
                      <FaRegClock />
                      <span>Duration</span>
                    </div>
                    <div className="text-gray-500">NA</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 text-gray-700">
                      <FiBook />
                      <span>Lessons</span>
                    </div>
                    <div className="text-gray-500">NA</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 text-gray-700">
                      <TbPuzzle />
                      <span>Quizzes</span>
                    </div>
                    <div className="text-gray-500">NA</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 text-gray-700">
                      <GrCertificate />
                      <span>Certifications</span>
                    </div>
                    <div className="text-gray-500">
                      {gigData.certifications}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 text-gray-700">
                      <IoLanguageSharp />
                      <span>Language</span>
                    </div>
                    <div className="text-gray-500">{gigData.language}</div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-medium mb-3">Share this course:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0A66C2] text-white hover:bg-[#0A55A0] transition-colors"
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        shareUrl
                      )}`}
                      target="_blank"
                      aria-label="Share on LinkedIn"
                    >
                      <FaLinkedinIn />
                    </Link>
                    <Link
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        shareUrl
                      )}&text=Check out this amazing course!`}
                      target="_blank"
                      aria-label="Share on Twitter"
                    >
                      <FaXTwitter />
                    </Link>
                    <Link
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0866FF] text-white hover:bg-[#0754D4] transition-colors"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareUrl
                      )}`}
                      target="_blank"
                      aria-label="Share on Facebook"
                    >
                      <LiaFacebookF />
                    </Link>
                    <Link
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E60023] text-white hover:bg-[#CC001F] transition-colors"
                      href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                        shareUrl
                      )}&description=Check%20out%20this%20course`}
                      target="_blank"
                      aria-label="Share on Pinterest"
                    >
                      <FaPinterestP />
                    </Link>
                    <motion.button
                      onClick={handleCopy}
                      className={`w-10 h-10 flex items-center justify-center rounded-full border ${
                        copied
                          ? "border-green-500 text-green-500"
                          : "border-gray-300 text-gray-600 hover:bg-gray-100"
                      } transition-colors`}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Copy link"
                    >
                      <FaRegCopy />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};
