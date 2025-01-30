"use client";

import { JobDetailsInfo } from "@/components/Frontend/JobDetails/JobDetailsInfo";
import { useParams } from "next/navigation";

export default function JobDetailsDynamic() {
  const { id } = useParams();

  const jobId = Array.isArray(id) ? id[0] : id;

  if (!jobId) return <div>Job not found</div>;

  return <JobDetailsInfo jobId={jobId} />;
}
