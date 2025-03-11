"use client";

import React, { useEffect, useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import Image from "next/image";
import { Button, message, Modal } from "antd";

interface DataType {
  key: string;
  id: number;
  job_id: number;
  user_id: number;
  apply_date: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  photo: string;
  file: string;
}

interface UserDetails {
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  photo: string;
  file: string;
  institute: string;
  department: string;
  skills: string[];
  experience: string;
  status: string;
}

interface JobDetails {
  jobTitle: string;
}

interface ApplicantsItemProps {
  jobId: string;
}

export const ViewApplicantsCards: React.FC<ApplicantsItemProps> = ({
  jobId,
}) => {
  const [applicantData, setApplicantData] = useState<DataType[]>([]);
  const [cvModalVisible, setCvModalVisible] = useState(false);
  const [selectedCv, setSelectedCv] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [userDetails, setUserDetails] = useState<Record<number, UserDetails>>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobResponse = await fetch("/api/job-app");
        if (jobResponse.ok) {
          const jobData = await jobResponse.json();
          const jobIdAsNumber = Number(jobId);
          const job = jobData.find(
            (job: { id: number }) => job.id === jobIdAsNumber
          );
          if (job) {
            setJobDetails({
              jobTitle: job.jobTitle,
            });
          } else {
            setError("Job not found.");
          }
        } else {
          setError("Failed to fetch job details.");
        }

        const response = await fetch("/api/job-form");
        if (response.ok) {
          const data = await response.json();
          const jobIdAsNumber = Number(jobId);
          const applicants = data.filter(
            (item: DataType) => item.job_id === jobIdAsNumber
          );

          if (applicants.length > 0) {
            setApplicantData(applicants);
          } else {
            setError("No applicants found for the provided jobId.");
          }
        } else {
          setError("Failed to fetch data from the API.");
        }

        const userDetailsResponse = await fetch("/api/users");
        if (userDetailsResponse.ok) {
          const users = await userDetailsResponse.json();
          const userMap: Record<number, UserDetails> = {};
          users.forEach((user: UserDetails) => {
            userMap[user.id] = user;
          });
          setUserDetails(userMap);
        }
      } catch {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchData();
    }
  }, [jobId]);

  const handleViewCv = (file: string) => {
    setSelectedCv(file);
    setCvModalVisible(true);
  };

  const handleDownloadCv = (file: string, name: string, lastName: string) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = `${name} ${lastName}.pdf`;
    link.click();
    message.success("Downloading CV...");
  };

  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      {loading && <p></p>}
      {error && <p className="text-red-500">{error}</p>}

      {jobDetails && !loading && !error && (
        <div className="mb-5 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">{jobDetails.jobTitle}</h2>
        </div>
      )}

      {applicantData.length > 0 && !loading && !error ? (
        <div className="applicant-details mt-5">
          <div className="mt-4 grid md:grid-cols-2 grid-cols-1 gap-5">
            {applicantData.map((applicant) => {
              const user = userDetails[applicant.user_id];
              return (
                <div
                  key={applicant.id}
                  className="mb-5 p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-all text-[14px]"
                >
                  <div className="md:flex gap-5 mb-4">
                    <Image
                      height={200}
                      width={200}
                      src={applicant.photo}
                      alt={`${applicant.name}'s photo`}
                      className="w-24 h-24 object-cover rounded-full border-2 border-black"
                    />
                    <div>
                      <p className="font-semibold text-lg">
                        {applicant.name} {applicant.last_name}
                      </p>
                      {user && (
                        <div className="mt-4">
                          <p>{user.department}</p>
                          <p>{user.institute}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="sm:flex justify-between items-end border-y py-5">
                    <div>
                      <p>
                        <span>Email:</span> {applicant.email}
                      </p>
                      <p>
                        <span>Phone:</span> {applicant.phone}
                      </p>
                    </div>

                    <p>
                      <span>Applied:</span> {applicant.apply_date}
                    </p>
                  </div>

                  {user && (
                    <div className="mt-4">
                      <p>
                        <span>Skills:</span> {user.skills}
                      </p>
                      <p>
                        <span>Experience:</span> {user.experience} months
                      </p>
                      {/* <p>
                        <span>Status:</span> {user.status}
                      </p> */}
                    </div>
                  )}

                  <div className="mt-4 flex justify-between">
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => handleViewCv(applicant.file)}
                    >
                      View CV
                    </Button>
                    <Button
                      type="default"
                      size="small"
                      onClick={() =>
                        handleDownloadCv(
                          applicant.file,
                          applicant.name,
                          applicant.last_name
                        )
                      }
                    >
                      Download CV
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p></p>
      )}

      <Modal
        title="Applicant CV"
        open={cvModalVisible}
        onCancel={() => setCvModalVisible(false)}
        width={1200}
        footer={null}
      >
        <iframe src={selectedCv} width="100%" height="500px" title="CV" />
      </Modal>
    </main>
  );
};
