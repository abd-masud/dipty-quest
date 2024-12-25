"use client";

import { useEffect, useState } from "react";
import { Popover } from "antd";
import Link from "next/link";
import { VscThreeBars } from "react-icons/vsc";
import { FaUser } from "react-icons/fa";
import { MdFullscreen, MdOutlineFullscreenExit } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/components/Frontend/Context/AuthContext";

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const handleFullScreenChange = () => {
    setIsFullScreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.clear();
      setUser(null);
      router.push("/dashboard/authentication/login");
    } catch {}
  };

  const popoverContent = (
    <div className="w-44">
      <div className="flex border-b mt-1 pl-3">
        <div className="mb-4">
          <p className="font-[500] text-black text-[14px]">{user?.name}</p>
          <p className="text-[13px] text-[#797c8b]">{user?.role}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 my-3 border-b">
        <Link
          className="bg-white text-black hover:bg-[#EDF2F6] hover:text-[#00A3FF] transition duration-300 px-3 py-2 rounded text-[14px] flex items-center"
          href={"/dashboard/profile"}
        >
          <FaUser className="text-[12px] mr-3" />
          My Profile
        </Link>
        <Link
          className="bg-white text-black hover:bg-[#EDF2F6] hover:text-[#00A3FF] transition duration-300 px-3 py-2 rounded text-[14px] flex items-center mb-3"
          href={"/dashboard/authentication/change-password"}
        >
          <FaKey className="text-[12px] mr-3" />
          Change Password
        </Link>
      </div>
      <button
        className="font-semibold bg-[#FAB616] w-full py-2 rounded-full text-[#131226] hover:bg-[#131226] hover:text-white border-b-2 border-[#0F0D26] hover:border-[#FBB614] transition-colors duration-300 flex items-center justify-center group"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="mr-2" />
        Log out
      </button>
    </div>
  );

  return (
    <main className="flex justify-between items-center h-[70px] p-5 shadow-md w-full bg-white border-b border-[#dddddd]">
      <div className="flex items-center">
        <button
          className="text-[#6E6F78] px-3 py-1 border rounded-md"
          onClick={toggleSidebar}
        >
          <VscThreeBars className="fill-black" />
        </button>
      </div>
      <div className="flex items-center gap-3">
        {/* <form>
          <div className="flex items-center border rounded-full">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-full text-[12px] py-1 px-3 focus:outline-none focus:ring-0 w-[120px] sm:w-auto transition duration-300"
            />
            <IoIosSearch className="h-7 w-7 p-1 fill-black" />
          </div>
        </form> */}
        <button onClick={toggleFullScreen}>
          {isFullScreen ? (
            <MdOutlineFullscreenExit className="h-8 w-8 fill-black" />
          ) : (
            <MdFullscreen className="h-8 w-8 fill-black" />
          )}
        </button>
        <Popover
          content={popoverContent}
          trigger="click"
          placement="bottomRight"
        >
          <button className="font-semibold bg-[#FAB616]  h-10 w-10 rounded-full text-[#131226] hover:bg-[#131226] hover:text-white border-b-2 border-[#0F0D26] hover:border-[#FBB614] transition-colors duration-300 flex items-center justify-center group">
            <FaUser className="" />
          </button>
        </Popover>
      </div>
    </main>
  );
};
