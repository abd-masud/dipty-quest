import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import { FaRedditAlien } from "react-icons/fa";
import { FaQuora } from "react-icons/fa";
import { FaMeetup } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { IoMailOpenOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#1C1D20]">
      <div className="max-w-screen-xl mx-auto divide-y px-4 divide-dashed">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 items-start py-10">
          <div className="">
            <h2 className="text-white text-[45px] font-semibold leading-[50px] mb-5">
              <span className="text-[#FAB616]">Hunting </span>for innovative
              concepts?
            </h2>
            <p className="text-white">
              Greetings from our vibrant and varied course selection. We at
              DiptyQuest are dedicated to providing you an opportunity to
              receive superior instruction that fosters both your career and
              personal growth.
            </p>
            <div className="flex md:justify-start justify-between gap-4 md:mt-10 mt-5">
              <Link
                className="text-[#FAB616] hover:text-[#131226] border border-[#FAB616] rounded-full p-2 text-[20px] bg-transparent hover:bg-[#FAB616] transition duration-300"
                href={"https://www.linkedin.com/in/dipty-quest-a1225633a/"}
              >
                <span className="sr-only">Visit LinkedIn profile</span>
                <FaLinkedinIn />
              </Link>
              <Link
                className="text-[#FAB616] hover:text-[#131226] border border-[#FAB616] rounded-full p-2 text-[20px] bg-transparent hover:bg-[#FAB616] transition duration-300"
                href={"https://x.com/DDiptyquest"}
              >
                <span className="sr-only">Visit Twitter profile</span>
                <FaXTwitter />
              </Link>
              <Link
                className="text-[#FAB616] hover:text-[#131226] border border-[#FAB616] rounded-full p-2 text-[20px] bg-transparent hover:bg-[#FAB616] transition duration-300"
                href={"https://www.pinterest.com/diptyquest/"}
              >
                <span className="sr-only">Visit Pinterest profile</span>
                <FaPinterestP />
              </Link>
              <Link
                className="text-[#FAB616] hover:text-[#131226] border border-[#FAB616] rounded-full p-2 text-[20px] bg-transparent hover:bg-[#FAB616] transition duration-300"
                href={"https://www.reddit.com/user/Equivalent_Horse3272/"}
              >
                <span className="sr-only">Visit Reddit profile</span>
                <FaRedditAlien />
              </Link>
              <Link
                className="text-[#FAB616] hover:text-[#131226] border border-[#FAB616] rounded-full p-2 text-[20px] bg-transparent hover:bg-[#FAB616] transition duration-300"
                href={"https://www.quora.com/profile/Dipty-Quest"}
              >
                <span className="sr-only">Visit Quora profile</span>
                <FaQuora />
              </Link>
              <Link
                className="text-[#FAB616] hover:text-[#131226] border border-[#FAB616] rounded-full p-2 text-[20px] bg-transparent hover:bg-[#FAB616] transition duration-300"
                href={"https://www.meetup.com/members/452183452/"}
              >
                <span className="sr-only">Visit Meetup profile</span>
                <FaMeetup />
              </Link>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-white text-[32px] font-semibold">
                Navigation
              </h2>
              <div className="flex sm:flex-col justify-between gap-4">
                <Link
                  className="text-white hover:text-[#FAB616] transition duration-300"
                  href={"/"}
                >
                  Home
                </Link>
                <Link
                  className="text-white hover:text-[#FAB616] transition duration-300"
                  href={"/about"}
                >
                  About Us
                </Link>
                <Link
                  className="text-white hover:text-[#FAB616] transition duration-300"
                  href={"/find-job"}
                >
                  Find Job
                </Link>
                <Link
                  className="text-white hover:text-[#FAB616] transition duration-300"
                  href={"/offices"}
                >
                  Offices
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-white text-[32px] font-semibold mb-3">
                Contact Us
              </h2>
              <div className="flex items-center gap-4 mb-5 group">
                <div className="p-3 rounded-full border border-[#FAB616] text-[#FAB616] group-hover:text-[#131226] group-hover:bg-[#FAB616] text-[24px] transition duration-300">
                  <IoCallOutline />
                </div>
                <p className="text-white">09647123456</p>
              </div>
              <div className="flex items-center gap-4 mb-5 group">
                <div className="p-3 rounded-full border border-[#FAB616] text-[#FAB616] group-hover:text-[#131226] group-hover:bg-[#FAB616] text-[24px] transition duration-300">
                  <IoMailOpenOutline />
                </div>
                <p className="text-white">info@diptyquest.com</p>
              </div>
              <div className="flex items-center gap-4 mb-5 group">
                <div className="p-3 rounded-full border border-[#FAB616] text-[#FAB616] group-hover:text-[#131226] group-hover:bg-[#FAB616] text-[24px] transition duration-300">
                  <MdOutlineLocationOn />
                </div>
                <p className="text-white">House #146, Rd No. 2, Dhaka 1206</p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-10">
          <div className="md:flex block justify-between items-center">
            <p className="text-white md:text-left text-center">
              Copyright © 2024{" "}
              <Link href="/" className="text-[#FAB616]">
                DiptyQuest
              </Link>{" "}
              All Rights Reserved.
            </p>
            <div className="md:text-right text-center md:mt-0 mt-5">
              <Link
                className="text-white hover:text-[#FAB616] transition duration-300"
                href={"/terms-conditions"}
              >
                Terms & Conditions
              </Link>
              <Link
                className="text-white hover:text-[#FAB616] transition duration-300 ml-10"
                href={"/privacy-policy"}
              >
                Privacy Policy
              </Link>
              <Link
                className="text-white hover:text-[#FAB616] transition duration-300 ml-10"
                href={"/refund-policy"}
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
