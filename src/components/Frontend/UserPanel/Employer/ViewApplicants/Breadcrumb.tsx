"use client";

import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export const Breadcrumb = () => {
  return (
    <main className="mb-4 pb-4 border-b flex justify-between items-center">
      <div>
        <p className="text-[16px] font-[600]">Applicants</p>
        <div className="md:block hidden">
          <div className="flex items-center">
            <Link className="text-[12px] text-[#797c8b]" href="/dashboard">
              Dashboard
            </Link>
            <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
            <Link
              className="text-[12px] text-[#797c8b]"
              href="/user-panel/employer/posted-jobs"
            >
              Posted Jobs
            </Link>
            <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
            <p className="text-[12px] text-[#797c8b]">Applicants</p>
          </div>
        </div>
      </div>
    </main>
  );
};
