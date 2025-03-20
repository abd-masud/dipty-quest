"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { GigsItemComponent } from "@/components/Frontend/Gigs/GigsItem/GigsItemComponent";
import { Media } from "@/components/Frontend/Home/Media";
import { Navigation } from "@/components/Frontend/Navigation/Navigation";
import { Footer } from "@/components/Frontend/Footer/Footer";
import Loader from "@/components/Loader";
import { Breadcrumbs } from "@/components/Frontend/Gigs/GigsItem/Breadcrumbs";

export default function Gigs() {
  const pathname = usePathname();
  const [gigId, setGigId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const parts = pathname.split("-");
      const extractedId = parts[parts.length - 1];
      setGigId(extractedId);
    }
  }, [pathname]);

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
