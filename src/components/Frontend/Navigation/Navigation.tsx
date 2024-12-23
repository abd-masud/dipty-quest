"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/images/logo.png";
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  if (typeof window !== "undefined") {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  const isActive = (href: string) => {
    return pathname === href ? "text-black" : "text-[#404A60]";
  };

  return (
    <div className="shadow-lg bg-[#F5F6F7]">
      <div className="flex items-center justify-between py-5 px-4 max-w-screen-xl mx-auto">
        <div>
          <Link className="flex items-center" href={"/"}>
            <Image height={30} src={Logo} alt={"Logo"} priority />
            <p className="text-[#0F0D26] text-[24px] font-bold ml-2">
              DiptyQuest
            </p>
          </Link>
        </div>

        <div className="hidden lg:flex lg:items-center lg:space-x-6 text-[#404A60] font-semibold">
          <Link
            className={`hover:text-black transition duration-300 ${isActive(
              "/about"
            )}`}
            href={"/about"}
          >
            About Us
          </Link>
          <Link
            className={`mx-5 hover:text-black transition duration-300 ${isActive(
              "/find-job"
            )}`}
            href={"/find-job"}
          >
            Find Job
          </Link>
          {/* <Link
            className={`mx-5 hover:text-black transition duration-300 ${isActive(
              "/employers"
            )}`}
            href={"/employers"}
          >
            Employers
          </Link> */}
          <Link
            className={`mx-5 hover:text-black transition duration-300 ${isActive(
              "/offices"
            )}`}
            href={"/offices"}
          >
            Offices
          </Link>
        </div>

        <div className="hidden lg:block">
          <Link
            className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[#131226] hover:bg-[#131226] hover:text-white border-b-2 border-[#0F0D26] hover:border-[#FBB614] transition-colors duration-300 flex items-center group"
            href={"/authentication/login"}
          >
            <span>Login</span>
            <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
          </Link>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#131226] text-2xl focus:outline-none"
          >
            <FaBars />
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#F5F6F7] z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-[#0E0C25] text-2xl focus:outline-none"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col h-full py-4 px-6 text-[#404A60] font-semibold space-y-4">
          <Link
            className={`${
              isActive("/about") === "text-black"
                ? "text-black"
                : "text-[#404A60]"
            }`}
            href={"/about"}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            className={`${
              isActive("/find-job") === "text-black"
                ? "text-black"
                : "text-[#404A60]"
            }`}
            href={"/find-job"}
            onClick={() => setIsMenuOpen(false)}
          >
            Find Job
          </Link>
          {/* <Link
            className={`${
              isActive("/employers") === "text-black"
                ? "text-black"
                : "text-[#404A60]"
            }`}
            href={"/employers"}
            onClick={() => setIsMenuOpen(false)}
          >
            Employers
          </Link> */}
          <Link
            className={`${
              isActive("/offices") === "text-black"
                ? "text-black"
                : "text-[#404A60]"
            }`}
            href={"/offices"}
            onClick={() => setIsMenuOpen(false)}
          >
            Offices
          </Link>
          <Link
            className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[#131226] hover:bg-[#131226] hover:text-white border-b-2 border-[#0F0D26] hover:border-[#FBB614] transition-colors duration-300 flex items-center group"
            href={"/authentication/login"}
            onClick={() => setIsMenuOpen(false)}
          >
            <span>Login</span>
            <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};
