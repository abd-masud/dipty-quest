"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../../../../../public/images/logo.webp";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AiFillDashboard } from "react-icons/ai";
// import { FaGear } from "react-icons/fa6";
import { HiDocumentSearch } from "react-icons/hi";
// import { FaChevronDown } from "react-icons/fa";
import { BiSolidCalendarEvent } from "react-icons/bi";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdHotelClass } from "react-icons/md";

export const SideBar = () => {
  const pathname = usePathname();
  const [
    ,
    // openSection
    setOpenSection,
  ] = useState<string | null>(null);

  // const toggleSection = (section: string) => {
  //   setOpenSection(openSection == section ? null : section);
  // };

  // const handleSubMenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   e.stopPropagation();
  // };

  const closeSubmenu = () => {
    setOpenSection(null);
  };

  const linkClass = (route: string) =>
    `text-[13px] text-[#797c8b] hover:text-white font-[500] flex items-center transition duration-300 group h-11 border-t border-[#252D37] ${
      pathname == route ? "text-white bg-[#1E2639]" : ""
    }`;

  // const subLinkClass = (route: string) =>
  //   `text-[13px] text-[#797c8b] hover:text-white font-[500] flex items-center transition duration-300 group h-11 ${
  //     pathname == route ? "text-white" : ""
  //   }`;

  const linkBar = (route: string) =>
    `bg-[#fab616] h-[23px] w-[3px] group-hover:opacity-100 opacity-0 transition duration-300 ${
      pathname == route ? "opacity-100" : ""
    }`;

  return (
    <main className="bg-[#131226] h-screen">
      <Link
        className="text-white font-bold flex items-center text-[30px] px-8 py-[16.5px]"
        href={"/"}
      >
        <Image height={30} src={logo} alt={"Logo"} priority />
        <p className="text-white text-[24px] font-bold ml-2">DiptyQuest</p>
      </Link>
      <Link
        href={"/user-panel/professional"}
        className={linkClass("/user-panel/professional")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/user-panel/professional")}></div>
        <AiFillDashboard className="ml-[21px] text-[16px] mr-3 w-5" />
        Dashboard
      </Link>

      <Link
        href={"/user-panel/professional/gigs"}
        className={linkClass("/user-panel/professional/gigs")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/user-panel/professional/gigs")}></div>
        <MdHotelClass className="ml-[21px] text-[16px] mr-3 w-5" />
        Gigs
      </Link>

      <Link
        href={"/user-panel/professional/events"}
        className={linkClass("/user-panel/professional/events")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/user-panel/professional/events")}></div>
        <BiSolidCalendarEvent className="ml-[21px] text-[16px] mr-3 w-5" />
        Events
      </Link>

      <Link
        href={"/user-panel/professional/jobs"}
        className={linkClass("/user-panel/professional/jobs")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/user-panel/professional/jobs")}></div>
        <HiDocumentSearch className="ml-[21px] text-[16px] mr-3 w-5" />
        Job Applications
      </Link>

      <Link
        href={"/user-panel/professional/categories"}
        className={linkClass("/user-panel/professional/categories")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/user-panel/professional/categories")}></div>
        <BiSolidCategoryAlt className="ml-[21px] text-[16px] mr-3 w-5" />
        Categories
      </Link>

      {/* <button
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
          openSection == "settings"
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
      </div> */}
    </main>
  );
};
