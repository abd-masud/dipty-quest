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
import Warning from "../../../../public/images/warning.jpg";
import Success from "../../../../public/images/success.jpg";
import Image from "next/image";

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
  jobBenefits?: string[];
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
          throw new Error("Failed to fetch event data");
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

  // const validateForm = () => {
  //   if (!formData.name || !formData.email || !formData.phone) {
  //     setError("Please fill out all required fields.");
  //     return false;
  //   }
  //   if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone || "")) {
  //     setError("Invalid phone number.");
  //     return false;
  //   }
  //   return true;
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   setPendingSubmit(() => submitForm);
  //   setIsWarningModalVisible(true);
  // };

  // const submitForm = async () => {
  //   const data = {
  //     job_id: jobId,
  //     name: formData.name,
  //     last_name: formData.last_name,
  //     email: formData.email,
  //     phone: formData.phone,
  //   };

  //   try {
  //     const response = await fetch("/api/event-form", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.status === 409) {
  //       setIsEmailRegisteredModalVisible(true);
  //     } else if (!response.ok) {
  //       throw new Error("Failed to submit form");
  //     } else {
  //       setIsSuccessModalVisible(true);
  //     }
  //   } catch {
  //     setError("Failed to submit form.");
  //     setIsErrorModalVisible(true);
  //   } finally {
  //     setIsWarningModalVisible(false);
  //   }
  // };

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
          <p className="text-center font-bold">Loading...</p>
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
            onClick={() => {
              const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
              if (!token) {
                router.push("/authentication/login");
              } else {
                router.push("/job-details");
              }
            }}
            className="text-[12px] font-bold border-b-2 border-[#131226] bg-[#FAB616] text-[#131226] hover:border-[#FAB616] hover:text-white hover:bg-[#131226] py-2 px-5 flex justify-center items-center rounded-full transition duration-300"
          >
            Apply Now
          </button>
        </div>
      </div>
      <div className="border-y py-5 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex items-center gap-2 py-1 px-3">
            <div className="bg-blue-50 h-12 w-12 flex justify-center items-center rounded-full border border-blue-600">
              <FaMoneyCheckAlt className="text-xl text-blue-600" />
            </div>
            <div className="ml-2">
              <p>
                {jobData?.maximumSalary} {jobData?.currency}
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
        <p>Rafusoft is hiring talented and motivated individuals.</p>
        <p>
          This is a Fortunate moment for job seekers who want to build their
          careers and explore their skills in different professions. It is a
          great chance for self-taught editors to improve and gain professional
          skills. As an intern, you&apos;ll help our head editor get real-world
          practice and add to cool projects.
        </p>
        <h3 className="text-[18px] font-bold mt-3">Responsibilities</h3>
        <p>
          # Planning and defining project scope, goals, and deliverables in
          alignment with organizational objectives.{" "}
        </p>
        <p>
          # Coordinating and leading project teams to ensure timely and
          efficient task completion.{" "}
        </p>
        <p>
          # Managing resources, budgets, and timelines to keep the project on
          track and within budget.
        </p>
        <p>
          # Monitoring project progress, addressing any risks or issues, and
          adjusting plans as needed.
        </p>
        <p>
          # Communicating regularly with stakeholders to provide updates and
          gather feedback on project milestones.
        </p>

        <h3 className="text-[18px] font-bold mt-3">Benefits</h3>
        <p># Competitive salary (to be discussed based on experience).</p>
        <p>
          # Company-sponsored transportation and lunch during the 3-month
          training period.
        </p>
        <p>
          # Opportunity for full-time employment after successful • completion
          of the training program.
        </p>
        <p>
          # Work in a supportive and innovative environment with experienced
          professionals.
        </p>
        <p>
          # If you are ready to kickstart your career as an editor and be part
          of a vibrant team, we encourage you to apply!
        </p>

        <h2 className="text-[24px] font-bold mt-5">Education</h2>
        <p>Minimum Qualification: Bachelor Degree</p>
        <p>Preferred Qualification: Bachelor Degree</p>
        <h2 className="text-[24px] font-bold mt-5">Experience</h2>
        <p>At least 1 years of experience</p>
        <p>Preferred number of years of experience: 5 years</p>
        <h2 className="text-[24px] font-bold mt-5">Job Requirements</h2>
        <h3 className="text-[18px] font-bold mt-3">Qualification</h3>
        <p>
          # Bachelor’s degree in project management, business administration, or
          a related field; certifications like PMP or PRINCE2 are often
          preferred.
        </p>
        <p>
          # Strong organizational and multitasking skills to manage multiple
          projects and prioritize tasks effectively.
        </p>
        <p>
          # Proven experience in project management methodologies and tools,
          such as Agile, Scrum, or Waterfall.
        </p>
        <p>
          # Excellent communication and interpersonal skills to collaborate with
          team members and stakeholders.
        </p>
        <p>
          # Proficiency in project management software, such as Microsoft
          Project, Trello, or Asana.
        </p>
        <p>
          # Ability to analyze risks and develop mitigation strategies while
          ensuring projects stay on schedule and within budget.
        </p>
        <h3 className="text-[18px] font-bold mt-3">Academic Information</h3>
        <p># Preferred Level: BBA </p>
        <p># University students can apply as well</p>
        <h3 className="text-[18px] font-bold mt-3">Additional Requirements</h3>
        <p># Having experience in Health Sector will get preference.</p>
        <p># Good communication skill.</p>
        <h2>Compensation & Other Benefits</h2>
        <p>Salary : Negotiable</p>
        <p>Benefits</p>
        <h2 className="text-[24px] font-bold mt-5">Employment Status</h2>
        <p>Full-time</p>
        <h2 className="text-[24px] font-bold mt-5">Job Location</h2>
        <p>All over Bangladesh</p>
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
          You are about to register for this event. Are you sure?
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
