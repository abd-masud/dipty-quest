"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "@/components/Loader";
import { ViewApplicantsCards } from "@/components/Frontend/UserPanel/Employer/ViewApplicants/ViewApplicantsTable";

export default function ViewApplicants() {
  const pathname = usePathname();
  const [jobId, setJobId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const parts = pathname.split("/");
      const extractedId = parts[parts.length - 1];
      setJobId(extractedId);
    }
  }, [pathname]);

  if (!jobId)
    return (
      <main className="overflow-hidden -mt-[70px]">
        <Loader />
      </main>
    );

  return <ViewApplicantsCards jobId={jobId} />;
}
