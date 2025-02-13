"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PiClockClockwiseBold } from "react-icons/pi";
import { MdBusinessCenter } from "react-icons/md";
import { FaGraduationCap, FaUserGroup } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import warning from "../../../../public/images/warning.webp";
import { useRouter } from "next/navigation";

interface JobDetails {
  id: number;
  company: string;
  jobTitle: string;
  industry: string;
  numberOfVacancy: number;
  minimumSalary: string;
  maximumSalary: string;
  currency: string;
  salaryType: string;
  jobType: string;
  minimumEducation: string;
  district: string;
  jobDeadline: string;
}

interface JwtPayload {
  id: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  institute: string;
  department: string;
  graduation: string;
  company: string;
  experience: number;
  skills: string;
  switch: string;
  file: string;
  photo: string;
  primary: string;
}

export const FindAJobInfo = () => {
  const [jobData, setJobData] = useState<JobDetails[]>([]);
  const [, setFormData] = useState<Partial<JwtPayload>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        setFormData({ id: decodedPayload?.id });
      } catch {
        console.error("Invalid token");
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/job-app");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApply = () => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (!token) {
      router.push("/authentication/login");
    } else {
      console.log("Proceed with application logic");
      // Add logic here to submit the application
    }
  };

  if (loading) {
    return (
      <main className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          <div className="md:h-[270px] h-[350px] border bg-gray-100 shadow-lg"></div>
          <div className="md:h-[270px] h-[350px] border bg-gray-100 shadow-lg"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-screen-xl mx-auto py-20">
        <div className="flex flex-col items-center justify-center">
          <Image height={200} width={200} src={warning} alt={"Warning"}></Image>
          <p>No job post here right now!</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        {jobData.map((job) => (
          <div
            key={job.id}
            className="border bg-gray-100 divide-y-2 shadow-lg transition duration-300"
          >
            <div className="p-5">
              {/* <div className="flex justify-between"> */}
              <div>
                <h2 className="font-bold text-[20px]">{job.jobTitle}</h2>
                <p>{job.company}</p>
              </div>
              {/* <div className="mt-2">
                  <Image src={company} height={40} alt={job.industry} />
                </div> */}
              {/* </div> */}
              <p className="my-5">
                Salary: {job.minimumSalary} - {job.maximumSalary} {job.currency}
                /{job.salaryType.slice(0, -2)}
              </p>
              <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                <div
                  title={`Vacancy: ${job.numberOfVacancy}`}
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-blue-600"
                >
                  <FaUserGroup className="text-[14px]" />
                  <span className="text-[14px] truncate">
                    Vacancy: {job.numberOfVacancy}
                  </span>
                </div>
                <div
                  title={job.jobType}
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-green-600"
                >
                  <MdBusinessCenter className="text-[14px]" />
                  <span className="text-[14px] truncate">{job.jobType}</span>
                </div>
                <div
                  title={job.minimumEducation}
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-purple-600"
                >
                  <FaGraduationCap className="text-[14px]" />
                  <span className="text-[14px] truncate">
                    {job.minimumEducation}
                  </span>
                </div>
                <div
                  title={job.district}
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-orange-600"
                >
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
              <div className="text-[12px] font-bold flex justify-between">
                <Link
                  href={`/job-details/${job.jobTitle
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="border-b-2 hover:border-[#131226] hover:bg-[#FAB616] hover:text-[#131226] border-[#FAB616] text-white bg-[#131226] py-2 w-full flex justify-center items-center rounded-full transition duration-300 mr-5"
                  onClick={() =>
                    localStorage.setItem("jobId", job.id.toString())
                  }
                >
                  View Details
                </Link>

                <button
                  onClick={handleApply}
                  className="border-b-2 border-[#131226] bg-[#FAB616] text-[#131226] hover:border-[#FAB616] hover:text-white hover:bg-[#131226] py-2 w-full flex justify-center items-center rounded-full transition duration-300"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
