"use client";

import { useEffect, useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { CandidatesTable } from "./CandidatesTable";

interface DataType {
  key: string;
  id: number;
  event: string;
  date: string;
  duration: number;
  time_begin: string;
  time_end: string;
  location: string;
  registered: number;
}

const formatDate = (date: string): string => {
  const formattedDate = new Date(date);
  const day = String(formattedDate.getDate()).padStart(2, "0");
  const month = formattedDate.toLocaleString("en-US", { month: "short" });
  const year = formattedDate.getFullYear();
  return `${day} ${month} ${year}`;
};

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "pm" : "am";
  const formattedHours = String(hours % 12 || 12).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes} ${period}`;
};

export const CandidatesPage = () => {
  const [eventsData, setEventsData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const events = await response.json();

      const mappedData: DataType[] = events.map((event: DataType) => ({
        key: event.id.toString(),
        id: event.id,
        event: event.event,
        date: formatDate(event.date),
        duration: event.duration,
        time_begin: formatTime(event.time_begin),
        time_end: formatTime(event.time_end),
        location: event.location,
      }));

      setEventsData(mappedData);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb fetchEvents={fetchEvents} />
      <CandidatesTable
        events={eventsData}
        fetchEvents={fetchEvents}
        loading={loading}
      />
    </main>
  );
};
