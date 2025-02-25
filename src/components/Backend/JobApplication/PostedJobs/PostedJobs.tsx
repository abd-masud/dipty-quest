"use client";

import { useEffect, useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { PostedJobsTable } from "./PostedJobsTable";

interface DataType {
  key: string;
  id: number;
  jobTitle: string;
  company: string;
  industry: string;
  department: string;
  position: string;
  gender?: string;
  jobDeadline?: string;
  division: string;
  district?: string;
  upazila?: string;
  fullAddress?: string;
  jobDescription?: string;
  jobRequirements?: string;
  minimumEducation?: string;
  preferredEducation?: string;
  salaryType?: string;
  currency?: string;
  salary?: string;
  totalExperience?: number;
  minimumExperience?: number;
  maximumExperience?: number;
  jobType?: string;
  jobLevel?: string;
  jobShift?: string;
  minimumAge?: number;
  maximumAge?: number;
  numberOfVacancy?: number;
  jobSkill?: string;
  skillExperience?: number;
  jobBenefits?: string[];
  customQuestion?: string;
}

export const PostedJobsPage = () => {
  const [jobsData, setJobsData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/job-app");
      if (!response.ok) {
        throw new Error("Failed to fetch job application");
      }
      const jobs = await response.json();
      const mappedData: DataType[] = jobs.map((job: any) => ({
        key: job.id.toString(),
        id: job.id,
        jobTitle: job.jobTitle,
        company: job.company,
        industry: job.industry,
        department: job.department,
        position: job.position,
        gender: job.gender,
        division: job.division,
        district: job.district,
        upazila: job.upazila,
        fullAddress: job.fullAddress,
        jobDescription: job.jobDescription,
        jobRequirements: job.jobRequirements,
        minimumEducation: job.minimumEducation,
        preferredEducation: job.preferredEducation,
        salaryType: job.salaryType,
        currency: job.currency,
        salary: job.salary,
        totalExperience: job.totalExperience,
        minimumExperience: job.minimumExperience,
        maximumExperience: job.maximumExperience,
        jobType: job.jobType,
        jobLevel: job.jobLevel,
        jobShift: job.jobShift,
        minimumAge: job.minimumAge,
        maximumAge: job.maximumAge,
        numberOfVacancy: job.numberOfVacancy,
        jobSkill: job.jobSkill,
        skillExperience: job.skillExperience,
        jobBenefits: job.jobBenefits,
        customQuestion: job.customQuestion,
        jobDeadline: job.jobDeadline,
      }));
      setJobsData(mappedData);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <PostedJobsTable
        jobs={jobsData}
        fetchJobs={fetchJobs}
        loading={loading}
      />
    </main>
  );
};
