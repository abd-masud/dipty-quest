import { FaLinkedinIn, FaMediumM } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import { FaRedditAlien } from "react-icons/fa";
import { FaQuora } from "react-icons/fa";
import { FaMeetup } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { IoMailOpenOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import Link from "next/link";
import { LiaFacebookF } from "react-icons/lia";

export const Footer = () => {
  return (
    <footer className="bg-[#1C1D20]">
      <div className="max-w-screen-xl mx-auto divide-y px-4 divide-dashed">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 items-start sm:py-10 py-5">
          <div className="">
            <h2 className="text-white md:text-[45px] text-[30px] font-semibold md:leading-[50px] leading-[40px] mb-5">
              <span className="text-[#FAB616]">Hunting </span>for innovative
              concepts?
            </h2>
            <p className="text-white">
              Greetings from our vibrant and varied course selection. We at
              DiptyQuest are dedicated to providing you an opportunity to
              receive superior instruction that fosters both your career and
              personal growth.
            </p>
            <div className="flex md:justify-start justify-between md:gap-4 md:mt-10 mt-5">
              <Link
                className="text-[#FAB616] hover:text-[#131226] border border-[#FAB616] rounded-full p-2 sm:text-[20px] text-[12px] bg-transparent hover:bg-[#FAB616] transition duration-300"
                href={"https://www.linkedin.com/in/diptyquest-a1225633a/"}
              >
                <span className="sr-only">Visit LinkedIn profile</span>
                <FaLinkedinIn />
              </Link>
              <Link
                className="text-[#FAB616] hover:text-[#131226] border border-[#FAB616] rounded-full p-2 sm:text-[20px] text-[12px] bg-transparent hover:bg-[#FAB616] transition duration-300"
                href={"https://medium.com/@diptyquest"}
              >
                <span className="sr-only">Visit Medium profile</span>
                <FaMediumM />
              </Link>
              <Link
                className="text-[#FAB616] hover:text-[#131226] border border-[#FAB616] rounded-full p-2 sm:text-[20px] text-[12px] bg-transparent hover:bg-[#FAB616] transition duration-300"
                href={"https://x.com/DDiptyquest"}
              >
                <span className="sr-only">Visit Twitter profile</span>
                <FaXTwitter />
              </Link>
              <Link
                className="text-[#FAB616] hover:text-[#131226] border border-[#FAB616] rounded-full p-2 sm:text-[20px] text-[12px] bg-transparent hover:bg-[#FAB616] transition duration-300"
                href={
                  "https://www.facebook.com/share/14qoQALzvp/?mibextid=wwXIfr"
                }
              >
                <span className="sr-only">Visit Facebook profile</span>
                <LiaFacebookF />
              </Link>
              <Link
                className="text-[#FAB616] hover:text-[#131226] border border-[#FAB616] rounded-full p-2 sm:text-[20px] text-[12px] bg-transparent hover:bg-[#FAB616] transition duration-300"
                href={"https://www.pinterest.com/diptyquest/"}
              >
                <span className="sr-only">Visit Pinterest profile</span>
                <FaPinterestP />
              </Link>
              <Link
                className="text-[#FAB616] hover:text-[#131226] border border-[#FAB616] rounded-full p-2 sm:text-[20px] text-[12px] bg-transparent hover:bg-[#FAB616] transition duration-300"
                href={"https://www.reddit.com/user/Equivalent_Horse3272/"}
              >
                <span className="sr-only">Visit Reddit profile</span>
                <FaRedditAlien />
              </Link>
              <Link
                className="text-[#FAB616] hover:text-[#131226] border border-[#FAB616] rounded-full p-2 sm:text-[20px] text-[12px] bg-transparent hover:bg-[#FAB616] transition duration-300"
                href={"https://www.quora.com/profile/Dipty-Quest"}
              >
                <span className="sr-only">Visit Quora profile</span>
                <FaQuora />
              </Link>
              <Link
                className="text-[#FAB616] hover:text-[#131226] border border-[#FAB616] rounded-full p-2 sm:text-[20px] text-[12px] bg-transparent hover:bg-[#FAB616] transition duration-300"
                href={"https://www.meetup.com/members/452183452/"}
              >
                <span className="sr-only">Visit Meetup profile</span>
                <FaMeetup />
              </Link>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-white md:text-[32px] text-[26px] font-semibold">
                Navigation
              </h2>
              <div className="flex md:flex-col justify-between gap-4">
                <div>
                  <Link
                    className="inline text-white hover:text-[#FAB616] transition duration-300"
                    href={"/"}
                  >
                    Home
                  </Link>
                </div>
                <div>
                  <Link
                    className="inline text-white hover:text-[#FAB616] transition duration-300"
                    href={"/about"}
                  >
                    About Us
                  </Link>
                </div>
                <div>
                  <Link
                    className="inline text-white hover:text-[#FAB616] transition duration-300"
                    href={"/find-job"}
                  >
                    Find Job
                  </Link>
                </div>
                <div>
                  <Link
                    className="inline text-white hover:text-[#FAB616] transition duration-300"
                    href={"/offices"}
                  >
                    Offices
                  </Link>
                </div>
                <div>
                  <Link
                    className="inline text-white hover:text-[#FAB616] transition duration-300"
                    href={"/authentication/login"}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-white md:text-[32px] text-[26px] font-semibold mb-3">
                Contact Us
              </h2>
              <div className="flex items-center gap-4 mb-5">
                <div className="sm:p-3 p-2 rounded-full border border-[#FAB616] text-[#FAB616] text-[24px]">
                  <IoCallOutline />
                </div>
                <p className="text-white">09647123456</p>
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="sm:p-3 p-2 rounded-full border border-[#FAB616] text-[#FAB616] text-[24px]">
                  <IoMailOpenOutline />
                </div>
                <p className="text-white">info @ diptyquest.com</p>
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="sm:p-3 p-2 rounded-full border border-[#FAB616] text-[#FAB616] text-[24px]">
                  <MdOutlineLocationOn />
                </div>
                <p className="text-white">
                  Chandra Mollika, Plot-398, Road-06, Avenue-01, Mirpur DOHS,
                  Level-1
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:py-10 py-5">
          <div className="lg:flex block justify-between items-center">
            <p className="text-white lg:text-left text-center">
              Copyright © 2024{" "}
              <Link href="/" className="text-[#FAB616]">
                DiptyQuest
              </Link>{" "}
              All Rights Reserved.
            </p>
            <div className="text-center lg:mt-0 mt-2">
              <Link
                className="text-white hover:text-[#FAB616] transition duration-300"
                href={"/terms-conditions"}
              >
                Terms&nbsp;&&nbsp;Conditions
              </Link>
              <Link
                className="text-white hover:text-[#FAB616] transition duration-300 ml-10"
                href={"/privacy-policy"}
              >
                Privacy&nbsp;Policy
              </Link>
              <Link
                className="text-white hover:text-[#FAB616] transition duration-300 sm:ml-10 ml-0 block sm:inline"
                href={"/refund-policy"}
              >
                Refund&nbsp;Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
