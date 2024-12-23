"use client";

import { useEffect, useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { EventsRegisteredTable } from "./EventsRegisteredTable";

interface DataType {
  key: string;
  id: number;
  event_id: number;
  event_name: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
}

export const EventsRegisteredPage = () => {
  const [eventsData, setEventsData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/event-form");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const events = await response.json();

      const mappedData: DataType[] = events.map((event: DataType) => ({
        key: event.id.toString(),
        id: event.id,
        event_name: event.event_name,
        name: event.name,
        email: event.email,
        phone: event.phone,
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
      <EventsRegisteredTable
        events={eventsData}
        loading={loading}
        fetchEvents={fetchEvents}
      />
    </main>
  );
};
