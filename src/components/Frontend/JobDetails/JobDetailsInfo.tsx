"use client";

// import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGraduationCap, FaMoneyCheckAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";

export const JobDetailsInfo = () => {
  const router = useRouter();

  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 py-5">
        <div className="mb-5">
          <h2 className="font-bold text-[30px]">Project Manager</h2>
          <p>Rafusoft</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[14px] font-bold">
            Deadline: <span className="text-red-500 ml-1">31st Dec, 2024</span>
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
              <p>Negotiable</p>
              <p className="text-[14px]">Monthly Salary</p>
            </div>
          </div>
          <div className="flex items-center gap-2 py-1 px-3">
            <div className="bg-green-50 h-12 w-12 flex justify-center items-center rounded-full border border-green-600">
              <MdBusinessCenter className="text-xl text-green-600" />
            </div>
            <div className="ml-2">
              <p>Full time</p>
              <p className="text-[14px]">Employment Type</p>
            </div>
          </div>
          <div className="flex items-center gap-2 py-1 px-3">
            <div className="bg-purple-50 h-12 w-12 flex justify-center items-center rounded-full border border-purple-600">
              <FaGraduationCap className="text-xl text-purple-600" />
            </div>
            <div className="ml-2">
              <p>Bachelor Degree</p>
              <p className="text-[14px]">Education Qualification</p>
            </div>
          </div>
          <div className="flex items-center gap-2 py-1 px-3">
            <div className="bg-orange-50 h-12 w-12 flex justify-center items-center rounded-full border border-orange-600">
              <FaLocationDot className="text-xl text-orange-600" />
            </div>
            <div className="ml-2">
              <p>Dhaka</p>
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
    </main>
  );
};
