import Image from "next/image";
import Event from "../../../../public/images/upcommin-vid.jpg";
import Link from "next/link";
import { FaArrowRight, FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

export const Events = () => {
  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 py-[50px] grid grid-cols-3 gap-6 items-stretch">
        <div className="col-span-2 flex flex-col justify-between">
          <div>
            <h2 className="text-[56px] text-[#222E48] font-semibold mb-5">
              Join Our Upcoming Events
            </h2>
            <p className="text-[#222E48] text-[18px] font-semibold text-justify mb-5">
              Join us for a variety of exciting events that cater to your
              interests and learning needs. Our events are designed to inspire
              and educate.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center py-5 px-10 bg-[#F5F6F7] rounded-xl border hover:border-[#2FA75F] transition duration-300">
              <div>
                <p className="text-[#3D3D3D] font-semibold">
                  <span className="text-[28px] text-[#0E0C25] block">09</span>
                  Sep-24
                </p>
              </div>
              <div className="text-[#222E48] my-auto border-x border-gray-400 border-dashed px-10">
                <div className="flex items-center">
                  <div className="flex items-center mr-10">
                    <FaRegClock className="mr-3" />
                    8:00 am to 5:00 pm
                  </div>
                  <div className="flex items-center">
                    <IoLocationOutline className="mr-2 mt-1" />
                    University of Dhaka
                  </div>
                </div>
                <p className="text-[23px] font-semibold">
                  Mindfulness and Wellbeing Retreat
                </p>
              </div>
              <div className="">
                <Link
                  className="font-semibold bg-[#71F9A3] px-5 py-2 rounded-full text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#71F9A3] transition-colors duration-300 flex items-center group"
                  href={"/"}
                >
                  <span>Join Now</span>
                  <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
                </Link>
              </div>
            </div>
            <div className="flex justify-between items-center py-5 px-10 bg-[#F5F6F7] rounded-xl border hover:border-[#2FA75F] transition duration-300">
              <div>
                <p className="text-[#3D3D3D] font-semibold">
                  <span className="text-[28px] text-[#0E0C25] block">09</span>
                  Sep-24
                </p>
              </div>
              <div className="text-[#222E48] my-auto border-x border-gray-400 border-dashed px-10">
                <div className="flex items-center">
                  <div className="flex items-center mr-10">
                    <FaRegClock className="mr-3" />
                    8:00 am to 5:00 pm
                  </div>
                  <div className="flex items-center">
                    <IoLocationOutline className="mr-2 mt-1" />
                    University of Dhaka
                  </div>
                </div>
                <p className="text-[23px] font-semibold">
                  Mindfulness and Wellbeing Retreat
                </p>
              </div>
              <div className="">
                <Link
                  className="font-semibold bg-[#71F9A3] px-5 py-2 rounded-full text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#71F9A3] transition-colors duration-300 flex items-center group"
                  href={"/"}
                >
                  <span>Join Now</span>
                  <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
                </Link>
              </div>
            </div>
            <div className="flex justify-between items-center py-5 px-10 bg-[#F5F6F7] rounded-xl border hover:border-[#2FA75F] transition duration-300">
              <div>
                <p className="text-[#3D3D3D] font-semibold">
                  <span className="text-[28px] text-[#0E0C25] block">09</span>
                  Sep-24
                </p>
              </div>
              <div className="text-[#222E48] my-auto border-x border-gray-400 border-dashed px-10">
                <div className="flex items-center">
                  <div className="flex items-center mr-10">
                    <FaRegClock className="mr-3" />
                    8:00 am to 5:00 pm
                  </div>
                  <div className="flex items-center">
                    <IoLocationOutline className="mr-2 mt-1" />
                    University of Dhaka
                  </div>
                </div>
                <p className="text-[23px] font-semibold">
                  Mindfulness and Wellbeing Retreat
                </p>
              </div>
              <div className="">
                <Link
                  className="font-semibold bg-[#71F9A3] px-5 py-2 rounded-full text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#71F9A3] transition-colors duration-300 flex items-center group"
                  href={"/"}
                >
                  <span>Join Now</span>
                  <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex">
            <Link
              className="font-semibold bg-[#71F9A3] px-5 py-2 rounded-full text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#71F9A3] transition-colors duration-300 flex items-center group mt-10"
              href={"/"}
            >
              <span>See All Events</span>
              <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
            </Link>
          </div>
        </div>
        <div className="relative group flex justify-center items-center">
          <Image
            className="rounded-lg object-cover h-full w-full"
            src={Event}
            alt=""
          />
          <div className="absolute inset-0 bg-black rounded-lg opacity-50 transition-opacity duration-300 group-hover:opacity-60"></div>
          <button className="absolute bg-[#2FA75F] p-5 rounded-full text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#71F9A3] transition duration-300">
            <FaPlay />
          </button>
        </div>
      </div>
    </main>
  );
};
