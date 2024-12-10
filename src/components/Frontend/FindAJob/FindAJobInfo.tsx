import Image from "next/image";
import Link from "next/link";
import { PiClockClockwiseBold } from "react-icons/pi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

interface JobDetails {
  id: number;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  vacancy: number;
  salary: string;
  jobType: string;
  education: string;
  location: string;
  deadline: string;
  viewDetailsUrl: string;
  applyNowUrl: string;
}

const jobData: JobDetails[] = [
  {
    id: 1,
    jobTitle: "Executive (Sales & Service)",
    companyName: "Global Medical Engineering (BD) Ltd.",
    companyLogo: "/images/find-job.png",
    vacancy: 5,
    salary: "Negotiable",
    jobType: "Full time",
    education: "Bachelor",
    location: "Anywhere",
    deadline: "10th Dec, 2024",
    viewDetailsUrl: "#",
    applyNowUrl: "#",
  },
  {
    id: 2,
    jobTitle: "Marketing Manager",
    companyName: "Tech Innovators Ltd.",
    companyLogo: "/images/find-job.png",
    vacancy: 5,
    salary: "Negotiable",
    jobType: "Full time",
    education: "Master's Degree",
    location: "Dhaka, Bangladesh",
    deadline: "15th Dec, 2024",
    viewDetailsUrl: "#",
    applyNowUrl: "#",
  },
  {
    id: 3,
    jobTitle: "Software Engineer",
    companyName: "CodeX Technologies",
    companyLogo: "/images/find-job.png",
    vacancy: 5,
    salary: "Negotiable",
    jobType: "Full time",
    education: "Bachelor's Degree in Computer Science",
    location: "Dhaka, Bangladesh",
    deadline: "20th Dec, 2024",
    viewDetailsUrl: "#",
    applyNowUrl: "#",
  },
  {
    id: 4,
    jobTitle: "UI/UX Designer",
    companyName: "Design Labs Ltd.",
    companyLogo: "/images/find-job.png",
    vacancy: 5,
    salary: "Negotiable",
    jobType: "Contract",
    education: "Bachelor's Degree in Design",
    location: "Remote",
    deadline: "25th Dec, 2024",
    viewDetailsUrl: "#",
    applyNowUrl: "#",
  },
  {
    id: 5,
    jobTitle: "Product Manager",
    companyName: "Productify Inc.",
    companyLogo: "/images/find-job.png",
    vacancy: 5,
    salary: "Negotiable",
    jobType: "Full time",
    education: "Master's Degree in Business",
    location: "Dhaka, Bangladesh",
    deadline: "30th Dec, 2024",
    viewDetailsUrl: "#",
    applyNowUrl: "#",
  },
  {
    id: 6,
    jobTitle: "Sales Executive",
    companyName: "Tech Solutions Ltd.",
    companyLogo: "/images/find-job.png",
    vacancy: 5,
    salary: "Negotiable",
    jobType: "Full time",
    education: "Bachelor's Degree",
    location: "Chattogram, Bangladesh",
    deadline: "5th Jan, 2025",
    viewDetailsUrl: "#",
    applyNowUrl: "#",
  },
  {
    id: 7,
    jobTitle: "Business Analyst",
    companyName: "Analytics Co.",
    companyLogo: "/images/find-job.png",
    vacancy: 5,
    salary: "Negotiable",
    jobType: "Full time",
    education: "Bachelor's Degree in Business",
    location: "Dhaka, Bangladesh",
    deadline: "10th Jan, 2025",
    viewDetailsUrl: "#",
    applyNowUrl: "#",
  },
  {
    id: 8,
    jobTitle: "Content Writer",
    companyName: "Content Creators Ltd.",
    companyLogo: "/images/find-job.png",
    vacancy: 5,
    salary: "Negotiable",
    jobType: "Part time",
    education: "Bachelor's Degree in English",
    location: "Remote",
    deadline: "15th Jan, 2025",
    viewDetailsUrl: "#",
    applyNowUrl: "#",
  },
  {
    id: 9,
    jobTitle: "Digital Marketing Specialist",
    companyName: "Marketing Pro",
    companyLogo: "/images/find-job.png",
    vacancy: 5,
    salary: "Negotiable",
    jobType: "Full time",
    education: "Bachelor's Degree in Marketing",
    location: "Dhaka, Bangladesh",
    deadline: "20th Jan, 2025",
    viewDetailsUrl: "#",
    applyNowUrl: "#",
  },
  {
    id: 10,
    jobTitle: "HR Manager",
    companyName: "HR Solutions Ltd.",
    companyLogo: "/images/find-job.png",
    vacancy: 5,
    salary: "Negotiable",
    jobType: "Full time",
    education: "Master's Degree in HR",
    location: "Dhaka, Bangladesh",
    deadline: "25th Jan, 2025",
    viewDetailsUrl: "#",
    applyNowUrl: "#",
  },
];

export const FindAJobInfo = () => {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        {jobData.map((job, index) => (
          <div
            key={index}
            className="border-2 bg-gray-100 divide-y-2 shadow-lg transition duration-300"
          >
            <div className="p-5">
              <div className="flex justify-between">
                <div>
                  <h2 className="font-bold text-[20px]">{job.jobTitle}</h2>
                  <p>{job.companyName}</p>
                </div>
                <div>
                  <Link href={job.viewDetailsUrl}>
                    <Image
                      src={job.companyLogo}
                      height={50}
                      width={50}
                      alt={job.companyName}
                    />
                  </Link>
                </div>
              </div>
              <p className="my-5">Vacancy: {job.vacancy}</p>
              <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                <div className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-blue-600">
                  <FaMoneyCheckAlt className="text-xl" />{" "}
                  <span className="text-[14px] truncate">{job.salary}</span>
                </div>
                <div className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-green-600">
                  <MdBusinessCenter className="text-xl" />{" "}
                  <span className="text-[14px] truncate">{job.jobType}</span>
                </div>
                <div className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-purple-600">
                  <FaGraduationCap className="text-xl" />{" "}
                  <span className="text-[14px] truncate">{job.education}</span>
                </div>
                <div className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1 px-3 text-orange-600">
                  <FaLocationDot className="text-xl" />{" "}
                  <span className="text-[14px] truncate">{job.location}</span>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 p-5 gap-3">
              <div className="flex items-center font-bold text-[14px]">
                <PiClockClockwiseBold className="mr-2 text-[20px]" />
                Deadline:{" "}
                <span className="text-red-500 ml-1">{job.deadline}</span>
              </div>
              <div className="text-[12px] font-bold flex justify-between">
                <Link
                  className="border-b-2 hover:border-[#131226] hover:bg-[#FAB616] hover:text-[#131226] border-[#FAB616] text-white bg-[#131226] py-2 w-full flex justify-center items-center rounded-full transition duration-300 mr-5"
                  href="/job-details"
                >
                  View Details
                </Link>
                <Link
                  className="border-b-2 border-[#131226] bg-[#FAB616] text-[#131226] hover:border-[#FAB616] hover:text-white hover:bg-[#131226] py-2 w-full flex justify-center items-center rounded-full transition duration-300"
                  href={job.applyNowUrl}
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
