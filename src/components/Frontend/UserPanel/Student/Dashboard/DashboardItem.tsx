"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdHotelClass } from "react-icons/md";
import { BiSolidCalendarEvent, BiSolidCategoryAlt } from "react-icons/bi";
import { HiDocumentSearch } from "react-icons/hi";
import Link from "next/link";

export const DashboardItem = () => {
  const [featuredGigsCount, setFeaturedGigsCount] = useState<number>(0);
  const [upcomingEventsCount, setUpcomingEventsCount] = useState<number>(0);
  const [jobApplicationsCount, setJobApplicationsCount] = useState<number>(0);
  const [categoriesCount, setCategoriesCount] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (!token) {
      router.push("/authentication/login");
      return;
    }

    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      fetchData(decodedPayload.id);
    } catch {
      router.push("/authentication/login");
    }
  }, [router]);

  const fetchData = async (userId: any) => {
    try {
      const fetchData = async (url: string) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}`);
        const data = await response.json();
        return Array.isArray(data) ? data : [];
      };

      const [gigsData, eventsData, jobsData, categoriesData] =
        await Promise.all([
          fetchData("/api/gigs-cart"),
          fetchData("/api/event-form"),
          fetchData("/api/job-form"),
          fetchData("/api/shared-plans"),
        ]);

      setFeaturedGigsCount(
        gigsData.filter((gig) => gig.user_id == userId).length
      );
      setUpcomingEventsCount(
        eventsData.filter((event) => event.user_id == userId).length
      );
      setJobApplicationsCount(
        jobsData.filter((job) => job.user_id == userId).length
      );
      setCategoriesCount(
        categoriesData.filter((category) => category.user_id == userId).length
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-5">
        <Link
          className="flex items-center bg-white rounded-lg border-b-2 border-black py-3"
          href={"/user-panel/student/gigs"}
        >
          <MdHotelClass className="ml-[21px] text-[16px] text-[#131226] mr-3 bg-[#FBB614] border-b-2 border-black h-14 w-14 p-3 rounded-lg -mt-1" />
          <div className="flex flex-col">
            <span className="text-gray-400">Featured Gigs</span>
            <span className="text-[24px] font-bold">{featuredGigsCount}</span>
          </div>
        </Link>
        <Link
          className="flex items-center bg-white rounded-lg border-b-2 border-black py-3"
          href={"/user-panel/student/events"}
        >
          <BiSolidCalendarEvent className="ml-[21px] text-[16px] text-[#131226] mr-3 bg-[#FBB614] border-b-2 border-black h-14 w-14 p-3 rounded-lg -mt-1" />
          <div className="flex flex-col">
            <span className="text-gray-400">Upcoming Events</span>
            <span className="text-[24px] font-bold">{upcomingEventsCount}</span>
          </div>
        </Link>
        <Link
          className="flex items-center bg-white rounded-lg border-b-2 border-black py-3"
          href={"/user-panel/student/jobs"}
        >
          <HiDocumentSearch className="ml-[21px] text-[16px] text-[#131226] mr-3 bg-[#FBB614] border-b-2 border-black h-14 w-14 p-3 rounded-lg -mt-1" />
          <div className="flex flex-col">
            <span className="text-gray-400">Job Applications</span>
            <span className="text-[24px] font-bold">
              {jobApplicationsCount}
            </span>
          </div>
        </Link>
        <Link
          className="flex items-center bg-white rounded-lg border-b-2 border-black py-3"
          href={"/user-panel/student/categories"}
        >
          <BiSolidCategoryAlt className="ml-[21px] text-[16px] text-[#131226] mr-3 bg-[#FBB614] border-b-2 border-black h-14 w-14 p-3 rounded-lg -mt-1" />
          <div className="flex flex-col">
            <span className="text-gray-400">Categories</span>
            <span className="text-[24px] font-bold">{categoriesCount}</span>
          </div>
        </Link>
      </div>
    </main>
  );
};
