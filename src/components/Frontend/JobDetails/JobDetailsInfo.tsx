"use client";

// import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGraduationCap, FaMoneyCheckAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";
import { Media } from "../Home/Media";
import { Navigation } from "../Navigation/Navigation";
import { Breadcrumbs } from "./Breadcrumbs";
import { Footer } from "../Footer/Footer";
import { Modal } from "antd";
import Warning from "../../../../public/images/warning.webp";
import Success from "../../../../public/images/success.webp";
import Image from "next/image";
import Loader from "@/components/Loader";

type JobDetails = {
  userId: number;
  company: string;
  jobTitle: string;
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
  minimumSalary?: number;
  maximumSalary?: number;
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
  jobBenefits?: Record<string, string[]>;
  customQuestion?: string;
};

interface JwtPayload {
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface JobsItemProps {
  jobId: string;
}

export const JobDetailsInfo = ({ jobId }: JobsItemProps) => {
  const [jobData, setJobData] = useState<JobDetails | null>(null);
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

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (!token) {
      router.push("/authentication/login");
      return;
    }

    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      setFormData({
        name: decodedPayload?.name,
        last_name: decodedPayload?.last_name,
        email: decodedPayload?.email,
        phone: decodedPayload?.phone,
      });
    } catch {
      router.push("/authentication/login");
    }
  }, [router]);

  useEffect(() => {
    if (!jobId) return;

    const fetchEventData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/job-details/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Job-Id": jobId,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch job data");
        }
        const data = await response.json();
        setJobData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [jobId]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (!token) {
      router.push("/authentication/login");
    } else {
      setPendingSubmit(() => submitForm);
      setIsWarningModalVisible(true);
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill out all required fields.");
      return false;
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone || "")) {
      setError("Invalid phone number.");
      return false;
    }
    return true;
  };

  const submitForm = async () => {
    const data = {
      job_id: jobId,
      name: formData.name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
    };

    try {
      const response = await fetch("/api/event-form", {
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

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [id]: value }));
  // };

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   const day = date.getDate().toString().padStart(2, "0");
  //   const month = date.toLocaleString("en-US", { month: "long" });
  //   const year = date.getFullYear();
  //   return `${day} ${month}, ${year}`;
  // };

  // const formatTime = (timeString: string) => {
  //   const [hour, minute] = timeString.split(":").map(Number);
  //   const isPM = hour >= 12;
  //   const formattedHour = hour % 12 || 12;
  //   return `${formattedHour}:${minute.toString().padStart(2, "0")} ${
  //     isPM ? "pm" : "am"
  //   }`;
  // };

  if (loading) {
    return (
      <main>
        <Media />
        <div className="sticky top-0 z-50">
          <Navigation />
        </div>
        <Breadcrumbs />
        <div className="flex justify-center items-center h-screen">
          <div className="overflow-hidden">
            <div className="-mt-52 -mb-52">
              <Loader />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <Media />
        <div className="sticky top-0 z-50">
          <Navigation />
        </div>
        <Breadcrumbs />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <p className="font-bold text-red-500">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Breadcrumbs />
      <div className="max-w-screen-xl mx-auto px-4 py-5">
        <div className="mb-5">
          <h2 className="font-bold text-[30px]">{jobData?.jobTitle}</h2>
          <p>{jobData?.company}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[14px] font-bold">
            Deadline:{" "}
            <span className="text-red-500 ml-1">{jobData?.jobDeadline}</span>
          </p>
          <button
            onClick={handleApply}
            className="text-[12px] font-bold border-b-2 border-[#131226] bg-[#FAB616] text-[#131226] hover:border-[#FAB616] hover:text-white hover:bg-[#131226] py-2 px-5 flex justify-center items-center rounded-full transition duration-300"
          >
            Apply Now
          </button>
        </div>
      </div>
      <div className="border-y py-5 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex items-center gap-2 py-1 px-3">
            <div className="bg-blue-50 h-12 w-12 flex justify-center items-center rounded-full border border-blue-600">
              <FaMoneyCheckAlt className="text-xl text-blue-600" />
            </div>
            <div className="ml-2">
              <p>
                {jobData?.minimumSalary} - {jobData?.maximumSalary}
              </p>
              <p className="text-[14px]">
                {jobData?.currency} {jobData?.salaryType}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 py-1 px-3">
            <div className="bg-green-50 h-12 w-12 flex justify-center items-center rounded-full border border-green-600">
              <MdBusinessCenter className="text-xl text-green-600" />
            </div>
            <div className="ml-2">
              <p>{jobData?.jobType}</p>
              <p className="text-[14px]">Employment Type</p>
            </div>
          </div>
          <div className="flex items-center gap-2 py-1 px-3">
            <div className="bg-purple-50 h-12 w-12 flex justify-center items-center rounded-full border border-purple-600">
              <FaGraduationCap className="text-xl text-purple-600" />
            </div>
            <div className="ml-2">
              <p>{jobData?.minimumEducation}</p>
              <p className="text-[14px]">Education Qualification</p>
            </div>
          </div>
          <div className="flex items-center gap-2 py-1 px-3">
            <div className="bg-orange-50 h-12 w-12 flex justify-center items-center rounded-full border border-orange-600">
              <FaLocationDot className="text-xl text-orange-600" />
            </div>
            <div className="ml-2">
              <p>
                {jobData?.upazila}, {jobData?.district}
              </p>
              <p className="text-[14px]">Job Location</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 py-5">
        <h2 className="text-[24px] font-bold">Job Description</h2>
        <h3 className="text-[18px] font-bold mt-3">Company Overview</h3>
        <p>{jobData?.company} is hiring talented and motivated individuals.</p>
        <p>
          This is a Fortunate moment for job seekers who want to build their
          careers and explore their skills in different professions. It is a
          great chance for self-taught editors to improve and gain professional
          skills. As an {jobData?.jobLevel}, you&apos;ll help our head editor
          get real-world practice and add to cool projects.
        </p>
        <h3 className="text-[18px] font-bold mt-3">Responsibilities</h3>
        <div>{jobData?.jobDescription}</div>

        <h3 className="text-[18px] font-bold mt-3">Benefits</h3>
        {jobData?.jobBenefits &&
          Object.entries(jobData.jobBenefits).map(([category, benefits]) => (
            <div key={category} className="mt-4">
              <h4 className="text-[16px] font-semibold capitalize">
                {category.replace(/([A-Z])/g, " $1")}
              </h4>
              <ul className="list-disc list-inside text-[16px]">
                {benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          ))}

        <h2 className="text-[24px] font-bold mt-5">Education</h2>
        <p>Minimum Qualification: {jobData?.minimumEducation}</p>
        <p>Preferred Qualification: {jobData?.preferredEducation}</p>
        <h2 className="text-[24px] font-bold mt-5">Experience</h2>
        <p>At least {jobData?.minimumExperience} years of experience</p>
        <p>
          Preferred number of years of experience: {jobData?.maximumExperience}{" "}
          years
        </p>
        <h2 className="text-[24px] font-bold mt-5">Job Requirements</h2>
        {/* <h3 className="text-[18px] font-bold mt-3">Qualification</h3>
        <p>Dynamic</p> */}
        <h3 className="text-[18px] font-bold mt-3">Academic Information</h3>
        <p># Preferred Level: BBA </p>
        <p># University students can apply as well</p>
        <h3 className="text-[18px] font-bold mt-3">Additional Requirements</h3>
        <p># Having experience in Health Sector will get preference.</p>
        <p># Good communication skill.</p>
        <h2>Compensation & Other Benefits</h2>
        <p>
          Salary : {jobData?.minimumSalary} - {jobData?.maximumSalary}{" "}
          {jobData?.currency}/{jobData?.salaryType?.slice(0, -2)}
        </p>
        <p>Benefits</p>
        <h2 className="text-[24px] font-bold mt-5">Employment Status</h2>
        <p>{jobData?.jobType}</p>
        <h2 className="text-[24px] font-bold mt-5">Job Location</h2>
        <p>{jobData?.fullAddress}</p>
      </div>
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
        <p className="text-center">Registration successful!</p>
      </Modal>

      <Modal
        open={isErrorModalVisible}
        onCancel={handleErrorModalClose}
        title="Error"
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
        <p className="text-center font-bold text-[20px] mb-5">
          Hey {formData.name}!
        </p>
        <p>There was an error with your registration.</p>
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
        <p className="text-center">
          You&apos;re already registered for this event.
        </p>
      </Modal>
      <Footer />
    </main>
  );
};
