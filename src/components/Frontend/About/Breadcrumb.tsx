import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export const Breadcrumbs = () => {
  return (
    <main className="relative bg-breadcrumbs_bg bg-cover bg-right md:py-10 py-5 border-b-4 border-[#131226]">
      <div className="max-w-screen-xl mx-auto px-4 relative z-10 text-white">
        <div className=" md:block hidden">
          <p className="flex items-center font-semibold">
            <Link href={"/"}>DiptyQuest</Link> <FaAngleRight className="mx-5" />{" "}
            About Us
          </p>
        </div>
        <h2 className="text-[48px] font-semibold">About Us</h2>
        <p>Wants to Know About DiptyQuest?</p>
      </div>
    </main>
  );
};
