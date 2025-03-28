"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import Warning from "../../../../../../public/images/warning.png";

interface Event {
  id: number;
  event: string;
  date: string;
  duration: number;
  time_begin: string;
  time_end: string;
  location: string;
}

export const AppliedEventsItems = () => {
  const router = useRouter();
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

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
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (!token) {
      router.push("/authentication/login");
      return;
    }

    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      setUserId(decodedPayload?.id || null);
    } catch {
      router.push("/authentication/login");
    }
  }, [router]);

  useEffect(() => {
    if (!userId) return;

    const fetchFilteredEvents = async () => {
      try {
        const formResponse = await fetch("/api/event-form");
        if (!formResponse.ok)
          throw new Error("Failed to fetch event-form data");
        const formData = await formResponse.json();

        const userEventIds = formData
          .filter((entry: { user_id: number }) => entry.user_id == userId)
          .map((entry: { event_id: number }) => entry.event_id);

        if (userEventIds.length == 0) {
          setLoading(false);
          return;
        }

        const eventsResponse = await fetch("/api/events");
        if (!eventsResponse.ok) throw new Error("Failed to fetch events");
        const allEvents = await eventsResponse.json();

        const filteredEvents = allEvents.filter((event: Event) =>
          userEventIds.includes(event.id)
        );

        setEventsData(filteredEvents);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredEvents();
  }, [userId]);

  if (loading) {
    return (
      <main>
        <div className="pb-10">
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
            <div className="flex flex-col gap-4">
              <div className="w-full sm:h-[145px] h-[305px] bg-white rounded-xl border hover:border-[#FAB616] shadow-lg transition duration-300"></div>
              <div className="w-full sm:h-[145px] h-[305px] bg-white rounded-xl border hover:border-[#FAB616] shadow-lg transition duration-300"></div>
              <div className="w-full sm:h-[145px] h-[305px] bg-white rounded-xl border hover:border-[#FAB616] shadow-lg transition duration-300"></div>
              <div className="w-full sm:h-[145px] h-[305px] bg-white rounded-xl border hover:border-[#FAB616] shadow-lg transition duration-300"></div>
              <div className="w-full sm:h-[145px] h-[305px] bg-white rounded-xl border hover:border-[#FAB616] shadow-lg transition duration-300"></div>
              <div className="w-full sm:h-[145px] h-[305px] bg-white rounded-xl border hover:border-[#FAB616] shadow-lg transition duration-300"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || eventsData.length == 0) {
    return (
      <main>
        <div className="mb-10">
          <h2 className="col-span-2 md:text-[56px] sm:text-[35px] text-[28px] text-[#131226] font-semibold leading-tight md:mb-0 mb-2">
            Join Our Upcoming Events
          </h2>
          <p className="text-[#222E48] font-semibold leading-snug text-justify">
            Join us for a variety of exciting events that cater to your
            interests and learning needs. Our events are designed to inspire and
            educate.
          </p>
        </div>
        <div className="pb-20 h-[calc(100vh-320px)] flex items-center justify-center">
          <div className="col-span-2 flex flex-col justify-between md:mb-0 mb-5">
            <div className="flex flex-col items-center justify-center">
              <Image height={200} width={200} src={Warning} alt="Warning" />
              <p>You haven&apos;t applied for any events</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="pb-10">
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
          <div className="flex flex-col gap-4">
            {eventsData.length > 0 ? (
              eventsData.map((event) => {
                const { day, monthYear } = formatDate(event.date);
                const timeBegin = formatTime(event.time_begin);
                const timeEnd = formatTime(event.time_end);

                const slug = event.event.toLowerCase().replace(/\s+/g, "-");
                const eventUrl = `/upcoming-events/${slug}-${event.id}`;
                return (
                  <div
                    key={event.id}
                    className="md:flex block items-center py-5 md:px-8 px-5 bg-white rounded-xl border hover:border-[#FAB616] shadow-lg transition duration-300"
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
                        href={eventUrl}
                        className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#FAB616] transition-colors duration-300 flex items-center justify-center group"
                      >
                        <span>Applied</span>
                        <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No events found.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
