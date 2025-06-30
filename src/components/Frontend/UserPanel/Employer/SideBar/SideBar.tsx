"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../../../../../public/images/logo.webp";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AiFillDashboard } from "react-icons/ai";
import { BiSolidLayerPlus } from "react-icons/bi";
import { MdPostAdd } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
import { FaGears } from "react-icons/fa6";

export const SideBar = () => {
  const pathname = usePathname();
  const [, setOpenSection] = useState<string | null>(null);

  const closeSubmenu = () => {
    setOpenSection(null);
  };

  const linkClass = (route: string) =>
    `text-[13px] text-[#797c8b] hover:text-white font-[500] flex items-center transition duration-300 group h-11 border-t border-[#252D37] ${
      pathname == route ? "text-white bg-[#1E2639]" : ""
    }`;

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
        href={"/user-panel/employer"}
        className={linkClass("/user-panel/employer")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/user-panel/employer")}></div>
        <AiFillDashboard className="ml-[21px] text-[16px] mr-3 w-5" />
        Dashboard
      </Link>

      <Link
        href={"/user-panel/employer/new-job-post"}
        className={linkClass("/user-panel/employer/new-job-post")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/user-panel/employer/new-job-post")}></div>
        <BiSolidLayerPlus className="ml-[21px] text-[16px] mr-3 w-5" />
        New Job Post
      </Link>

      <Link
        href={"/user-panel/employer/posted-jobs"}
        className={linkClass("/user-panel/employer/posted-jobs")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/user-panel/employer/posted-jobs")}></div>
        <MdPostAdd className="ml-[21px] text-[16px] mr-3 w-5" />
        Posted Jobs
      </Link>

      <Link
        href={"/user-panel/employer/applicants"}
        className={linkClass("/user-panel/employer/applicants")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/user-panel/employer/applicants")}></div>
        <FaUserPlus className="ml-[21px] text-[14px] mr-3 w-5" />
        Applicants
      </Link>

      <Link
        href={"/user-panel/employer/settings"}
        className={linkClass("/user-panel/employer/settings")}
        onClick={closeSubmenu}
      >
        <div className={linkBar("/user-panel/employer/settings")}></div>
        <FaGears className="ml-[21px] text-[14px] mr-3 w-5" />
        Settings
      </Link>
    </main>
  );
};
