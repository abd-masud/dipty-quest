"use client";

import { useCallback, useEffect, useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { ApplicantsList } from "./ApplicantsList";

interface DataType {
  key: string;
  id: number;
  job_id: number;
  job_title?: string;
  user_id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  photo: string;
  file: string;
}

export const ApplicantsCompound = () => {
  const [applicantsData, setApplicantsData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [jobMap, setJobMap] = useState<Record<number, string>>({});

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

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/job-app");
      if (!response.ok) throw new Error("Failed to fetch job data");

      const jobs = await response.json();
      const jobMapping: Record<number, string> = {};
      jobs.forEach((job: { id: number; jobTitle: string }) => {
        jobMapping[job.id] = job.jobTitle;
      });
      setJobMap(jobMapping);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchApplicants = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/job-form");
      if (!response.ok) throw new Error("Failed to fetch applicants");

      const applicants = await response.json();

      const mappedData: DataType[] = applicants.map((applicant: any) => ({
        key: applicant.id.toString(),
        id: applicant.id,
        job_id: applicant.job_id,
        job_title: jobMap[applicant.job_id],
        user_id: applicant.user_id,
        name: applicant.name,
        last_name: applicant.last_name,
        email: applicant.email,
        phone: applicant.phone,
        photo: applicant.photo,
        file: applicant.file,
      }));

      setApplicantsData(mappedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [jobMap]);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchApplicants();
    }
  }, [userId, fetchApplicants]);

  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <ApplicantsList
        applicants={applicantsData}
        fetchApplicants={fetchApplicants}
        loading={loading}
      />
    </main>
  );
};
