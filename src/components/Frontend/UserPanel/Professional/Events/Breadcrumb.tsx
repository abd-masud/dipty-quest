"use client";

import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export const Breadcrumb = () => {
  return (
    <main className="mb-4 pb-4 border-b flex justify-between items-center">
      <div>
        <p className="text-[16px] font-[600]">Events</p>
        <div className="md:block hidden">
          <div className="flex items-center">
            <Link
              className="text-[12px] text-[#797c8b]"
              href="/user-panel/professional"
            >
              Dashboard
            </Link>
            <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
            <p className="text-[12px] text-[#797c8b]">Events</p>
          </div>
        </div>
      </div>
    </main>
  );
};
