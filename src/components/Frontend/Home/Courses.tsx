import Link from "next/link";
import Image from "next/image";
import CourseImage from "../../../../public/images/courses.png";
import { FaArrowRight } from "react-icons/fa";

const coursesData = [
  { id: 1, name: "Course 1", count: 4 },
  { id: 2, name: "Course 2", count: 10 },
  { id: 3, name: "Course 3", count: 6 },
  { id: 4, name: "Course 4", count: 15 },
  { id: 5, name: "Course 5", count: 9 },
  { id: 6, name: "Course 1", count: 4 },
  { id: 7, name: "Course 2", count: 10 },
  { id: 8, name: "Course 3", count: 6 },
  { id: 9, name: "Course 4", count: 15 },
  { id: 10, name: "Course 5", count: 9 },
];

export const Courses = () => {
  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 md:py-[50px] py-10">
        <div className="md:grid block grid-cols-3 mb-[50px]">
          <h2 className="col-span-2 md:text-[56px] text-[35px] text-[#131226] font-semibold md:mb-0 mb-2">
            Explore 4,000+ Free Online Courses
          </h2>
          <div className="flex flex-col justify-center">
            <p className="text-[#131226] text-justify md:mb-5 mb-1">
              Welcome to our diverse and dynamic course catalog. We&apos;re
              dedicated to providing you with access to high-quality education.
            </p>
            <Link
              className="mt-5 border-b border-black hover:border-[#FAB616] hover:text-[#FAB616] transition-colors duration-150 font-bold flex items-center group w-fit"
              href={"/courses"}
            >
              See All Courses
              <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {coursesData.map((course) => (
            <div
              key={course.id}
              className="border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white transition duration-300 rounded-lg flex flex-col gap-4 justify-center items-center group py-10"
            >
              <div className="p-5 bg-white border group-hover:border-[#FAB616] rounded-full transition duration-300">
                <Image
                  className="rotate-0 group-hover:-rotate-[30deg] transition duration-300"
                  src={CourseImage}
                  alt={course.name}
                  // width={150}
                  // height={150}
                />
              </div>
              <h3 className="text-[#0F0D26] text-lg font-bold">
                {course.name}
              </h3>
              <Link
                className="text-[#0F0D26] text-sm border px-5 py-2 rounded-full group-hover:bg-[#FAB616] flex items-center transition duration-300"
                href={`/courses/${course.id}`}
              >
                {course.count} Courses <FaArrowRight className="ml-1 text-sm" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
