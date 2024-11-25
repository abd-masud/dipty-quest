import Link from "next/link";
import { IoCallOutline } from "react-icons/io5";
import { IoMailOpenOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";

export const Footer = () => {
  return (
    <footer className="bg-[#1C1D20]">
      <div className="max-w-screen-xl mx-auto divide-y divide-dashed">
        <div className="grid grid-cols-4 gap-6 items-start py-10">
          <div className="col-span-2">
            <h2 className="text-white text-[56px] font-semibold leading-[60px] mb-5">
              <span className="text-[#71F9A3]">Let&apos;s </span> Work
              <br /> Together
            </h2>
            <p className="text-white">
              Welcome to our diverse and dynamic course catalog. At Edufast,
              we&apos;re dedicated to providing you with access to high-quality
              education that empowers your personal and professional growth.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-white text-[32px] font-semibold mb-3">
              Navigation
            </h2>
            <Link
              className="text-white hover:text-[#71F9A3] transition duration-300"
              href={""}
            >
              About
            </Link>
            <Link
              className="text-white hover:text-[#71F9A3] transition duration-300"
              href={""}
            >
              Find a Job
            </Link>
            <Link
              className="text-white hover:text-[#71F9A3] transition duration-300"
              href={""}
            >
              Employers
            </Link>
            <Link
              className="text-white hover:text-[#71F9A3] transition duration-300"
              href={""}
            >
              Offices
            </Link>
          </div>
          <div>
            <h2 className="text-white text-[32px] font-semibold mb-3">
              Contact Us
            </h2>
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 rounded-full border border-[#71F9A3] text-[#71F9A3] text-[24px]">
                <IoCallOutline />
              </div>
              <p className="text-white">+880 174 433 3888</p>
            </div>
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 rounded-full border border-[#71F9A3] text-[#71F9A3] text-[24px]">
                <IoMailOpenOutline />
              </div>
              <p className="text-white">info@rafusoft.com</p>
            </div>
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 rounded-full border border-[#71F9A3] text-[#71F9A3] text-[24px]">
                <MdOutlineLocationOn />
              </div>
              <p className="text-white">House #146, Rd No. 2, Dhaka 1206</p>
            </div>
          </div>
        </div>
        <div className="py-10">
          <div className="flex justify-between items-center">
            <p className="text-white">
              Copyright © 2024{" "}
              <span className="text-[#71F9A3]">DiptyQuest</span> All Rights
              Reserved.
            </p>
            <div>
              <Link
                className="text-white hover:text-[#71F9A3] transition duration-300"
                href={"/"}
              >
                Terms & Conditions
              </Link>
              <Link
                className="text-white hover:text-[#71F9A3] transition duration-300 ml-10"
                href={"/"}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
