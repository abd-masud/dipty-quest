"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PiClockClockwiseBold } from "react-icons/pi";
import { MdBusinessCenter } from "react-icons/md";
import { FaFilter, FaGraduationCap, FaUserGroup } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import Warning from "../../../../public/images/warning.webp";
import Success from "../../../../public/images/success.webp";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import { jobTypesOptions, salaryRanges } from "./Others";
import { StylesConfig } from "react-select";
import Select from "react-select";
import { locationsOptions } from "./Locations";
import { industriesOptions } from "./Industries";
import { departmentsOptions } from "./Departments";

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

interface Option {
  value: string;
  label: string;
}

const parseDate = (dateString: string): Date | null => {
  const cleanedDate = dateString.replace(/(\d+)(st|nd|rd|th)/, "$1");
  const parsedDate = new Date(cleanedDate);
  return isNaN(parsedDate.getTime()) ? null : parsedDate;
};

export const FindAJobInfo = () => {
  const [jobData, setJobData] = useState<JobDetails[]>([]);
  const [formData, setFormData] = useState<Partial<JwtPayload>>({});
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isEmailRegisteredModalVisible, setIsEmailRegisteredModalVisible] =
    useState(false);
  const [pendingSubmit, setPendingSubmit] = useState<(() => void) | null>(null);
  const router = useRouter();
  const [filteredJobs, setFilteredJobs] = useState<JobDetails[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [filters, setFilters] = useState({
    company: "",
    jobTitle: "",
    industry: "",
    department: "",
    jobType: "",
    salary: "",
    district: "",
  });

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

  const handleOpenModal = () => {
    setIsCollapsed(!isCollapsed);
  };

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

  useEffect(() => {
    setFilteredJobs(jobData);
  }, [jobData]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (!jobData.length) return;

    const today = new Date();

    const newFilteredJobs = jobData.filter((job) => {
      const jobDeadline = parseDate(job.jobDeadline);
      const publication = job.publication;
      if (!jobDeadline || jobDeadline < today || publication == "Unpublished") {
        return false;
      }

      const salaryRange = salaryRanges.find(
        (range) => range.value == filters.salary
      );
      const jobSalary = Number(job.salary);
      const isSalaryValid =
        salaryRange &&
        ((salaryRange.value == "200k+" && jobSalary >= 200000) ||
          (salaryRange.value == "0-20k" &&
            jobSalary >= 0 &&
            jobSalary <= 20000) ||
          (salaryRange.value == "20k-40k" &&
            jobSalary > 20000 &&
            jobSalary <= 40000) ||
          (salaryRange.value == "40k-60k" &&
            jobSalary > 40000 &&
            jobSalary <= 60000) ||
          (salaryRange.value == "60k-80k" &&
            jobSalary > 60000 &&
            jobSalary <= 80000) ||
          (salaryRange.value == "80k-100k" &&
            jobSalary > 80000 &&
            jobSalary <= 100000) ||
          (salaryRange.value == "100k-200k" &&
            jobSalary > 100000 &&
            jobSalary <= 200000));

      return (
        (filters.company
          ? job.company.toLowerCase().includes(filters.company.toLowerCase())
          : true) &&
        (filters.jobTitle
          ? job.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase())
          : true) &&
        (filters.industry
          ? job.industry.toLowerCase().includes(filters.industry.toLowerCase())
          : true) &&
        (filters.department
          ? job.department
              .toLowerCase()
              .includes(filters.department.toLowerCase())
          : true) &&
        (filters.jobType
          ? job.jobType.toLowerCase().includes(filters.jobType.toLowerCase())
          : true) &&
        (filters.salary ? isSalaryValid : true) &&
        (filters.district
          ? job.district.toLowerCase().includes(filters.district.toLowerCase())
          : true)
      );
    });

    setFilteredJobs(newFilteredJobs);
  }, [filters, jobData]);

  const handleClearFilters = () => {
    setFilters({
      company: "",
      jobTitle: "",
      industry: "",
      department: "",
      jobType: "",
      salary: "",
      district: "",
    });

    setFilteredJobs(jobData);
  };

  const customStyles: StylesConfig<Option, false> = {
    control: (provided) => ({
      ...provided,
      borderColor: "#E3E5E9",
      borderRadius: "0.375rem",
      padding: "0",
      fontSize: "14px",
      outline: "none",
      color: "black",
      width: "100%",
      transition: "border-color 0.3s",
      "&:hover": {
        borderColor: "#FAB616",
      },
      "&:focus": {
        borderColor: "#FAB616",
        outline: "none",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.375rem",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#E3E5E9" : "white",
      color: state.isSelected ? "#131226" : "#131226",
      padding: "5px 10px",
      fontSize: "14px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#E3E5E9",
        color: "#131226",
      },
    }),
  };

  if (loading) {
    return (
      <main className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="bg-gray-100 border shadow-lg mb-5 flex justify-between items-center px-5 py-[30px]"></div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          <div className="md:h-[270px] h-[350px] border bg-gray-100 shadow-lg"></div>
          <div className="md:h-[270px] h-[350px] border bg-gray-100 shadow-lg"></div>
          <div className="md:h-[270px] h-[350px] border bg-gray-100 shadow-lg"></div>
          <div className="md:h-[270px] h-[350px] border bg-gray-100 shadow-lg"></div>
          <div className="md:h-[270px] h-[350px] border bg-gray-100 shadow-lg"></div>
          <div className="md:h-[270px] h-[350px] border bg-gray-100 shadow-lg"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-10">
      <div className="bg-gray-100 border shadow-lg mb-5 px-5 py-3">
        <div className="flex justify-between items-center">
          <p>
            We found <span className="font-bold">{filteredJobs.length}</span>{" "}
            jobs
          </p>
          <button
            onClick={handleOpenModal}
            className="border-b-2 border-[#131226] bg-[#FAB616] text-[#131226] hover:border-[#FAB616] hover:text-white hover:bg-[#131226] py-2 w-20 text-[12px] font-bold flex justify-center items-center rounded-full transition duration-300"
          >
            Filter <FaFilter className="text-[10px] ml-2" />
          </button>
        </div>
        <div
          className={`grid md:grid-cols-4 grid-cols-2 md:gap-5 gap-3 w-full transition-all duration-500 ${
            isCollapsed
              ? "max-h-0 overflow-hidden opacity-0"
              : "max-h-[300px] transition-all duration-500 opacity-100 my-2"
          }`}
        >
          <input
            className="md:-mb-4 border text-[14px] text-[#131226] h-[38px] px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
            placeholder="Job Title"
            value={filters.jobTitle}
            onChange={(e) => handleFilterChange(e, "jobTitle")}
          />

          <input
            className="md:-mb-4 border text-[14px] text-[#131226] h-[38px] px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
            placeholder="Company"
            value={filters.company}
            onChange={(e) => handleFilterChange(e, "company")}
          />
          <Select
            id="industry"
            options={industriesOptions}
            placeholder="Industry"
            value={
              filters.industry
                ? {
                    value: filters.industry,
                    label: filters.industry,
                  }
                : null
            }
            onChange={(selectedOption) => {
              if (selectedOption) {
                setFilters({
                  ...filters,
                  industry: selectedOption.value,
                });
              } else {
                setFilters({ ...filters, industry: "" });
              }
            }}
            isSearchable
            className="react-select-container w-full md:mt-2 mt-0 md:-mb-4"
            classNamePrefix="react-select"
            styles={customStyles}
            required
          />
          <Select
            id="department"
            options={departmentsOptions}
            placeholder="Department"
            value={
              filters.department
                ? {
                    value: filters.department,
                    label: filters.department,
                  }
                : null
            }
            onChange={(selectedOption) => {
              if (selectedOption) {
                setFilters({
                  ...filters,
                  department: selectedOption.value,
                });
              } else {
                setFilters({ ...filters, department: "" });
              }
            }}
            isSearchable
            className="react-select-container w-full md:mt-2 mt-0 md:-mb-4"
            classNamePrefix="react-select"
            styles={customStyles}
            required
          />
          <Select
            id="jobType"
            options={jobTypesOptions}
            placeholder="Type"
            value={
              filters.jobType
                ? {
                    value: filters.jobType,
                    label: filters.jobType,
                  }
                : null
            }
            onChange={(selectedOption) => {
              if (selectedOption) {
                setFilters({
                  ...filters,
                  jobType: selectedOption.value,
                });
              } else {
                setFilters({ ...filters, jobType: "" });
              }
            }}
            isSearchable
            className="react-select-container w-full md:mt-2 mt-0 md:-mb-4"
            classNamePrefix="react-select"
            styles={customStyles}
            required
          />
          <Select
            id="salary"
            options={salaryRanges}
            placeholder="Salary"
            value={
              filters.salary
                ? { value: filters.salary, label: filters.salary }
                : null
            }
            onChange={(selectedOption) => {
              if (selectedOption) {
                setFilters({ ...filters, salary: selectedOption.value });
              } else {
                setFilters({ ...filters, salary: "" });
              }
            }}
            isSearchable
            className="react-select-container w-full md:mt-2 mt-0 md:-mb-4"
            classNamePrefix="react-select"
            styles={customStyles}
          />
          <Select
            id="location"
            options={locationsOptions}
            placeholder="Location"
            value={
              filters.district
                ? {
                    value: filters.district,
                    label: filters.district,
                  }
                : null
            }
            onChange={(selectedOption) => {
              if (selectedOption) {
                setFilters({
                  ...filters,
                  district: selectedOption.value,
                });
              } else {
                setFilters({ ...filters, district: "" });
              }
            }}
            isSearchable
            className="react-select-container w-full md:mt-2 mt-0 md:-mb-4"
            classNamePrefix="react-select"
            styles={customStyles}
            required
          />
          <div className="flex justify-end">
            <button
              onClick={handleClearFilters}
              className="md:mt-2 border-b-2 hover:border-[#131226] hover:bg-[#FAB616] hover:text-[#131226] border-[#FAB616] text-white text-[12px] bg-[#131226] py-2 w-20 flex justify-center items-center rounded-full transition duration-300"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        {filteredJobs.map((job) => {
          const slug = job.jobTitle.toLowerCase().replace(/\s+/g, "-");
          const jobUrl = `/job-details/${slug}-${job.id}`;
          return (
            <div
              key={job.id}
              className="border bg-gray-100 divide-y-2 shadow-lg transition duration-300"
            >
              <div className="p-5">
                <div className="grid grid-cols-4">
                  <div className="w-full col-span-3">
                    <h2 className="font-bold text-[20px] truncate overflow-hidden whitespace-nowrap">
                      {job.jobTitle}
                    </h2>
                    <p className="text-gray-600 truncate overflow-hidden whitespace-nowrap">
                      {job.company}
                    </p>
                  </div>
                  {job?.companyLogo && (
                    <div className="h-8 flex-shrink-0 md:block hidden w-full">
                      <div className="flex justify-end">
                        <Image
                          src={job.companyLogo}
                          alt={job.company}
                          width={150}
                          height={150}
                          className="h-16 w-auto"
                        />
                      </div>
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
