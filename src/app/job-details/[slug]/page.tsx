"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { JobDetailsInfo } from "@/components/Frontend/JobDetails/JobDetailsInfo";
import { Media } from "@/components/Frontend/Home/Media";
import { Navigation } from "@/components/Frontend/Navigation/Navigation";
import { Breadcrumbs } from "@/components/Frontend/FindAJob/Breadcrumbs";
import Loader from "@/components/Loader";
import { Footer } from "@/components/Frontend/Footer/Footer";

export default function JobDetailsDynamic() {
  const pathname = usePathname();
  const [jobId, setJobId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const parts = pathname.split("-");
      const extractedId = parts[parts.length - 1];
      setJobId(extractedId);
    }
  }, [pathname]);

  if (!jobId)
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

  return <JobDetailsInfo jobId={jobId} />;
}
