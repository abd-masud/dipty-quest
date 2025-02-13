"use client";

import React from "react";
import Link from "next/link";
import { FaAngleRight, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

export const Breadcrumb = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/dashboard/jobs/new-job-post");
  };

  return (
    <>
      <main className="mb-4 pb-4 border-b flex justify-between items-center">
        <div>
          <p className="text-[16px] font-[600]">Posted Jobs</p>
          <div className="md:block hidden">
            <div className="flex items-center">
              <Link className="text-[12px] text-[#797c8b]" href="/dashboard">
                Dashboard
              </Link>
              <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
              <p className="text-[12px] text-[#797c8b]">Job Application</p>
              <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
              <p className="text-[12px] text-[#797c8b]">Posted Jobs</p>
            </div>
          </div>
        </div>
        <button
          className="bg-[#FAB616] text-[#131226] flex items-center border-b-2 border-[#131226] hover:bg-[#FAB616] transition duration-300 text-[13px] py-2 px-3 rounded ml-4"
          onClick={handleButtonClick}
        >
          <FaPlus />
          <span className="font-semibold ml-2">Job</span>
        </button>
      </main>
    </>
  );
};
