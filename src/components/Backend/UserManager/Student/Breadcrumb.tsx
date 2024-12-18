"use client";

import React from "react";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

interface BreadcrumbProps {
  fetchStudents: () => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = () => {
  return (
    <>
      <main className="mb-4 pb-4 border-b flex justify-between items-center">
        <div>
          <p className="text-[16px] font-[600]">Students</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link className="text-[12px] text-[#797c8b]" href="/dashboard">
                Dashboard
              </Link>
              <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
              <p className="text-[12px] text-[#797c8b]">Students</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};