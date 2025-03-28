"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PiClockClockwiseBold } from "react-icons/pi";
import { MdBusinessCenter } from "react-icons/md";
import { FaUserGroup, FaGraduationCap, FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import Warning from "../../../../../../public/images/warning.png";

interface JobDetails {
  id: number;
  company: string;
  jobTitle: string;
  department: string;
  companyLogo: string;
  industry: string;
  numberOfVacancy: number;
  salary: string;
  currency: string;
  salaryType: string;
  jobType: string;
  preferredEducation: string;
  district: string;
  jobDeadline: string;
  publication: string;
}

export const AppliedJobsItems = () => {
  const [jobData, setJobData] = useState<JobDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

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

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const jobFormResponse = await fetch("/api/job-form");
        if (!jobFormResponse.ok) {
          throw new Error("Failed to fetch job forms");
        }
        const jobForms = await jobFormResponse.json();

        const matchedJobIds = jobForms
          .filter((form: any) => form.user_id == userId)
          .map((form: any) => form.job_id);

        if (matchedJobIds.length == 0) {
          setLoading(false);
          return;
        }

        const jobAppResponse = await fetch("/api/job-app");
        if (!jobAppResponse.ok) {
          throw new Error("Failed to fetch job applications");
        }
        const jobApps = await jobAppResponse.json();

        const filteredJobs = jobApps.filter((job: any) =>
          matchedJobIds.includes(job.id)
        );

        setJobData(filteredJobs);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <main className="pb-10">
        <div className="bg-white border shadow-lg mb-5 flex justify-between items-center px-5 h-[50px]"></div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="md:h-[270px] h-[350px] border bg-white shadow-lg"
              ></div>
            ))}
        </div>
      </main>
    );
  }

  if (error || jobData.length == 0) {
    return (
      <main className="pb-20 h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Image height={200} width={200} src={Warning} alt="Warning" />
          <p>You haven&apos;t applied for any jobs</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pb-10">
      <div className="bg-white border shadow-lg mb-5 px-5 py-3">
        <div className="flex justify-between items-center">
          <p>
            You have applied for{" "}
            <span className="font-bold">{jobData.length}</span> jobs
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
        {jobData.map((job) => (
          <div
            key={job.id}
            className="border bg-white divide-y-2 shadow-lg transition duration-300"
          >
            <div className="p-5">
              <div className="flex justify-between">
                <div className="w-full">
                  <h2 className="font-bold text-[20px] truncate overflow-hidden whitespace-nowrap">
                    {job.jobTitle}
                  </h2>
                  <p className="text-gray-600 truncate overflow-hidden whitespace-nowrap">
                    {job.company}
                  </p>
                </div>
                {job.companyLogo && (
                  <div className="h-8 flex-shrink-0 md:block hidden">
                    <Image
                      src={job.companyLogo}
                      alt={job.company}
                      width={150}
                      height={150}
                      className="h-16 w-auto"
                    />
                  </div>
                )}
              </div>
              <p className="my-5">
                {job.salary == "Negotiable"
                  ? "Salary: Negotiable"
                  : `Salary: ${job.salary} ${
                      job.currency
                    }/${job.salaryType.slice(0, -2)}`}
              </p>
              <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                <div className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-blue-600">
                  <FaUserGroup className="text-[14px]" />
                  <span className="text-[14px] truncate">
                    Vacancy: {job.numberOfVacancy}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-green-600">
                  <MdBusinessCenter className="text-[14px]" />
                  <span className="text-[14px] truncate">{job.jobType}</span>
                </div>
                <div className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-purple-600">
                  <FaGraduationCap className="text-[14px]" />
                  <span className="text-[14px] truncate">
                    {job.preferredEducation}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-orange-600">
                  <FaLocationDot className="text-[14px]" />
                  <span className="text-[14px] truncate">{job.district}</span>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 p-5 gap-3">
              <div className="flex items-center font-bold text-[14px]">
                <PiClockClockwiseBold className="mr-2 text-[20px]" />
                Deadline:
                <span className="text-red-500 ml-1">{job.jobDeadline}</span>
              </div>
              <div className="text-[12px] font-bold flex justify-end gap-3">
                <Link
                  href={`/job-details/${job.jobTitle
                    .toLowerCase()
                    .replace(/\s+/g, "-")}-${job.id}`}
                  target="_blank"
                  className="border-b-2 hover:border-[#131226] hover:bg-[#FAB616] hover:text-[#131226] border-[#FAB616] text-white bg-[#131226] py-2 w-32 flex justify-center items-center rounded-full transition duration-300"
                >
                  View Details
                </Link>
                <div className="border-b-2 border-[#131226] bg-[#FAB616] text-[#131226] py-2 w-32 flex justify-center items-center rounded-full transition duration-300">
                  Applied
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
