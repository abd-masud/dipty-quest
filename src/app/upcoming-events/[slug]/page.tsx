"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { EventItemComponent } from "@/components/Frontend/UpcomingEvents/EventItem/EventItemComponent";
import { Media } from "@/components/Frontend/Home/Media";
import { Navigation } from "@/components/Frontend/Navigation/Navigation";
import { Breadcrumbs } from "@/components/Frontend/UpcomingEvents/Breadcrumbs";
import Loader from "@/components/Loader";
import { Footer } from "@/components/Frontend/Footer/Footer";

export default function Event() {
  const pathname = usePathname();
  const [eventId, setEventId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const parts = pathname.split("-");
      const extractedId = parts[parts.length - 1];
      setEventId(extractedId);
    }
  }, [pathname]);

  if (!eventId)
    return (
      <main>
        <Media />
        <div className="sticky top-0 z-50">
          <Navigation />
        </div>
        <Breadcrumbs />
        <div className="overflow-hidden">
          <div className="-mt-52 -mb-52">
            <Loader />
          </div>
        </div>
        <Footer />
      </main>
    );

  return <EventItemComponent eventId={eventId} />;
}
