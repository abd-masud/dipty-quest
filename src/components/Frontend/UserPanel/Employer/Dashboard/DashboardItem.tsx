"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdHotelClass } from "react-icons/md";
import { BiSolidCalendarEvent, BiSolidCategoryAlt } from "react-icons/bi";
import { HiDocumentSearch } from "react-icons/hi";

export const DashboardItem = () => {
  const [newApplicantsCount, setNewApplicantsCount] = useState<number>(0);
  const [totalApplicantsCount, setTotalApplicantsCount] = useState<number>(0);
  const [liveJobsCount, setLiveJobsCount] = useState<number>(0);
  const [postedJobsCount, setPostedJobsCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (!token) {
      router.push("/authentication/login");
      return;
    }
    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      fetchData(decodedPayload.id);
    } catch {
      router.push("/authentication/login");
    }
  }, [router]);

  const fetchData = async (userId: any) => {
    let jobApp: any[] = [];
    let jobForm: any[] = [];

    const fetchWithErrorHandling = async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}`);
        return await response.json();
      } catch {
        return [];
      }
    };

    try {
      jobApp = await fetchWithErrorHandling("/api/job-app");
    } catch {}

    try {
      jobForm = await fetchWithErrorHandling("/api/job-form");
    } catch {}

    try {
      const employerJobApps = jobApp.filter(
        (job: any) => job.employerId == userId
      );
      const jobIds = employerJobApps.map((job: any) => job.id);

      const parseFormattedDate = (dateStr: string) => {
        const cleanedStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");
        return new Date(cleanedStr);
      };

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);

      let totalApplicants = 0;
      let newApplicants = 0;
      const applicantsPerJob: Record<number, number> = {};

      jobIds.forEach((id: any) => (applicantsPerJob[id] = 0));

      jobForm.forEach((form: any) => {
        if (jobIds.includes(form.job_id)) {
          totalApplicants++;
          applicantsPerJob[form.job_id]++;

          const applyDate = parseFormattedDate(form.apply_date);
          if (applyDate >= sevenDaysAgo && applyDate <= today) {
            newApplicants++;
          }
        }
      });

      const liveJobs = employerJobApps.filter((job: any) => {
        if (job.publication !== "Published") return false;

        const deadlineStr = job.jobDeadline.replace(/(\d+)(st|nd|rd|th)/, "$1");
        const deadlineDate = new Date(deadlineStr);
        return deadlineDate >= today;
      }).length;

      setNewApplicantsCount(newApplicants);
      setTotalApplicantsCount(totalApplicants);
      setLiveJobsCount(liveJobs);
      setPostedJobsCount(employerJobApps.length);
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  return (
    <main className="mb-5">
      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-5">
        <div className="flex items-center bg-white rounded-lg border-b-2 border-black py-3">
          <MdHotelClass className="ml-[21px] text-[16px] text-[#131226] mr-3 bg-[#FBB614] border-b-2 border-black h-14 w-14 p-3 rounded-lg -mt-1" />
          <div className="flex flex-col">
            <span className="text-gray-400">New Applicants</span>
            <span className="text-[24px] font-bold">{newApplicantsCount}</span>
          </div>
        </div>
        <div className="flex items-center bg-white rounded-lg border-b-2 border-black py-3">
          <BiSolidCalendarEvent className="ml-[21px] text-[16px] text-[#131226] mr-3 bg-[#FBB614] border-b-2 border-black h-14 w-14 p-3 rounded-lg -mt-1" />
          <div className="flex flex-col">
            <span className="text-gray-400">Total Applicants</span>
            <span className="text-[24px] font-bold">
              {totalApplicantsCount}
            </span>
          </div>
        </div>
        <div className="flex items-center bg-white rounded-lg border-b-2 border-black py-3">
          <HiDocumentSearch className="ml-[21px] text-[16px] text-[#131226] mr-3 bg-[#FBB614] border-b-2 border-black h-14 w-14 p-3 rounded-lg -mt-1" />
          <div className="flex flex-col">
            <span className="text-gray-400">Live Jobs</span>
            <span className="text-[24px] font-bold">{liveJobsCount}</span>
          </div>
        </div>
        <div className="flex items-center bg-white rounded-lg border-b-2 border-black py-3">
          <BiSolidCategoryAlt className="ml-[21px] text-[16px] text-[#131226] mr-3 bg-[#FBB614] border-b-2 border-black h-14 w-14 p-3 rounded-lg -mt-1" />
          <div className="flex flex-col">
            <span className="text-gray-400">Posted Jobs</span>
            <span className="text-[24px] font-bold">{postedJobsCount}</span>
          </div>
        </div>
      </div>
    </main>
  );
};
