"use client";

import { EventItemComponent } from "@/components/Frontend/UpcomingEvents/EventItem/EventItemComponent";
import { useParams } from "next/navigation";

export default function Event() {
  const { id } = useParams();

  const eventId = Array.isArray(id) ? id[0] : id;

  if (!eventId) return <div>Event not found</div>;

  return <EventItemComponent eventId={eventId} />;
}
