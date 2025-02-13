"use client";

import { useEffect, useState } from "react";
import { GigsItemComponent } from "@/components/Frontend/Gigs/GigsItem/GigsItemComponent";
import { Media } from "@/components/Frontend/Home/Media";
import { Navigation } from "@/components/Frontend/Navigation/Navigation";
import { Breadcrumbs } from "@/components/Frontend/Gigs/Breadcrumbs";
import { Footer } from "@/components/Frontend/Footer/Footer";
import Loader from "@/components/Loader";

export default function Gigs() {
  const [gigId, setGigId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("gigId");
    if (storedId) {
      setGigId(storedId);
    }
  }, []);

  if (!gigId)
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

  return <GigsItemComponent gigId={gigId} />;
}
