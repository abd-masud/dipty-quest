"use client";

import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export const Breadcrumb = () => {
  return (
    <main className="border-b flex justify-between items-center p-5">
      <div>
        <p className="text-[16px] font-[600]">Change Password</p>
        <div className="md:block hidden">
          <div className="flex items-center">
            <Link
              className="text-[12px] text-[#797c8b]"
              href="/user-panel/student"
            >
              Dashboard
            </Link>
            <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
            <p className="text-[12px] text-[#797c8b]">Change Password</p>
          </div>
        </div>
      </div>
    </main>
  );
};
