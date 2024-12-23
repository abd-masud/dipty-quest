"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/images/logo.png";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AiFillDashboard } from "react-icons/ai";
import { FaGear } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { BiSolidCalendarEvent } from "react-icons/bi";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdHotelClass } from "react-icons/md";
// import { RiCommunityFill } from "react-icons/ri";

export const SideBar = () => {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSubMenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const closeSubmenu = () => {
    setOpenSection(null);
  };

  const linkClass = (route: string) =>
    `text-[13px] text-[#797c8b] hover:text-white font-[500] flex items-center transition duration-300 group h-11 border-t border-[#252D37] ${
      pathname === route ? "text-white bg-[#1E2639]" : ""
    }`;

  const subLinkClass = (route: string) =>
    `text-[13px] text-[#797c8b] hover:text-white font-[500] flex items-center transition duration-300 group h-11 ${
      pathname === route ? "text-white" : ""
    }`;

  const linkBar = (route: string) =>
    `bg-[#fab616] h-[23px] w-[3px] group-hover:opacity-100 opacity-0 transition duration-300 ${
      pathname === route ? "opacity-100" : ""
    }`;

  return (
    <main className="bg-[#131226] h-screen">
      <p className="text-white font-bold flex items-center text-[30px] px-8 py-[16.5px]">
        <Image height={30} src={logo} alt={"Logo"} priority />
        <p className="text-white text-[24px] font-bold ml-2">DiptyQuest</p>
      </p>
      <Link
        href={"/dashboard"}
        className={linkClass("/dashboard")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/dashboard")}></div>
        <AiFillDashboard className="ml-[21px] text-[16px] mr-3 w-5" />
        Dashboard
      </Link>

      <button
        onClick={() => toggleSection("users")}
        className={`text-[13px] text-[#797c8b] hover:text-white font-[500] flex items-center justify-between pr-5 transition duration-300 group h-11 w-full border-t border-[#252D37] ${
          pathname.includes("/dashboard/users") ? "text-white bg-[#1E2639]" : ""
        }`}
      >
        <div className="flex items-center">
          <div className="bg-[#fab616] h-[23px] w-[3px] group-hover:opacity-100 opacity-0 transition duration-300"></div>
          <HiUserGroup className="ml-[21px] text-[16px] mr-3 w-5" />
          User Manager
        </div>
        <FaChevronDown />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 transform ${
          openSection === "users"
            ? "max-h-[180px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-[56px] bg-[#1D1B31] text-[13px]">
          <Link
            className={subLinkClass("/dashboard/users/students")}
            href="/dashboard/users/students"
            onClick={handleSubMenuClick}
          >
            Students
          </Link>

          <Link
            className={subLinkClass("/dashboard/users/employers")}
            href="/dashboard/users/employers"
            onClick={handleSubMenuClick}
          >
            Employers
          </Link>

          <Link
            className={subLinkClass("/dashboard/users/professionals")}
            href="/dashboard/users/professionals"
            onClick={handleSubMenuClick}
          >
            Professionals
          </Link>

          <Link
            className={subLinkClass("/dashboard/users/entrepreneurs")}
            href="/dashboard/users/entrepreneurs"
            onClick={handleSubMenuClick}
          >
            Entrepreneurs
          </Link>
        </div>
      </div>

      <button
        onClick={() => toggleSection("categories")}
        className={`text-[13px] text-[#797c8b] hover:text-white font-[500] flex items-center justify-between pr-5 transition duration-300 group h-11 w-full border-t border-[#252D37] ${
          pathname.includes("/dashboard/categories")
            ? "text-white bg-[#1E2639]"
            : ""
        }`}
      >
        <div className="flex items-center">
          <div className="bg-[#fab616] h-[23px] w-[3px] group-hover:opacity-100 opacity-0 transition duration-300"></div>
          <BiSolidCategoryAlt className="ml-[21px] text-[16px] mr-3 w-5" />
          Categories
        </div>
        <FaChevronDown />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 transform ${
          openSection === "categories"
            ? "max-h-[90px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-[56px] bg-[#1D1B31] text-[13px]">
          <Link
            className={subLinkClass(
              "/dashboard/categories/categories-contents"
            )}
            href="/dashboard/categories/categories-contents"
            onClick={handleSubMenuClick}
          >
            Categories Contents
          </Link>

          <Link
            className={subLinkClass("/dashboard/categories/shared-plans")}
            href="/dashboard/categories/shared-plans"
            onClick={handleSubMenuClick}
          >
            Shared Plans
          </Link>
        </div>
      </div>

      <Link
        href={"/dashboard/gigs"}
        className={linkClass("/dashboard/gigs")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/dashboard/gigs")}></div>
        <MdHotelClass className="ml-[21px] text-[16px] mr-3 w-5" />
        Gigs
      </Link>

      <button
        onClick={() => toggleSection("events")}
        className={`text-[13px] text-[#797c8b] hover:text-white font-[500] flex items-center justify-between pr-5 transition duration-300 group h-11 w-full border-t border-[#252D37] ${
          pathname.includes("/dashboard/events")
            ? "text-white bg-[#1E2639]"
            : ""
        }`}
      >
        <div className="flex items-center">
          <div className="bg-[#fab616] h-[23px] w-[3px] group-hover:opacity-100 opacity-0 transition duration-300"></div>
          <BiSolidCalendarEvent className="ml-[21px] text-[16px] mr-3 w-5" />
          Events
        </div>
        <FaChevronDown />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 transform ${
          openSection === "events"
            ? "max-h-[90px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-[56px] bg-[#1D1B31] text-[13px]">
          <Link
            className={subLinkClass("/dashboard/events/events-list")}
            href="/dashboard/events/events-list"
            onClick={handleSubMenuClick}
          >
            Events List
          </Link>

          <Link
            className={subLinkClass("/dashboard/events/registered")}
            href="/dashboard/events/registered"
            onClick={handleSubMenuClick}
          >
            Registered
          </Link>
        </div>
      </div>

      {/* <Link
        href={"/dashboard/communities"}
        className={linkClass("/dashboard/communities")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/dashboard/communities")}></div>
        <RiCommunityFill className="ml-[21px] text-[16px] mr-3 w-5" />
        Communities
      </Link> */}

      <button
        onClick={() => toggleSection("settings")}
        className={`text-[13px] text-[#797c8b] hover:text-white font-[500] flex items-center justify-between pr-5 transition duration-300 group h-11 w-full border-t border-[#252D37] ${
          pathname.includes("/dashboard/settings")
            ? "text-white bg-[#1E2639]"
            : ""
        }`}
      >
        <div className="flex items-center">
          <div className="bg-[#fab616] h-[23px] w-[3px] group-hover:opacity-100 opacity-0 transition duration-300"></div>
          <FaGear className="ml-[21px] text-[16px] mr-3 w-5" />
          Settings
        </div>
        <FaChevronDown />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 transform ${
          openSection === "settings"
            ? "max-h-[90px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-[56px] bg-[#1D1B31] text-[13px]">
          <Link
            className={subLinkClass("/terms-conditions")}
            href="/dashboard/terms-conditions"
            onClick={handleSubMenuClick}
          >
            Terms & Conditions
          </Link>

          <Link
            className={subLinkClass("/privacy-policy")}
            href="/dashboard/privacy-policy"
            onClick={handleSubMenuClick}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
};
