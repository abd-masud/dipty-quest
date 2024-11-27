"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import featured from "../../../../public/images/featured.jpg";
import { TbBadges } from "react-icons/tb";
import { FaArrowRight, FaRegClock } from "react-icons/fa";

const categories = ["All", "Design", "Frontend", "Academic"];

const courseData = [
  {
    id: 1,
    title: "Data Science for Beginners",
    category: "Academic",
    price: "99 BDT",
    duration: "30h 10m",
    lessons: 1,
  },
  {
    id: 2,
    title: "Web Design Basics",
    category: "Design",
    price: "149 BDT",
    duration: "25h 45m",
    lessons: 2,
  },
  {
    id: 3,
    title: "Advanced Frontend Techniques",
    category: "Frontend",
    price: "199 BDT",
    duration: "40h 20m",
    lessons: 3,
  },
  {
    id: 4,
    title: "UI/UX Mastery",
    category: "Design",
    price: "249 BDT",
    duration: "50h",
    lessons: 4,
  },
  {
    id: 5,
    title: "Fullstack Development",
    category: "Frontend",
    price: "299 BDT",
    duration: "60h",
    lessons: 5,
  },
  {
    id: 6,
    title: "Data Science for Beginners",
    category: "Academic",
    price: "99 BDT",
    duration: "30h 10m",
    lessons: 1,
  },
];

export const Featured = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses =
    activeCategory === "All"
      ? courseData
      : courseData.filter((course) => course.category === activeCategory);

  return (
    <main className="bg-[#F5F6F7]">
      <div className="max-w-screen-xl mx-auto px-4 py-[50px]">
        <div className="md:grid block grid-cols-2 mb-5">
          <h2 className="md:text-[56px] text-[35px] text-[#222E48] font-semibold md:mb-0 mb-5">
            Find Your From The Featured Courses
          </h2>
          <div className="my-auto flex md:justify-end justify-between">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`md:px-5 px-4 py-2 md:mx-3 mx-1 md:text-[16px] text-[13px] rounded-full font-semibold border text-[#222E48] ${
                  activeCategory === category
                    ? "bg-[#FAB616] border-[#FAB616]"
                    : " border-[#222E48] hover:bg-[#FAB616] hover:border-[#FAB616] bg-white"
                } transition duration-300`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col gap-4 shadow-lg animate-fadeInGrow"
            >
              <div>
                <Image
                  className="rounded-lg"
                  src={featured}
                  alt={course.title}
                />
              </div>
              <Link
                className="text-[23px] text-[#222E48] hover:text-[#FAB616] font-bold transition duration-300"
                href={"/courses"}
              >
                {course.title}
              </Link>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <TbBadges />
                  {course.lessons} Lesson{course.lessons > 1 ? "s" : ""}
                </div>
                <div className="flex items-center gap-3">
                  <FaRegClock />
                  {course.duration}
                </div>
              </div>
              <div className="flex justify-between">
                <Link
                  className="border-b border-black hover:border-[#FAB616] hover:text-[#FAB616] transition-colors duration-150 font-bold flex items-center group w-fit"
                  href={"/courses"}
                >
                  Enroll Now
                  <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
                </Link>
                <div className="text-[#FAB616] font-bold">{course.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
