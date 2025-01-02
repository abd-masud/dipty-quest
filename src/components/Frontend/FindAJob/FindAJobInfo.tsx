"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PiClockClockwiseBold } from "react-icons/pi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import company from "../../../../public/company/rafusoft.png";
import { useRouter } from "next/navigation";

interface JobDetails {
  id: number;
  job: string;
  company: string;
  file: string;
  vacancy: number;
  salary: string;
  job_type: string;
  education: string;
  location: string;
  deadline: string;
}

// interface JwtPayload {
//   name: string;
//   last_name: string;
//   email: string;
//   phone: string;
// }

export const FindAJobInfo = () => {
  const [jobData, setJobData] = useState<JobDetails[]>([]);
  // const [formData, setFormData] = useState<Partial<JwtPayload>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
  //   if (!token) {
  //     router.push("/authentication/login");
  //     return;
  //   }

  //   try {
  //     const base64Payload = token.split(".")[1];
  //     const decodedPayload = JSON.parse(atob(base64Payload));
  //     setFormData({
  //       name: decodedPayload?.name,
  //       last_name: decodedPayload?.last_name,
  //       email: decodedPayload?.email,
  //       phone: decodedPayload?.phone,
  //     });
  //   } catch {
  //     router.push("/authentication/login");
  //   }
  // }, [router]);

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
      <main className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          <div className="md:h-[270px] h-[350px] border bg-gray-100 shadow-lg"></div>
          <div className="md:h-[270px] h-[350px] border bg-gray-100 shadow-lg"></div>
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
              <div className="flex justify-between">
                <div>
                  <h2 className="font-bold text-[20px]">{job.job}</h2>
                  <p>{job.company}</p>
                </div>
                <div className="mt-2">
                  <Image src={company} height={40} alt={job.company} />
                </div>
              </div>
              <p className="my-5">Vacancy: {job.vacancy}</p>
              <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                <div
                  title={job.salary}
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-blue-600"
                >
                  <FaMoneyCheckAlt className="w-[10px]" />
                  <span className="text-[14px] truncate">{job.salary}</span>
                </div>
                <div
                  title={job.job_type}
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-green-600"
                >
                  <MdBusinessCenter className="w-[12px]" />
                  <span className="text-[14px] truncate">{job.job_type}</span>
                </div>
                <div
                  title={job.education}
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-purple-600"
                >
                  <FaGraduationCap className="w-[12px]" />
                  <span className="text-[14px] truncate">{job.education}</span>
                </div>
                <div
                  title={job.location}
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-orange-600"
                >
                  <FaLocationDot className="w-[12px]" />
                  <span className="text-[14px] truncate">{job.location}</span>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 p-5 gap-3">
              <div className="flex items-center font-bold text-[14px]">
                <PiClockClockwiseBold className="mr-2 text-[20px]" />
                Deadline:
                <span className="text-red-500 ml-1">{job.deadline}</span>
              </div>
              <div className="text-[12px] font-bold flex justify-between">
                <Link
                  className="border-b-2 hover:border-[#131226] hover:bg-[#FAB616] hover:text-[#131226] border-[#FAB616] text-white bg-[#131226] py-2 w-full flex justify-center items-center rounded-full transition duration-300 mr-5"
                  href="/job-details"
                >
                  View Details
                </Link>
                <button
                  onClick={() => {
                    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
                    if (!token) {
                      router.push("/authentication/login");
                    } else {
                      router.push("/job-details");
                    }
                  }}
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
