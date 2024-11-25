import Link from "next/link";
import Image from "next/image";
import community from "../../../../public/images/comm1.png";
import { FaArrowRight } from "react-icons/fa";

export const Community = () => {
  return (
    <main className="bg-[#F5F6F7]">
      <div className="max-w-screen-xl mx-auto px-4 py-[50px]">
        <div className="grid grid-cols-3 mb-[50px]">
          <h2 className="col-span-2 text-[56px] text-[#222E48] font-semibold">
            Life Learning Community Hub
          </h2>
          <div className="flex flex-col justify-center">
            <p className="text-[#222E48] text-justify mb-5">
              Explore the philosophy that drives Edufast, shaping an educational
              ecosystem that values curiosity, collaboration
            </p>
            <Link
              className="mt-5 border-b border-black hover:border-[#2FA75F] hover:text-[#2FA75F] transition-colors duration-150 font-bold flex items-center group w-fit"
              href={"/courses"}
            >
              Browsing Course
              <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-4">
          <div className="m-5 border bg-white hover:border-[#2FA75F] transition duration-300 rounded-lg flex flex-col justify-center items-center group py-10">
            <Image className="" src={community} alt="Course 1" />
            <Link
              className="text-[#222E48] hover:text-[#2FA75F] text-lg my-3 font-bold transition duration-300"
              href={""}
            >
              Exclusive Coach
            </Link>
            <p className="text-center mx-5">
              We believe in the power of education to transform
            </p>
          </div>
          <div className="m-5 border bg-white hover:border-[#2FA75F] transition duration-300 rounded-lg flex flex-col justify-center items-center group py-10">
            <Image className="" src={community} alt="Course 1" />
            <Link
              className="text-[#222E48] hover:text-[#2FA75F] text-lg my-3 font-bold transition duration-300"
              href={""}
            >
              Exclusive Coach
            </Link>
            <p className="text-center mx-5">
              We believe in the power of education to transform
            </p>
          </div>
          <div className="m-5 border bg-white hover:border-[#2FA75F] transition duration-300 rounded-lg flex flex-col justify-center items-center group py-10">
            <Image className="" src={community} alt="Course 1" />
            <Link
              className="text-[#222E48] hover:text-[#2FA75F] text-lg my-3 font-bold transition duration-300"
              href={""}
            >
              Exclusive Coach
            </Link>
            <p className="text-center mx-5">
              We believe in the power of education to transform
            </p>
          </div>
          <div className="m-5 border bg-white hover:border-[#2FA75F] transition duration-300 rounded-lg flex flex-col justify-center items-center group py-10">
            <Image className="" src={community} alt="Course 1" />
            <Link
              className="text-[#222E48] hover:text-[#2FA75F] text-lg my-3 font-bold transition duration-300"
              href={""}
            >
              Exclusive Coach
            </Link>
            <p className="text-center mx-5">
              We believe in the power of education to transform
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
