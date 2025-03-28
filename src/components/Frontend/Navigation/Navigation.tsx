"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/images/logo.webp";
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";

interface JwtPayload {
  role: string;
  name: string;
  email: string;
}

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<JwtPayload>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (!token) {
      return;
    }

    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      setFormData({
        role: decodedPayload?.role,
        name: decodedPayload?.name,
        email: decodedPayload?.email,
      });
    } catch {}
  }, []);

  const getRoleLink = () => {
    switch (formData.role) {
      case "student":
        return "/user-panel/student";
      case "employer":
        return "/user-panel/employer";
      case "professional":
        return "/user-panel/professional";
      case "entrepreneur":
        return "/user-panel/entrepreneur";
      case "guest":
        return "/user-panel/guest";
      default:
        return "/authentication/login";
    }
  };

  const isActive = (href: string) => {
    return pathname == href ? "text-black" : "text-[#404A60]";
  };

  const shouldShowSearch = formData.role !== "employer";

  return (
    <div className="shadow-lg bg-[#F5F6F7]">
      <div className="flex items-center justify-between sm:py-5 py-3 px-4 max-w-screen-xl mx-auto">
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
          <div className="flex items-center gap-5">
            {shouldShowSearch && (
              <div>
                <form
                  onSubmit={handleSearch}
                  className="flex gap-2 relative justify-end"
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2 pl-3 rounded-full outline-none w-[130px] sm:w-[180px] text-[12px]"
                  />
                  <button
                    type="submit"
                    className="absolute font-semibold bg-[#FAB616] rounded-full text-[12px] h-7 w-7 mt-1 mr-1 text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#FAB616] transition-colors duration-300 flex items-center justify-center group"
                  >
                    <IoSearch className="transition-transform duration-300 text-sm" />
                  </button>
                </form>
              </div>
            )}
            <Link
              href={getRoleLink()}
              className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[#131226] hover:bg-[#131226] hover:text-white border-b-2 border-[#0F0D26] hover:border-[#FBB614] transition-colors duration-300 flex items-center group"
            >
              {formData.name ? (
                <>
                  <span>{formData.name}</span>
                  <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
                </>
              ) : (
                <>
                  <span>Login</span>
                  <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
                </>
              )}
            </Link>
          </div>
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
              isActive("/about") == "text-black"
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
              isActive("/find-job") == "text-black"
                ? "text-black"
                : "text-[#404A60]"
            }`}
            href={"/find-job"}
            onClick={() => setIsMenuOpen(false)}
          >
            Find Job
          </Link>
          <Link
            className={`${
              isActive("/offices") == "text-black"
                ? "text-black"
                : "text-[#404A60]"
            }`}
            href={"/offices"}
            onClick={() => setIsMenuOpen(false)}
          >
            Offices
          </Link>
          {shouldShowSearch && (
            <div>
              <form
                onSubmit={handleSearch}
                className="flex gap-2 relative justify-end"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border p-2 pl-3 rounded-full outline-none w-full text-[12px]"
                />
                <button
                  type="submit"
                  className="absolute font-semibold bg-[#FAB616] rounded-full text-[12px] h-7 w-7 mt-1 mr-1 text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#FAB616] transition-colors duration-300 flex items-center justify-center group"
                >
                  <IoSearch className="transition-transform duration-300 text-sm" />
                </button>
              </form>
            </div>
          )}
          <Link
            href={getRoleLink()}
            className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[#131226] hover:bg-[#131226] hover:text-white border-b-2 border-[#0F0D26] hover:border-[#FBB614] transition-colors duration-300 flex items-center group"
            onClick={() => setIsMenuOpen(false)}
          >
            {formData.name ? (
              <>
                <span>{formData.name}</span>
                <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
              </>
            ) : (
              <>
                <span>Login</span>
                <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
              </>
            )}
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
