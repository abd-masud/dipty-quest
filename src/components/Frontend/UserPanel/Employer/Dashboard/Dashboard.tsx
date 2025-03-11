"use client";

import { useCallback, useEffect, useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { DashboardItem } from "./DashboardItem";

interface DataType {
  key: string;
  id: number;
  employerId: number;
  jobTitle: string;
  jobDeadline?: string;
  newApplied: number;
  appliedCount: number;
  status: string;
  publication: string;
  applicants: string[];
}

const parseDate = (dateStr: string): Date => {
  const dateParts = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1").split(" ");
  const [day, month, year] = dateParts;
  const formattedDate = `${month} ${day}, ${year}`;
  return new Date(formattedDate);
};

export const EmployerPanel = () => {
  const [jobsData, setJobsData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        setUserId(decodedPayload.id);
      } catch (error) {
        console.error("Error decoding JWT token", error);
      }
    }
  }, []);

  const fetchJobs = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const jobResponse = await fetch("/api/job-app");
      if (!jobResponse.ok) throw new Error("Failed to fetch job applications");

      const jobs = await jobResponse.json();
      const filteredJobs = jobs.filter(
        (job: any) => Number(job.employerId) === Number(userId)
      );

      const jobFormResponse = await fetch("/api/job-form");
      if (!jobFormResponse.ok) throw new Error("Failed to fetch job forms");

      const jobForms = await jobFormResponse.json();

      const jobCountMap: Record<number, number> = {};
      const newAppliedCountMap: Record<number, number> = {};
      const applicantMap: Record<number, any[]> = {};

      const today = new Date();

      jobForms.forEach((form: any) => {
        const jobId = Number(form.job_id);
        const applyDate = parseDate(form.apply_date);

        jobCountMap[jobId] = (jobCountMap[jobId] || 0) + 1;
        applicantMap[jobId] = applicantMap[jobId] || [];
        applicantMap[jobId].push({
          userId: form.user_id,
          name: form.name,
          lastName: form.last_name,
          email: form.email,
          phone: form.phone,
          photo: form.photo,
          file: form.file,
        });

        const diffTime = Math.abs(today.getTime() - applyDate.getTime());
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays < 7) {
          newAppliedCountMap[jobId] = (newAppliedCountMap[jobId] || 0) + 1;
        }
      });

      const mappedData: DataType[] = filteredJobs.map((job: any) => {
        const jobDeadlineDate = job.jobDeadline
          ? parseDate(job.jobDeadline)
          : null;
        const isExpired = jobDeadlineDate && jobDeadlineDate < today;

        return {
          id: job.id,
          jobTitle: job.jobTitle,
          jobDeadline: job.jobDeadline,
          appliedCount: jobCountMap[job.id] || 0,
          newApplied: newAppliedCountMap[job.id] || 0,
          publication: job.publication,
          status: isExpired ? "Expired" : job.publication,
          applicants: applicantMap[job.id] || [],
        };
      });

      setJobsData(mappedData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <DashboardItem jobs={jobsData} fetchJobs={fetchJobs} loading={loading} />
    </main>
  );
};
