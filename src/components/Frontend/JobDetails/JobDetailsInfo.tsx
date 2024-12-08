import Link from "next/link";
import { FaGraduationCap, FaMoneyCheckAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";

export const JobDetailsInfo = () => {
  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 py-5">
        <div className="mb-5">
          <h2 className="font-bold text-[30px]">Executive (Sales & Service)</h2>
          <p>Global Medical Engineering (BD) Ltd.</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[14px] font-bold">
            Deadline: <span className="text-red-500 ml-1">10th Dec, 2024</span>
          </p>
          <Link
            className="border border-[#131226] hover:text-[#131226] hover:bg-transparent py-2 px-5 flex justify-center items-center text-white bg-[#131226] transition duration-300"
            href="/"
          >
            Apply Now
          </Link>
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
              <p>Graduation</p>
              <p className="text-[14px]">Education Qualification</p>
            </div>
          </div>
          <div className="flex items-center gap-2 py-1 px-3">
            <div className="bg-orange-50 h-12 w-12 flex justify-center items-center rounded-full border border-orange-600">
              <FaLocationDot className="text-xl text-orange-600" />
            </div>
            <div className="ml-2">
              <p>Anywhere</p>
              <p className="text-[14px]">Job Location</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 py-5">
        <h2 className="text-[24px] font-bold">Job Description</h2>
        <h3 className="text-[18px] font-bold mt-3">Company Overview</h3>
        <p>
          Global Medical Engineering (BD) Ltd is the leading medical and health
          equipment supplier in Bangladesh. We are incorporated as a joint-stock
          company, established in 2007. Our mission is to provide the best
          service and widest the range of high-quality products in the health
          and medical sector. We serve our customers to every corner of the
          country, with the excellent world-renowned medical diagnostic reagents
          and other consumables, used in all fields of medical sectors.
        </p>
        <h3 className="text-[18px] font-bold mt-3">Responsibilities</h3>
        <p>
          # Contributes information, ideas, and research to help develop
          marketing strategies.
        </p>
        <p>
          # Helps in detail, design, and implement marketing plans for each
          product or service being offered.
        </p>
        <p>
          # Answers questions from clients about product and service benefits.
        </p>
        <p>
          # Maintains excellent relationships with clients through superior
          customer service.
        </p>
        <p># Tracks sales data and works to meet quotas or sales team goals.</p>
        <p>
          # Set up meetings between client decision makers and company’s
          practice leaders/Principals.
        </p>
        <p># Price Negotiation and Deal Closing.</p>
        <h2 className="text-[24px] font-bold mt-5">Education</h2>
        <p>Minimum Qualification: Bachelor Degree</p>
        <p>Preferred Qualification: Undefined Degree</p>
        <h2 className="text-[24px] font-bold mt-5">Experience</h2>
        <p>At least 0 years of experience</p>
        <p>Preferred number of years of experience: 1 years</p>
        <h2 className="text-[24px] font-bold mt-5">Job Requirements</h2>
        <h3 className="text-[18px] font-bold mt-3">Qualification</h3>
        <p>
          # Bachelor’s Degree in Marketing, Business or a Related Field. Diploma
          in Electro Medical/Bio-Medical.
        </p>
        <p># Minimum 0-1 year experience in the relevant field.</p>
        <p># At least 6 months of job experience in the Health Sector.</p>
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
