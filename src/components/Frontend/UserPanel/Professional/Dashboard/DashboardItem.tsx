"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdHotelClass } from "react-icons/md";
import { BiSolidCalendarEvent, BiSolidCategoryAlt } from "react-icons/bi";
import { HiDocumentSearch } from "react-icons/hi";
import Link from "next/link";

interface JwtPayload {
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  photo: string;
  file: string;
}

export const DashboardItem = () => {
  const [, setFormData] = useState<Partial<JwtPayload>>({});
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
      setFormData({
        id: decodedPayload.id,
        name: decodedPayload?.name,
        last_name: decodedPayload?.last_name,
        email: decodedPayload?.email,
        phone: decodedPayload?.phone,
        photo: decodedPayload?.photo,
        file: decodedPayload?.file,
      });

      fetchData(decodedPayload.id);
    } catch {
      router.push("/authentication/login");
    }
  }, [router]);

  const fetchData = async (userId: number) => {
    try {
      const gigsResponse = await fetch("/api/gigs-cart");
      const gigsData = await gigsResponse.json();
      const gigsCount = gigsData.filter(
        (gig: any) => gig.user_id === userId
      ).length;
      setFeaturedGigsCount(gigsCount);

      const eventsResponse = await fetch("/api/event-form");
      const eventsData = await eventsResponse.json();
      const eventsCount = eventsData.filter(
        (event: any) => event.user_id === userId
      ).length;
      setUpcomingEventsCount(eventsCount);

      const jobsResponse = await fetch("/api/job-form");
      const jobsData = await jobsResponse.json();
      const jobsCount = jobsData.filter(
        (job: any) => job.user_id === userId
      ).length;
      setJobApplicationsCount(jobsCount);

      const categoriesResponse = await fetch("/api/shared-plans");
      const categoriesData = await categoriesResponse.json();
      const categoriesCount = categoriesData.filter(
        (category: any) => category.user_id === userId
      ).length;
      setCategoriesCount(categoriesCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-5">
        <Link
          className="flex items-center bg-white rounded-lg border-b-2 border-black py-3"
          href={"/user-panel/professional/gigs"}
        >
          <MdHotelClass className="ml-[21px] text-[16px] text-[#131226] mr-3 bg-[#FBB614] border-b-2 border-black h-14 w-14 p-3 rounded-lg -mt-1" />
          <div className="flex flex-col">
            <span className="text-gray-400">Featured Gigs</span>
            <span className="text-[24px] font-bold">{featuredGigsCount}</span>
          </div>
        </Link>
        <Link
          className="flex items-center bg-white rounded-lg border-b-2 border-black py-3"
          href={"/user-panel/professional/events"}
        >
          <BiSolidCalendarEvent className="ml-[21px] text-[16px] text-[#131226] mr-3 bg-[#FBB614] border-b-2 border-black h-14 w-14 p-3 rounded-lg -mt-1" />
          <div className="flex flex-col">
            <span className="text-gray-400">Upcoming Events</span>
            <span className="text-[24px] font-bold">{upcomingEventsCount}</span>
          </div>
        </Link>
        <Link
          className="flex items-center bg-white rounded-lg border-b-2 border-black py-3"
          href={"/user-panel/professional/jobs"}
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
          href={"/user-panel/professional/categories"}
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
