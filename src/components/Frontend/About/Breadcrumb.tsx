import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export const Breadcrumbs = () => {
  return (
    <main className="bg-breadcrumbs_bg bg-cover bg-right md:py-10 py-5 border-b-4 border-[#131226]">
      <div className="max-w-screen-xl mx-auto px-4 text-white">
        <div className="md:block hidden">
          <p className="flex items-center font-semibold">
            <Link href={"/"}>DiptyQuest</Link> <FaAngleRight className="mx-3" />{" "}
            About Us
          </p>
        </div>
        <h2 className="md:text-[48px] text-[40px] font-semibold">About Us</h2>
        <p>Let&apos;s Discover More About Us</p>
      </div>
    </main>
  );
};
