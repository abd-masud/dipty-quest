"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight, FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

interface Event {
  id: number;
  event: string;
  date: string;
  duration: number;
  time_begin: string;
  time_end: string;
  location: string;
}

export const UpcomingEventsInfo = () => {
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    const [hour, minute] = time.split(":").map(Number);
    const formattedTime = new Date(0, 0, 0, hour, minute);
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return formattedTime.toLocaleTimeString("en-US", options).toLowerCase();
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEventsData(data);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <main>
        <div className="max-w-screen-xl mx-auto px-4 md:py-[50px] py-10">
          <div className="col-span-2 flex flex-col justify-between md:mb-0 mb-5">
            <div className="mb-10">
              <h2 className="col-span-2 md:text-[56px] sm:text-[35px] text-[28px] text-[#131226] font-semibold leading-tight md:mb-0 mb-2">
                Join Our Upcoming Events
              </h2>
              <p className="text-[#222E48] text-[18px] font-semibold text-justify">
                Join us for a variety of exciting events that cater to your
                interests and learning needs. Our events are designed to inspire
                and educate.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="w-full sm:h-[125px] h-[305px] bg-[#F5F6F7] rounded-xl border hover:border-[#FAB616] shadow-lg transition duration-300"></div>
              <div className="w-full sm:h-[125px] h-[305px] bg-[#F5F6F7] rounded-xl border hover:border-[#FAB616] shadow-lg transition duration-300"></div>
              <div className="w-full sm:h-[125px] h-[305px] bg-[#F5F6F7] rounded-xl border hover:border-[#FAB616] shadow-lg transition duration-300"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="max-w-screen-xl mx-auto px-4 md:py-[50px] py-10">
          <div className="col-span-2 flex flex-col justify-between md:mb-0 mb-5">
            <div className="mb-10">
              <h2 className="col-span-2 md:text-[56px] sm:text-[35px] text-[28px] text-[#131226] font-semibold leading-tight md:mb-0 mb-2">
                Join Our Upcoming Events
              </h2>
              <p className="text-[#222E48] text-[18px] font-semibold text-justify">
                Join us for a variety of exciting events that cater to your
                interests and learning needs. Our events are designed to inspire
                and educate.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="w-full sm:h-[125px] h-[305px] bg-[#F5F6F7] rounded-xl border hover:border-[#FAB616] shadow-lg transition duration-300"></div>
              <div className="w-full sm:h-[125px] h-[305px] bg-[#F5F6F7] rounded-xl border hover:border-[#FAB616] shadow-lg transition duration-300"></div>
              <div className="w-full sm:h-[125px] h-[305px] bg-[#F5F6F7] rounded-xl border hover:border-[#FAB616] shadow-lg transition duration-300"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 md:py-[50px] py-10">
        <div className="col-span-2 flex flex-col justify-between md:mb-0 mb-5">
          <div className="mb-10">
            <h2 className="col-span-2 md:text-[56px] sm:text-[35px] text-[28px] text-[#131226] font-semibold leading-tight md:mb-0 mb-2">
              Join Our Upcoming Events
            </h2>
            <p className="text-[#222E48] font-semibold leading-snug text-justify">
              Join us for a variety of exciting events that cater to your
              interests and learning needs. Our events are designed to inspire
              and educate.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {eventsData.map((event) => {
              const { day, monthYear } = formatDate(event.date);
              const timeBegin = formatTime(event.time_begin);
              const timeEnd = formatTime(event.time_end);
              return (
                <div
                  key={event.id}
                  className="md:flex block items-center py-5 md:px-8 px-5 bg-[#F5F6F7] rounded-xl border hover:border-[#FAB616] shadow-lg transition duration-300"
                >
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
                        {event.location}
                      </div>
                    </div>
                    <p className="text-[23px] font-semibold">{event.event}</p>
                    <p className="text-[14px]">
                      <span className="font-bold">Event Duration:</span>{" "}
                      {event.duration} {event.duration > 1 ? "days" : "day"}
                    </p>
                  </div>
                  <div className="min-w-36 md:ml-5 ml-0">
                    <Link
                      className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#FAB616] transition-colors duration-300 flex items-center justify-center group"
                      href={`/upcoming-events/${event.id}`}
                    >
                      <span>Join Now</span>
                      <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};
