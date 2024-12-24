"use client";

import { useEffect, useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { JobPostTable } from "./JobPostTable";

interface DataType {
  key: string;
  id: number;
  job: string;
  company: string;
  file: string;
  vacancy: number;
  salary: number;
  job_type: string;
  education: string;
  location: string;
  deadline: string;
  com_overview: string;
  responsibilities: string;
  experience: string;
  qualification: string;
  add_requirement: string;
}

const formatDate = (date: string): string => {
  const formattedDate = new Date(date);
  const day = String(formattedDate.getDate()).padStart(2, "0");
  const month = formattedDate.toLocaleString("en-US", { month: "short" });
  const year = formattedDate.getFullYear();
  return `${day} ${month} ${year}`;
};

export const JobPostPage = () => {
  const [eventsData, setEventsData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/job-app");
      if (!response.ok) {
        throw new Error("Failed to fetch job application");
      }
      const jobs = await response.json();

      const mappedData: DataType[] = jobs.map((job: DataType) => ({
        key: job.id.toString(),
        id: job.id,
        job: job.job,
        company: job.company,
        file: job.file,
        vacancy: job.vacancy,
        salary: job.salary,
        job_type: job.job_type,
        education: job.education,
        location: job.location,
        deadline: formatDate(job.deadline),
        com_overview: job.com_overview,
        responsibilities: job.responsibilities,
        experience: job.experience,
        qualification: job.qualification,
        add_requirement: job.add_requirement,
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
      <JobPostTable
        events={eventsData}
        fetchEvents={fetchEvents}
        loading={loading}
      />
    </main>
  );
};
