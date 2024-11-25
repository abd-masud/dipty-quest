import Link from "next/link";
import Image from "next/image";
import Course from "../../../../public/images/courses.png";
import { FaArrowRight } from "react-icons/fa";

export const Courses = () => {
  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 py-[50px]">
        <div className="grid grid-cols-3 mb-[50px]">
          <h2 className="col-span-2 text-[56px] text-[#222E48] font-semibold">
            Explore 4,000+ Free Online Courses
          </h2>
          <div className="flex flex-col justify-center">
            <p className="text-[#222E48] text-justify mb-5">
              Welcome to our diverse and dynamic course catalog. We&apos;re
              dedicated to providing you with access to high-quality education.
            </p>
            <Link
              className="mt-5 border-b border-black hover:border-[#2FA75F] hover:text-[#2FA75F] transition-colors duration-150 font-bold flex items-center group w-fit"
              href={"/courses"}
            >
              See All Courses
              <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6">
          <div className="border bg-[#F5F6F7] hover:border-[#2FA75F] hover:bg-white transition duration-300 rounded-lg flex flex-col gap-4 justify-center items-center group py-10">
            <div className="p-5 bg-white border group-hover:border-[#2FA75F] rounded-full transition duration-300">
              <Image
                className="rotate-0 group-hover:-rotate-[30deg] transition duration-300"
                src={Course}
                alt="Course 1"
              />
            </div>
            <h3 className="text-[#222E48] text-lg font-bold">Course</h3>
            <Link
              className="text-[#222E48] text-sm border px-5 py-2 rounded-full group-hover:bg-[#71F9A3] flex items-center transition duration-300"
              href={"/courses"}
            >
              4 Courses <FaArrowRight className="ml-1 text-sm" />
            </Link>
          </div>
          <div className="border bg-[#F5F6F7] hover:border-[#2FA75F] hover:bg-white transition duration-300 rounded-lg flex flex-col gap-4 justify-center items-center group py-10">
            <div className="p-5 bg-white border group-hover:border-[#2FA75F] rounded-full transition duration-300">
              <Image
                className="rotate-0 group-hover:-rotate-[30deg] transition duration-300"
                src={Course}
                alt="Course 1"
              />
            </div>
            <h3 className="text-[#222E48] text-lg font-bold">Course</h3>
            <Link
              className="text-[#222E48] text-sm border px-5 py-2 rounded-full group-hover:bg-[#71F9A3] flex items-center transition duration-300"
              href={"/courses"}
            >
              4 Courses <FaArrowRight className="ml-1 text-sm" />
            </Link>
          </div>
          <div className="border bg-[#F5F6F7] hover:border-[#2FA75F] hover:bg-white transition duration-300 rounded-lg flex flex-col gap-4 justify-center items-center group py-10">
            <div className="p-5 bg-white border group-hover:border-[#2FA75F] rounded-full transition duration-300">
              <Image
                className="rotate-0 group-hover:-rotate-[30deg] transition duration-300"
                src={Course}
                alt="Course 1"
              />
            </div>
            <h3 className="text-[#222E48] text-lg font-bold">Course</h3>
            <Link
              className="text-[#222E48] text-sm border px-5 py-2 rounded-full group-hover:bg-[#71F9A3] flex items-center transition duration-300"
              href={"/courses"}
            >
              4 Courses <FaArrowRight className="ml-1 text-sm" />
            </Link>
          </div>
          <div className="border bg-[#F5F6F7] hover:border-[#2FA75F] hover:bg-white transition duration-300 rounded-lg flex flex-col gap-4 justify-center items-center group py-10">
            <div className="p-5 bg-white border group-hover:border-[#2FA75F] rounded-full transition duration-300">
              <Image
                className="rotate-0 group-hover:-rotate-[30deg] transition duration-300"
                src={Course}
                alt="Course 1"
              />
            </div>
            <h3 className="text-[#222E48] text-lg font-bold">Course</h3>
            <Link
              className="text-[#222E48] text-sm border px-5 py-2 rounded-full group-hover:bg-[#71F9A3] flex items-center transition duration-300"
              href={"/courses"}
            >
              4 Courses <FaArrowRight className="ml-1 text-sm" />
            </Link>
          </div>
          <div className="border bg-[#F5F6F7] hover:border-[#2FA75F] hover:bg-white transition duration-300 rounded-lg flex flex-col gap-4 justify-center items-center group py-10">
            <div className="p-5 bg-white border group-hover:border-[#2FA75F] rounded-full transition duration-300">
              <Image
                className="rotate-0 group-hover:-rotate-[30deg] transition duration-300"
                src={Course}
                alt="Course 1"
              />
            </div>
            <h3 className="text-[#222E48] text-lg font-bold">Course</h3>
            <Link
              className="text-[#222E48] text-sm border px-5 py-2 rounded-full group-hover:bg-[#71F9A3] flex items-center transition duration-300"
              href={"/courses"}
            >
              4 Courses <FaArrowRight className="ml-1 text-sm" />
            </Link>
          </div>
          <div className="border bg-[#F5F6F7] hover:border-[#2FA75F] hover:bg-white transition duration-300 rounded-lg flex flex-col gap-4 justify-center items-center group py-10">
            <div className="p-5 bg-white border group-hover:border-[#2FA75F] rounded-full transition duration-300">
              <Image
                className="rotate-0 group-hover:-rotate-[30deg] transition duration-300"
                src={Course}
                alt="Course 1"
              />
            </div>
            <h3 className="text-[#222E48] text-lg font-bold">Course</h3>
            <Link
              className="text-[#222E48] text-sm border px-5 py-2 rounded-full group-hover:bg-[#71F9A3] flex items-center transition duration-300"
              href={"/courses"}
            >
              4 Courses <FaArrowRight className="ml-1 text-sm" />
            </Link>
          </div>
          <div className="border bg-[#F5F6F7] hover:border-[#2FA75F] hover:bg-white transition duration-300 rounded-lg flex flex-col gap-4 justify-center items-center group py-10">
            <div className="p-5 bg-white border group-hover:border-[#2FA75F] rounded-full transition duration-300">
              <Image
                className="rotate-0 group-hover:-rotate-[30deg] transition duration-300"
                src={Course}
                alt="Course 1"
              />
            </div>
            <h3 className="text-[#222E48] text-lg font-bold">Course</h3>
            <Link
              className="text-[#222E48] text-sm border px-5 py-2 rounded-full group-hover:bg-[#71F9A3] flex items-center transition duration-300"
              href={"/courses"}
            >
              4 Courses <FaArrowRight className="ml-1 text-sm" />
            </Link>
          </div>
          <div className="border bg-[#F5F6F7] hover:border-[#2FA75F] hover:bg-white transition duration-300 rounded-lg flex flex-col gap-4 justify-center items-center group py-10">
            <div className="p-5 bg-white border group-hover:border-[#2FA75F] rounded-full transition duration-300">
              <Image
                className="rotate-0 group-hover:-rotate-[30deg] transition duration-300"
                src={Course}
                alt="Course 1"
              />
            </div>
            <h3 className="text-[#222E48] text-lg font-bold">Course</h3>
            <Link
              className="text-[#222E48] text-sm border px-5 py-2 rounded-full group-hover:bg-[#71F9A3] flex items-center transition duration-300"
              href={"/courses"}
            >
              4 Courses <FaArrowRight className="ml-1 text-sm" />
            </Link>
          </div>
          <div className="border bg-[#F5F6F7] hover:border-[#2FA75F] hover:bg-white transition duration-300 rounded-lg flex flex-col gap-4 justify-center items-center group py-10">
            <div className="p-5 bg-white border group-hover:border-[#2FA75F] rounded-full transition duration-300">
              <Image
                className="rotate-0 group-hover:-rotate-[30deg] transition duration-300"
                src={Course}
                alt="Course 1"
              />
            </div>
            <h3 className="text-[#222E48] text-lg font-bold">Course</h3>
            <Link
              className="text-[#222E48] text-sm border px-5 py-2 rounded-full group-hover:bg-[#71F9A3] flex items-center transition duration-300"
              href={"/courses"}
            >
              4 Courses <FaArrowRight className="ml-1 text-sm" />
            </Link>
          </div>
          <div className="border bg-[#F5F6F7] hover:border-[#2FA75F] hover:bg-white transition duration-300 rounded-lg flex flex-col gap-4 justify-center items-center group py-10">
            <div className="p-5 bg-white border group-hover:border-[#2FA75F] rounded-full transition duration-300">
              <Image
                className="rotate-0 group-hover:-rotate-[30deg] transition duration-300"
                src={Course}
                alt="Course 1"
              />
            </div>
            <h3 className="text-[#222E48] text-lg font-bold">Course</h3>
            <Link
              className="text-[#222E48] text-sm border px-5 py-2 rounded-full group-hover:bg-[#71F9A3] flex items-center transition duration-300"
              href={"/courses"}
            >
              4 Courses <FaArrowRight className="ml-1 text-sm" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
