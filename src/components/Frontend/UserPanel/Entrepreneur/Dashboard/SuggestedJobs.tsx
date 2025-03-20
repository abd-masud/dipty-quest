"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { PiClockClockwiseBold } from "react-icons/pi";
import { MdBusinessCenter } from "react-icons/md";
import { FaGraduationCap, FaUserGroup } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import Warning from "../../../../../../public/images/warning.webp";
import Success from "../../../../../../public/images/success.webp";
import { useRouter } from "next/navigation";
import { Modal } from "antd";

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

interface JwtPayload {
  id: string;
  role: string;
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

const parseDate = (dateString: string): Date | null => {
  const cleanedDate = dateString.replace(/(\d+)(st|nd|rd|th)/, "$1");
  const parsedDate = new Date(cleanedDate);
  return isNaN(parsedDate.getTime()) ? null : parsedDate;
};

export const SuggestedJobs = () => {
  const [jobData, setJobData] = useState<JobDetails[]>([]);
  const [formData, setFormData] = useState<Partial<JwtPayload>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isEmailRegisteredModalVisible, setIsEmailRegisteredModalVisible] =
    useState(false);
  const [pendingSubmit, setPendingSubmit] = useState<(() => void) | null>(null);
  const router = useRouter();
  const [filteredJobs, setFilteredJobs] = useState<JobDetails[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        setFormData({
          id: decodedPayload.id,
          role: decodedPayload.role,
          name: decodedPayload?.name,
          last_name: decodedPayload?.last_name,
          email: decodedPayload?.email,
          phone: decodedPayload?.phone,
          photo: decodedPayload?.photo,
          file: decodedPayload?.file,
        });
      } catch {}
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

  useEffect(() => {
    if (!jobData) return;

    const today = new Date();

    const validJobs = jobData.filter((job) => {
      const jobDeadline = parseDate(job.jobDeadline);
      return jobDeadline !== null && jobDeadline >= today;
    });

    setFilteredJobs(validJobs);
  }, [jobData]);

  const handleApply = async (e: React.FormEvent, jobId: number) => {
    e.preventDefault();

    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");

    if (!token) {
      router.push("/authentication/login");
    } else {
      try {
        const base64Payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        if (
          decodedPayload.role !== "student" &&
          decodedPayload.role !== "professional"
        ) {
          setIsErrorModalVisible(true);
        } else {
          setFormData({
            id: decodedPayload.id,
            role: decodedPayload.role,
            name: decodedPayload?.name,
            last_name: decodedPayload?.last_name,
            email: decodedPayload?.email,
            phone: decodedPayload?.phone,
            photo: decodedPayload?.photo,
            file: decodedPayload?.file,
          });
          setPendingSubmit(() => () => submitForm(jobId));
          setIsWarningModalVisible(true);
        }
      } catch {
        setIsErrorModalVisible(true);
      }
    }
  };

  const submitForm = async (jobId: number) => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "short" });
    const year = today.getFullYear();
    const formattedDate = `${day}th ${month}, ${year}`;
    const data = {
      job_id: jobId,
      user_id: formData.id,
      role: formData.role,
      name: formData.name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      photo: formData.photo,
      file: formData.file,
      apply_date: formattedDate,
    };
    try {
      const response = await fetch("/api/job-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 409) {
        setIsEmailRegisteredModalVisible(true);
      } else if (!response.ok) {
        throw new Error("Failed to submit form");
      } else {
        setIsSuccessModalVisible(true);
      }
    } catch {
      setError("Failed to submit form.");
      setIsErrorModalVisible(true);
    } finally {
      setIsWarningModalVisible(false);
    }
  };

  const handleWarningModalCancel = () => {
    setIsWarningModalVisible(false);
    setPendingSubmit(null);
  };

  const handleWarningModalConfirm = () => {
    if (pendingSubmit) {
      pendingSubmit();
    }
    setIsWarningModalVisible(false);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
  };

  const handleErrorModalClose = () => {
    setIsErrorModalVisible(false);
  };

  const handleEmailRegisteredModalClose = () => {
    setIsEmailRegisteredModalVisible(false);
  };

  useEffect(() => {
    setFilteredJobs(jobData);
  }, [jobData]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <main className="max-w-screen-xl mx-auto py-5">
        <h2 className="mb-2 font-bold">Suggested Jobs</h2>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <div className="md:h-[270px] h-[350px] border bg-white shadow-lg"></div>
          <div className="md:h-[270px] h-[350px] border bg-white shadow-lg"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-screen-xl mx-auto py-20">
        <div className="flex flex-col items-center justify-center">
          <Image height={200} width={200} src={Warning} alt={"Warning"}></Image>
          <p>No job post here right now!</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-screen-xl mx-auto py-5 overflow-x-hidden">
      <h2 className="mb-2 font-bold">Suggested Jobs</h2>
      <Slider {...settings}>
        {filteredJobs.map((job) => {
          const slug = job.jobTitle.toLowerCase().replace(/\s+/g, "-");
          const jobUrl = `/job-details/${slug}-${job.id}`;
          return (
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
                  {job?.companyLogo && (
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
                  {job.salary === "Negotiable"
                    ? "Salary: Negotiable"
                    : `Salary: ${job.salary} ${
                        job.currency
                      }/${job.salaryType.slice(0, -2)}`}
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
                    title={job.preferredEducation}
                    className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-purple-600"
                  >
                    <FaGraduationCap className="text-[14px]" />
                    <span className="text-[14px] truncate">
                      {job.preferredEducation}
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
                <div className="text-[12px] font-bold flex justify-end">
                  {formData.role !== "employer" && (
                    <button
                      onClick={(e) => handleApply(e, job.id)}
                      className="border-b-2 border-[#131226] bg-[#FAB616] text-[#131226] hover:border-[#FAB616] hover:text-white hover:bg-[#131226] py-2 w-32 flex justify-center items-center rounded-full transition duration-300 mr-5"
                    >
                      Apply Now
                    </button>
                  )}
                  <Link
                    href={jobUrl}
                    className="border-b-2 hover:border-[#131226] hover:bg-[#FAB616] hover:text-[#131226] border-[#FAB616] text-white bg-[#131226] py-2 w-32 flex justify-center items-center rounded-full transition duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      <Modal
        open={isWarningModalVisible}
        onCancel={handleWarningModalCancel}
        onOk={handleWarningModalConfirm}
        title="Warning!"
        centered
        okText="Yes"
        cancelText="No"
        okButtonProps={{
          style: {
            borderBottom: "2px solid #131226",
            backgroundColor: "#FAB616",
            color: "#131226",
            transition: "all 0.3s ease",
          },
          onMouseOver: (e: React.MouseEvent) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.backgroundColor = "#131226";
            target.style.color = "white";
            target.style.borderBottomColor = "#FAB616";
          },
          onMouseOut: (e: React.MouseEvent) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.backgroundColor = "#FAB616";
            target.style.color = "#131226";
            target.style.borderBottomColor = "#131226";
          },
        }}
        cancelButtonProps={{
          style: {
            borderBottom: "2px solid #FAB616",
            backgroundColor: "#131226",
            color: "white",
            transition: "all 0.3s ease",
          },
          onMouseOver: (e: React.MouseEvent) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.backgroundColor = "#FAB616";
            target.style.color = "#131226";
            target.style.borderBottomColor = "#131226";
          },
          onMouseOut: (e: React.MouseEvent) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.backgroundColor = "#131226";
            target.style.color = "white";
            target.style.borderBottomColor = "#FAB616";
          },
        }}
      >
        <div className="flex justify-center items-center text-center">
          <Image src={Warning} alt="Warning" width={120} height={120} />
        </div>
        <p className="text-center font-bold text-[20px] mb-5">
          Hey {formData.name}!
        </p>
        <p className="text-center">
          You are about to apply for this job. Are you sure?
        </p>
      </Modal>

      <Modal
        open={isSuccessModalVisible && !isEmailRegisteredModalVisible}
        onCancel={handleSuccessModalClose}
        title="Success!"
        centered
        okText="Yes"
        cancelText="Okay"
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        cancelButtonProps={{
          style: {
            borderBottom: "2px solid #FAB616",
            backgroundColor: "#131226",
            color: "white",
            transition: "all 0.3s ease",
          },
          onMouseOver: (e: React.MouseEvent) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.backgroundColor = "#131226";
            target.style.color = "white";
            target.style.borderBottomColor = "#FAB616";
          },
          onMouseOut: (e: React.MouseEvent) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.backgroundColor = "#FAB616";
            target.style.color = "#131226";
            target.style.borderBottomColor = "#131226";
          },
        }}
      >
        <div className="flex justify-center items-center text-center">
          <Image src={Success} height={120} width={120} alt={"Success"} />
        </div>
        <p className="text-center font-bold text-[20px] mb-5">
          Hey {formData.name}!
        </p>
        <p className="text-center">Application successful!</p>
      </Modal>

      <Modal
        open={isErrorModalVisible}
        onCancel={handleErrorModalClose}
        title="Error"
        centered
        okText={null}
        cancelText="Okay"
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{
          style: {
            borderBottom: "2px solid #FAB616",
            backgroundColor: "#131226",
            color: "white",
            transition: "all 0.3s ease",
          },
          onMouseOver: (e: React.MouseEvent) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.backgroundColor = "#FAB616";
            target.style.color = "#131226";
            target.style.borderBottomColor = "#131226";
          },
          onMouseOut: (e: React.MouseEvent) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.backgroundColor = "#131226";
            target.style.color = "white";
            target.style.borderBottomColor = "#FAB616";
          },
        }}
      >
        <p className="text-center font-bold text-[20px] mb-5">
          Hey {formData.name}!
        </p>
        <p>There is an error with the following action!</p>
      </Modal>

      <Modal
        open={isEmailRegisteredModalVisible}
        onCancel={handleEmailRegisteredModalClose}
        title="You're Already Registered!"
        centered
        okText="Yes"
        cancelText="Okay"
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        cancelButtonProps={{
          style: {
            borderBottom: "2px solid #FAB616",
            backgroundColor: "#131226",
            color: "white",
            transition: "all 0.3s ease",
          },
          onMouseOver: (e: React.MouseEvent) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.backgroundColor = "#131226";
            target.style.color = "white";
            target.style.borderBottomColor = "#FAB616";
          },
          onMouseOut: (e: React.MouseEvent) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.backgroundColor = "#FAB616";
            target.style.color = "#131226";
            target.style.borderBottomColor = "#131226";
          },
        }}
      >
        <div className="flex justify-center items-center text-center">
          <Image src={Warning} alt="Warning" width={120} height={120} />
        </div>
        <p className="text-center font-bold text-[20px] mb-5">
          Hey {formData.name}!
        </p>
        <p className="text-center">You&apos;re already applied for this job.</p>
      </Modal>
    </main>
  );
};
