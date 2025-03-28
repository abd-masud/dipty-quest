"use client";

import React, { useEffect, useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import Image from "next/image";
import { message, Modal, Select } from "antd";
import {
  FaFilePdf,
  FaUniversity,
  FaRegClock,
  FaBriefcase,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { RiPhoneLine } from "react-icons/ri";
import { FaLayerGroup } from "react-icons/fa6";

interface ApplicationType {
  id: number;
  user_id: number;
  job_id: number;
  apply_date: string;
  status: string;
}

interface UserDetails {
  id: number;
  role: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  institute: string;
  department: string;
  photo: string;
  image: string;
  file: string;
  skills: string;
  experience: number;
}

interface JobDetails {
  id: number;
  jobTitle: string;
}

interface ApplicantsItemProps {
  jobId: string;
}

const statusOptions = [
  { value: "Applied", label: "Applied" },
  { value: "In Review", label: "In Review" },
  { value: "Rejected", label: "Rejected" },
  { value: "Shortlist", label: "Shortlist" },
  { value: "Interview", label: "Interview" },
  { value: "Selected", label: "Selected" },
  { value: "Hired", label: "Hired" },
];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-base font-semibold text-gray-700 mb-1 flex items-center">
    <span className="w-1 h-4 bg-blue-500 mr-2 rounded-full"></span>
    {children}
  </h4>
);

export const ViewApplicantsCards: React.FC<ApplicantsItemProps> = ({
  jobId,
}) => {
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [allUsers, setAllUsers] = useState<UserDetails[]>([]);
  const [allJobs, setAllJobs] = useState<JobDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cvModalVisible, setCvModalVisible] = useState(false);
  const [selectedCv, setSelectedCv] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const jobsRes = await fetch("/api/job-app");
        if (!jobsRes.ok) throw new Error("Failed to fetch jobs");
        const jobsData = await jobsRes.json();
        setAllJobs(jobsData);

        const applicationsRes = await fetch("/api/job-form");
        if (!applicationsRes.ok)
          throw new Error("Failed to fetch applications");
        const applicationsData = await applicationsRes.json();

        const filteredApplications = applicationsData.filter(
          (app: ApplicationType) => app.job_id == Number(jobId)
        );
        setApplications(filteredApplications);

        const usersRes = await fetch("/api/users");
        if (!usersRes.ok) throw new Error("Failed to fetch users");
        const usersData = await usersRes.json();
        setAllUsers(usersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchData();
  }, [jobId]);

  const getUserById = (userId: number): UserDetails | undefined => {
    return allUsers.find((user) => user.id == userId);
  };

  const handleViewCv = (file: string) => {
    setSelectedCv(file);
    setCvModalVisible(true);
  };

  const handleDownloadCv = (file: string, name: string, lastName: string) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = `${name}_${lastName}_CV.pdf`;
    link.click();
    message.success("Downloading CV...");
  };

  const handleStatusChange = async (
    applicationId: number,
    newStatus: string
  ) => {
    try {
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id == applicationId ? { ...app, status: newStatus } : app
        )
      );
      const response = await fetch("/api/job-form", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId,
          newStatus,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
    } catch {
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id == applicationId ? { ...app, status: app.status } : app
        )
      );
    }
  };

  const currentJob = allJobs.find((job) => job.id == Number(jobId));

  const filteredApplications = statusFilter
    ? applications.filter((app) => app.status == statusFilter)
    : applications;

  if (loading) return <div className="p-5">Loading...</div>;
  if (error) return <div className="p-5 text-red-500">Error: {error}</div>;

  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <div className="mb-5 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">
          Applicants for{" "}
          <span className="text-blue-600">
            {currentJob ? currentJob.jobTitle : "This Position"}
          </span>
        </h2>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <div className="flex items-center mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                {filteredApplications.length}{" "}
                {filteredApplications.length == 1 ? "Applicant" : "Applicants"}
              </span>
              {statusFilter && (
                <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
                  Filtered by: {statusFilter}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                  statusFilter == option.value
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
            {statusFilter && (
              <button
                onClick={() => setStatusFilter(null)}
                className="px-4 py-2 rounded-md text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>
      {filteredApplications.length > 0 ? (
        <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-5">
          {filteredApplications.map((application) => {
            const user = getUserById(application.user_id);
            if (!user) return null;
            return (
              <div
                key={application.id}
                className="p-6 border rounded-lg shadow-lg bg-white"
              >
                <div className="flex gap-4 items-center mb-3 border-b pb-2">
                  <div className="relative w-20 h-20 shrink-0">
                    <div className="relative w-full h-full">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name}
                          fill
                          className="rounded-full object-cover border-2 border-[#131226]"
                          onError={(e) => {
                            e.currentTarget.src = user.photo;
                            e.currentTarget.onerror = null;
                          }}
                        />
                      ) : (
                        <Image
                          src={user.photo}
                          alt={user.name}
                          fill
                          className="rounded-full object-cover border-2 border-[#131226]"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold sm:text-xl text-gray-800">
                          {user.name} {user.last_name}
                        </h3>
                        <p className="text-gray-500 capitalize">{user.role}</p>
                      </div>
                      <div className="text-sm font-medium px-3 py-1 rounded-full border sm:block hidden">
                        {application.status}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-4 mb-4">
                  {user.email && (
                    <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-2">
                      <div className="bg-[#FAB616] p-2 rounded-lg border-b-2 border-[#131226]">
                        <FiMail className="text-[20px] text-white" />
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">
                          Email Address
                        </span>
                        <p className="text-sm">{user.email}</p>
                      </div>
                    </div>
                  )}
                  {user.phone && (
                    <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-2">
                      <div className="bg-[#FAB616] p-2 rounded-lg border-b-2 border-[#131226]">
                        <RiPhoneLine className="text-[20px] text-white" />
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">
                          Phone Number
                        </span>
                        <p className="text-sm">{user.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="grid lg:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-2">
                    <div className="bg-[#FAB616] p-2 rounded-lg border-b-2 border-[#131226]">
                      <FaUniversity className="text-[20px] text-white" />
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Institute</span>
                      <p className="text-sm">{user.institute || "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-2">
                    <div className="bg-[#FAB616] p-2 rounded-lg border-b-2 border-[#131226]">
                      <FaLayerGroup className="text-[20px] text-white" />
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Department</span>
                      <p className="text-sm">{user.department || "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-2">
                    <div className="bg-[#FAB616] p-2 rounded-lg border-b-2 border-[#131226]">
                      <FaBriefcase className="text-[20px] text-white" />
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Experience</span>
                      <p className="text-sm">
                        {user.experience ? (
                          <>
                            {Math.floor(user.experience / 12)}{" "}
                            {Math.floor(user.experience / 12) == 1
                              ? "year"
                              : "years"}
                            {user.experience % 12 !== 0 && (
                              <>
                                {" "}
                                {user.experience % 12}{" "}
                                {user.experience % 12 == 1 ? "month" : "months"}
                              </>
                            )}
                          </>
                        ) : (
                          "-"
                        )}
                      </p>
                    </div>
                  </div>
                  {application.apply_date && (
                    <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-2">
                      <div className="bg-[#FAB616] p-2 rounded-lg border-b-2 border-[#131226]">
                        <FaRegClock className="text-[20px] text-white" />
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">
                          Applied Date
                        </span>
                        <p className="text-sm">{application.apply_date}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <SectionTitle>Skills</SectionTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.skills ? (
                      <div className="flex flex-wrap gap-2">
                        {JSON.parse(user.skills).map(
                          (skill: string, index: number) => (
                            <span
                              key={index}
                              className="bg-[#FAB616] bg-opacity-20 text-[#131226] px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          )
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500">No skills listed</p>
                    )}
                  </div>
                </div>
                <div className="sm:flex justify-between items-center w-full border-t pt-4">
                  <div className="sm:mb-0 mb-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewCv(user.file)}
                        className="border-b-2 border-[#131226] bg-[#FAB616] text-[#131226] hover:border-[#FAB616] hover:text-white hover:bg-[#131226] py-1 px-3 text-[12px] rounded-full transition duration-300"
                      >
                        View file
                      </button>
                      <button
                        onClick={() =>
                          handleDownloadCv(user.file, user.name, user.last_name)
                        }
                        className="border-b-2 border-[#131226] bg-[#FAB616] text-[#131226] hover:border-[#FAB616] hover:text-white hover:bg-[#131226] py-1 px-3 text-[12px] rounded-full transition duration-300"
                      >
                        Download File
                      </button>
                    </div>
                  </div>
                  <Select
                    defaultValue={application.status}
                    options={statusOptions}
                    className="w-28"
                    onChange={(value) =>
                      handleStatusChange(application.id, value)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-5 bg-white rounded-lg shadow text-center">
          <p>
            No applicants found
            {statusFilter ? ` with status ${statusFilter}` : ""}
          </p>
        </div>
      )}

      <Modal
        title="Applicant CV"
        open={cvModalVisible}
        onCancel={() => setCvModalVisible(false)}
        width={1200}
        footer={null}
      >
        {selectedCv ? (
          <iframe
            src={selectedCv}
            width="100%"
            height="600px"
            className="border-0"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-10">
            <FaFilePdf className="text-5xl text-red-500 mb-4" />
            <p>CV not available</p>
          </div>
        )}
      </Modal>
    </main>
  );
};
