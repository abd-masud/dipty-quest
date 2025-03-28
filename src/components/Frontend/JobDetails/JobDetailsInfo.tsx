"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGraduationCap, FaMoneyCheckAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { Media } from "../Home/Media";
import { Navigation } from "../Navigation/Navigation";
import { Breadcrumbs } from "./Breadcrumbs";
import { Footer } from "../Footer/Footer";
import { Modal } from "antd";
import Warning from "../../../../public/images/warning.webp";
import Success from "../../../../public/images/success.webp";
import Image from "next/image";
import Loader from "@/components/Loader";
import DOMPurify from "dompurify";

type JobDetails = {
  id: number;
  userId: number;
  company: string;
  companyLogo: string;
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
  jobBenefits?: Record<string, string[]>;
  customQuestion?: string;
};

interface JwtPayload {
  id: number;
  role: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  photo: string;
  file: string;
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
  const [copied, setCopied] = useState(false);
  const router = useRouter();

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

  const handleApply = async (e: React.FormEvent, jobId: string) => {
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

  const submitForm = async (jobId: string) => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "short" });
    const year = today.getFullYear();
    const formattedDate = `${day}th ${month}, ${year}`;
    const data = {
      job_id: jobId,
      user_id: formData.id,
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

      if (response.status == 409) {
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

  const slug = jobData?.jobTitle.toLowerCase().replace(/\s+/g, "-");
  const shareUrl = `https://diptyquest.com/job-details/${slug}-${jobData?.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Breadcrumbs />
      <div className="max-w-screen-xl mx-auto px-4 py-5">
        <div className="mb-5 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-[30px]">{jobData?.jobTitle}</h2>
            <p>{jobData?.company}</p>
          </div>
          {jobData?.companyLogo && (
            <div className="sm:block hidden">
              <Image
                src={jobData.companyLogo}
                alt={jobData.company}
                width={150}
                height={150}
                className="h-16 w-auto"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[14px] font-bold">
            Deadline:{" "}
            <span className="text-red-500 ml-1">{jobData?.jobDeadline}</span>
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className={`text-[12px] font-bold border-b-2 border-[#131226] 
        ${
          copied
            ? "bg-green-600 text-white hover:bg-green-600"
            : "bg-[#FAB616] text-[#131226]"
        } 
        hover:border-[#FAB616] hover:text-white hover:bg-[#131226] 
        py-[11px] px-3 flex justify-center items-center rounded-full transition duration-300`}
            >
              <FaLink />
            </button>
            {formData.role !== "employer" && (
              <button
                onClick={(e) => handleApply(e, jobId)}
                className="text-[12px] font-bold border-b-2 border-[#131226] bg-[#FAB616] text-[#131226] hover:border-[#FAB616] hover:text-white hover:bg-[#131226] py-2 px-5 flex justify-center items-center rounded-full transition duration-300"
              >
                Apply&nbsp;<span className="sm:block hidden">Now</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="border-y py-5 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex items-center gap-2 py-1 px-3">
            <div className="bg-blue-50 h-12 w-12 flex justify-center items-center rounded-full border border-blue-600">
              <FaMoneyCheckAlt className="text-xl text-blue-600" />
            </div>
            <div className="ml-2">
              <p className="truncate overflow-hidden">
                {jobData?.salary}
                {jobData?.salary !== "Negotiable" &&
                  jobData?.currency &&
                  ` / ${jobData.currency}`}
              </p>
              <p className="text-[14px]">{jobData?.salaryType} Salary</p>
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
              <p>{jobData?.preferredEducation}</p>
              <p className="text-[14px] truncate overflow-hidden whitespace-nowrap">
                Edu. Qualification
              </p>
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
        <p className="text-[14px]">
          {jobData?.company} is hiring talented and motivated individuals.
        </p>
        <p className="text-[14px]">
          This is a Fortunate moment for job seekers who want to build their
          careers and explore their skills in different professions. It is a
          great chance for self-taught editors to improve and gain professional
          skills. As {jobData?.jobLevel}, you&apos;ll help our head editor get
          real-world practice and add to cool projects.
        </p>
        <h3 className="text-[18px] font-bold mt-3">Skills</h3>
        <p className="text-[14px]">
          Required Skill:{" "}
          {Array.isArray(jobData?.jobSkill)
            ? jobData.jobSkill.join(", ")
            : jobData?.jobSkill}
        </p>
        <p className="text-[14px]">
          Skill Experience: {jobData?.skillExperience} years minimum
        </p>
        <h3 className="text-[18px] font-bold mt-3">Descriptions</h3>
        <div
          className="prose prose-sm prose-blue text-black marker:text-black text-[14px]"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(jobData?.jobDescription || ""),
          }}
        />

        {jobData?.jobBenefits &&
          Object.keys(jobData.jobBenefits).length > 0 && (
            <>
              <h3 className="text-[18px] font-bold mt-3">Benefits</h3>
              {Object.entries(jobData.jobBenefits).map(
                ([category, benefits]) => (
                  <div key={category} className="mt-4">
                    <h4 className="text-[16px] font-semibold capitalize">
                      {category.replace(/([A-Z])/g, " $1")}
                    </h4>
                    <ul className="list-disc list-inside text-[14px]">
                      {benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </>
          )}

        <h3 className="text-[18px] font-bold mt-3">Education</h3>
        {jobData?.minimumEducation && (
          <p className="text-[14px]">
            Minimum Qualification: {jobData.minimumEducation}
          </p>
        )}
        <p className="text-[14px]">
          Preferred Qualification: {jobData?.preferredEducation}
        </p>

        {(jobData?.minimumExperience !== null ||
          jobData?.maximumExperience !== null) && (
          <div>
            <h3 className="text-[18px] font-bold mt-3">Experience</h3>
            {jobData?.minimumExperience !== null && (
              <p className="text-[14px]">
                At least {jobData?.minimumExperience} years of experience
              </p>
            )}
            {jobData?.maximumExperience !== null && (
              <p className="text-[14px]">
                Preferred number of years of experience:{" "}
                {jobData?.maximumExperience} years
              </p>
            )}
          </div>
        )}

        <h3 className="text-[18px] font-bold mt-3">Job Requirements</h3>
        <div
          className="prose prose-sm prose-blue text-black marker:text-black text-[14px]"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(jobData?.jobRequirements || ""),
          }}
        />

        <h3 className="text-[18px] font-bold mt-3">Employment Status</h3>
        <p className="text-[14px]">{jobData?.jobType}</p>

        <h3 className="text-[18px] font-bold mt-3">Job Location</h3>
        <p className="text-[14px]">{jobData?.fullAddress}</p>

        {(jobData?.minimumAge || jobData?.maximumAge) && (
          <>
            <h3 className="text-[18px] font-bold mt-5">Age</h3>
            {jobData?.minimumAge && (
              <p className="text-[14px]">Minimum Age: {jobData.minimumAge}</p>
            )}
            {jobData?.maximumAge && (
              <p className="text-[14px]">Maximum Age: {jobData.maximumAge}</p>
            )}
          </>
        )}

        <h3 className="text-[18px] font-bold mt-5">Vacancy</h3>
        <p className="text-[14px]">
          Number of Vacancies: {jobData?.numberOfVacancy}
        </p>

        <h3 className="text-[18px] font-bold mt-5">Shift</h3>
        <p className="text-[14px]">Shift: {jobData?.jobShift}</p>

        <h3 className="text-[18px] font-bold mt-5">Gender</h3>
        <p className="text-[14px]">Gender: {jobData?.gender}</p>

        {jobData?.customQuestion && (
          <>
            <h3 className="text-[18px] font-bold mt-5">Custom Questions</h3>
            <p className="text-[14px]">{jobData.customQuestion}</p>
          </>
        )}
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
        <p>
          You can`&apos;t apply for this job. (Migrate to Student or
          Professional to apply)
        </p>
      </Modal>

      <Modal
        open={isEmailRegisteredModalVisible}
        onCancel={handleEmailRegisteredModalClose}
        title="You're Already Applied!"
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
      <Footer />
    </main>
  );
};
