import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export const Breadcrumbs = () => {
  return (
    <main className="bg-breadcrumbs_bg bg-cover bg-right md:py-10 py-5 border-b-4 border-[#131226]">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="md:block hidden">
          <p className="flex items-center font-semibold">
            <Link href={"/"}>DiptyQuest</Link> <FaAngleRight className="mx-3" />{" "}
            <Link href={"/create-account"}>Create Account</Link>{" "}
            <FaAngleRight className="mx-3" /> Entrepreneur
          </p>
        </div>
        <h2 className="md:text-[48px] text-[40px] font-semibold">
          Register as Entrepreneur
        </h2>
        <p>Wants to Join With Us?</p>
      </div>
    </main>
  );
};
