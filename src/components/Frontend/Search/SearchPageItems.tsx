"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { FaArrowRight, FaGraduationCap, FaRegClock } from "react-icons/fa";
import { FaLocationDot, FaUserGroup } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdBusinessCenter } from "react-icons/md";
import { PiClockClockwiseBold } from "react-icons/pi";

interface SearchResult {
  gig?: Gig;
  event?: Event;
  category?: Category;
  jobDetails?: JobDetails;
}

interface Gig {
  id: number;
  poster: string;
  title: string;
  overview: string;
  price: number;
}

interface Event {
  id: number;
  event: string;
  date: string;
  duration: number;
  time_begin: string;
  time_end: string;
  location: string;
}

interface Category {
  id: number;
  icon: string;
  title: string;
  content: string;
  file: string;
}

interface JobDetails {
  id: number;
  company: string;
  jobTitle: string;
  department: string;
  companyLogo: string;
  industry: string;
  numberOfVacancy: number;
  salary: string;
  currency: string;
  salaryType: string;
  jobType: string;
  preferredEducation: string;
  district: string;
  jobDeadline: string;
  publication: string;
}

export const SearchPageItems = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filters, setFilters] = useState({
    all: true,
    jobs: true,
    gigs: true,
    categories: true,
    events: true,
  });

  const fetchResults = useCallback(async () => {
    try {
      const endpoints = {
        jobs: "/api/job-app",
        gigs: "/api/gigs",
        categories: "/api/categories",
        events: "/api/events",
      };

      const activeFilters = Object.keys(filters).filter(
        (key) =>
          filters[key as keyof typeof filters] &&
          key !== "all" &&
          key in endpoints
      );

      const requests = activeFilters.map((key) =>
        fetch(endpoints[key as keyof typeof endpoints])
          .then((res) => res.json())
          .catch((err) => {
            console.error(`Error fetching data from ${key}:`, err);
            return [];
          })
      );

      const responses = await Promise.all(requests);

      let combinedResults = responses.flat();

      const finalResults = combinedResults.map((item) => {
        if (item.jobTitle) {
          return { jobDetails: item };
        }
        if (item.event) {
          return { event: item };
        }
        if (item.title && item.overview) {
          return { gig: item };
        }
        if (item.title) {
          return { category: item };
        }
        return {};
      });

      if (query) {
        combinedResults = combinedResults.filter((item) => {
          return (
            (item.title && item.title.toLowerCase().includes(query)) ||
            (item.jobTitle && item.jobTitle.toLowerCase().includes(query)) ||
            (item.company && item.company.toLowerCase().includes(query)) ||
            (item.event && item.event.toLowerCase().includes(query))
          );
        });
      }

      setResults(finalResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [filters, query]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const handleFilterChange = (filter: keyof typeof filters) => {
    setFilters((prev) => {
      if (filter === "all") {
        const newState = !prev.all;
        return {
          all: newState,
          jobs: newState,
          gigs: newState,
          categories: newState,
          events: newState,
        };
      }

      const updatedFilters = { ...prev, [filter]: !prev[filter] };
      updatedFilters.all =
        updatedFilters.gigs &&
        updatedFilters.jobs &&
        updatedFilters.categories &&
        updatedFilters.events;
      return updatedFilters;
    });
  };

  const handleEnrollClick = (gigs: Gig) => {
    const gigInfo = {
      id: gigs.id,
      image: gigs.poster,
      title: gigs.title,
      overview: gigs.overview,
      price: gigs.price,
    };
    const existingCart = JSON.parse(
      localStorage.getItem("gigEnrollment") || "[]"
    );
    if (Array.isArray(existingCart)) {
      const isItemInCart = existingCart.some((item) => item.id === gigInfo.id);
      if (!isItemInCart) {
        existingCart.push(gigInfo);
        localStorage.setItem("gigEnrollment", JSON.stringify(existingCart));
      }
    } else {
      localStorage.setItem("gigEnrollment", JSON.stringify([gigInfo]));
    }
  };

  const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, "0");
    const monthYear = formattedDate.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "short",
    });

    return { day, monthYear };
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time?.split(":").map(Number);
    const formattedTime = new Date(0, 0, 0, hour, minute);
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return formattedTime.toLocaleTimeString("en-US", options).toLowerCase();
  };

  return (
    <div className="max-w-screen-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-5 pb-1 border-b">
        Search Results for &quot;{query}&quot;
      </h2>

      <div className="sm:flex block w-full gap-5">
        <div className="mb-5">
          <div className="bg-gray-100 border shadow-lg p-5 sm:w-44 w-full">
            <form>
              <span className="block font-semibold mb-2">Search Criteria</span>
              {["all", "jobs", "gigs", "categories", "events"].map((key) => (
                <div key={key} className="flex items-center gap-3 mb-1">
                  <input
                    id={key}
                    type="checkbox"
                    checked={filters[key as keyof typeof filters]}
                    onChange={() =>
                      handleFilterChange(key as keyof typeof filters)
                    }
                  />
                  <label htmlFor={key} className="capitalize text-[14px]">
                    {key}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>

        <div className="w-full">
          {results.length > 0 ? (
            <div className="space-y-5">
              {results.map((result, index) => {
                if (result.jobDetails) {
                  const slug = result.jobDetails.jobTitle
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  const jobUrl = `/job-details/${slug}-${result.jobDetails.id}`;
                  return (
                    <div
                      key={index}
                      className="border bg-gray-100 divide-y-2 shadow-lg transition duration-300"
                    >
                      {result.jobDetails && (
                        <div className="col-span-1">
                          <div className="p-5">
                            <div className="flex justify-between">
                              <div className="w-full">
                                <h2 className="font-bold text-[20px] truncate overflow-hidden whitespace-nowrap">
                                  {result.jobDetails.jobTitle}
                                </h2>
                                <p className="text-gray-600 truncate overflow-hidden whitespace-nowrap">
                                  {result.jobDetails.company}
                                </p>
                              </div>
                              {result.jobDetails?.companyLogo && (
                                <div className="h-8 flex-shrink-0 md:block hidden">
                                  <Image
                                    src={result.jobDetails.companyLogo}
                                    alt={result.jobDetails.company}
                                    width={150}
                                    height={150}
                                    className="h-16 w-auto"
                                  />
                                </div>
                              )}
                            </div>
                            <p className="my-5">
                              {result.jobDetails.salary === "Negotiable"
                                ? "Salary: Negotiable"
                                : `Salary: ${result.jobDetails.salary} ${
                                    result.jobDetails.currency
                                  }/${result.jobDetails.salaryType.slice(
                                    0,
                                    -2
                                  )}`}
                            </p>
                            <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                              <div
                                title={`Vacancy: ${result.jobDetails.numberOfVacancy}`}
                                className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-blue-600"
                              >
                                <FaUserGroup className="text-[14px]" />
                                <span className="text-[14px] truncate">
                                  Vacancy: {result.jobDetails.numberOfVacancy}
                                </span>
                              </div>
                              <div
                                title={result.jobDetails.jobType}
                                className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-green-600"
                              >
                                <MdBusinessCenter className="text-[14px]" />
                                <span className="text-[14px] truncate">
                                  {result.jobDetails.jobType}
                                </span>
                              </div>
                              <div
                                title={result.jobDetails.preferredEducation}
                                className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-purple-600"
                              >
                                <FaGraduationCap className="text-[14px]" />
                                <span className="text-[14px] truncate">
                                  {result.jobDetails.preferredEducation}
                                </span>
                              </div>
                              <div
                                title={result.jobDetails.district}
                                className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-orange-600"
                              >
                                <FaLocationDot className="text-[14px]" />
                                <span className="text-[14px] truncate">
                                  {result.jobDetails.district}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-2 grid-cols-1 p-5 gap-3">
                            <div className="flex items-center font-bold text-[14px]">
                              <PiClockClockwiseBold className="mr-2 text-[20px]" />
                              Deadline:
                              <span className="text-red-500 ml-1">
                                {result.jobDetails.jobDeadline}
                              </span>
                            </div>
                            <div className="text-[12px] font-bold flex justify-end">
                              <Link
                                href={jobUrl}
                                className="border-b-2 hover:border-[#131226] hover:bg-[#FAB616] hover:text-[#131226] border-[#FAB616] text-white bg-[#131226] py-2 w-32 flex justify-center items-center rounded-full transition duration-300"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (result.gig) {
                  const slug = result.gig.title
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  const gigUrl = `/gigs/${slug}-${result.gig.id}`;
                  return (
                    <div
                      key={index}
                      className="p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col gap-4 group shadow-lg animate-fadeInGrow"
                    >
                      {result.gig && (
                        <div className="sm:col-span-2 lg:col-span-2">
                          <div className="overflow-hidden rounded-lg border hover:border-[#FAB616] transition duration-300 relative">
                            <Link href={gigUrl}>
                              <Image
                                className="w-full group-hover:scale-105 transition duration-300 "
                                src={result.gig.poster}
                                alt={result.gig.title}
                                width={500}
                                height={300}
                                priority
                              />
                              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-y-full transition-all duration-700 ease-in-out rotate-[-45deg]"></div>
                            </Link>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-[23px] text-[#222E48] font-bold leading-tight line-clamp-1 text-ellipsis overflow-hidden">
                              {result.gig.title}
                            </p>
                            <p className="line-clamp-2 text-ellipsis overflow-hidden">
                              {result.gig.overview}
                            </p>
                          </div>
                          <div className="flex justify-between items-center mt-auto">
                            <button
                              onClick={() =>
                                result.gig && handleEnrollClick(result.gig)
                              }
                              className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[12px] text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#FAB616] transition-colors duration-300 flex items-center group"
                            >
                              Enroll Now
                              <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
                            </button>
                            <div className="text-[#222E48] font-bold">
                              {result.gig.price == 0
                                ? "Free"
                                : `${result.gig.price} BDT`}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (result.category) {
                  const slug = result.category.title
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  const categoryUrl = `/categories/${slug}-${result.category.id}`;
                  return (
                    <div
                      key={index}
                      className="border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg flex flex-col gap-4 justify-between items-center group sm:py-10 py-7 px-2"
                    >
                      {result.category && result.category.title && (
                        <div className="sm:col-span-2 lg:col-span-3">
                          <div className="p-5 text-[30px] bg-white border group-hover:border-[#FAB616] rounded-full transition duration-300">
                            <Image
                              className="h-10 w-10"
                              src={result.category.icon}
                              alt={result.category.title}
                              width={40}
                              height={40}
                            />
                          </div>
                          <h3 className="text-[#0F0D26] text-lg font-bold text-center">
                            {result.category.title}
                          </h3>
                          <Link
                            href={categoryUrl}
                            className="text-[#0F0D26] text-sm border px-5 py-2 rounded-full bg-white group-hover:bg-[#FAB616] flex items-center transition duration-300"
                          >
                            Apply
                            <FaArrowRight className="ml-1 text-sm" />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }

                if (result.event) {
                  const { id, event, date, time_begin, time_end } =
                    result?.event;
                  const { day, monthYear } = formatDate(date);
                  const timeBegin = formatTime(time_begin);
                  const timeEnd = formatTime(time_end);
                  const slug = event.toLowerCase().replace(/\s+/g, "-");
                  const eventUrl = `/upcoming-events/${slug}-${id}`;
                  return (
                    <div key={index} className="col-span-1">
                      {result.event && (
                        <div className="md:flex block items-center py-5 md:px-8 px-5 bg-[#F5F6F7] rounded-xl border hover:border-[#FAB616] shadow-lg transition duration-300">
                          <div className="min-w-20">
                            <p className="text-[#3D3D3D] font-semibold md:block flex items-end">
                              <span className="md:text-[28px] text-[20px] text-[#0E0C25] block">
                                {day}
                              </span>
                              <span className="lg:text-[16px] md:text-[28px] text-[20px] lg:ml-0 ml-2">
                                {monthYear}
                              </span>
                            </p>
                          </div>
                          <div className="text-[#222E48] w-full md:my-auto my-3 md:border-x-[1px] border-x-0 border-y-[1px] md:border-y-0 border-gray-400 border-dashed md:px-8 py-3">
                            <div className="lg:flex md:block sm:flex block items-center lg:mb-0 mb-3">
                              <div className="flex items-center mr-10">
                                <FaRegClock className="mr-2 h-[14px]" />
                                {timeBegin} to {timeEnd}
                              </div>
                              <div className="flex items-center">
                                <IoLocationOutline className="mr-2 h-4" />
                                {result.event.location}
                              </div>
                            </div>
                            <p className="text-[23px] font-semibold">
                              {result.event.event}
                            </p>
                            <p className="text-[14px]">
                              <span className="font-bold">Event Duration:</span>{" "}
                              {result.event.duration}{" "}
                              {result.event.duration > 1 ? "days" : "day"}
                            </p>
                          </div>
                          <div className="min-w-36 md:ml-5 ml-0">
                            <Link
                              href={eventUrl}
                              className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#FAB616] transition-colors duration-300 flex items-center justify-center group"
                            >
                              <span>Join Now</span>
                              <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            <p className="text-gray-500 mb-10 text-center w-full">
              No results found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
