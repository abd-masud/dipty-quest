import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import { GiBrain } from "react-icons/gi";
import { GiGraduateCap } from "react-icons/gi";

const categoriesData = [
  {
    id: 1,
    icon: GiBrain,
    name: "Pitch your idea & solve business challenges",
    count: 4,
  },
  {
    id: 2,
    icon: GiGraduateCap,
    name: "Career grooming & personal branding",
    count: 10,
  },
  { id: 3, icon: GiBrain, name: "Entrepreneur challenges", count: 6 },
  { id: 4, icon: GiBrain, name: "Business mentorship", count: 15 },
  { id: 5, icon: GiBrain, name: "Internships & jobs", count: 9 },
  { id: 6, icon: GiBrain, name: "Career guidance", count: 4 },
  {
    id: 7,
    icon: GiBrain,
    name: "Curriculum vitae & portfolio support",
    count: 10,
  },
  { id: 8, icon: GiBrain, name: "Networking hub", count: 6 },
  { id: 9, icon: GiBrain, name: "Startup incubation", count: 15 },
  { id: 10, icon: GiBrain, name: "Competitions & awards", count: 9 },
];

export const Categories = () => {
  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 md:py-[50px] py-10">
        <div className="md:grid block grid-cols-3 mb-[50px]">
          <h2 className="col-span-2 md:text-[56px] text-[35px] text-[#131226] font-semibold md:mb-0 mb-2">
            Pick a category that best fits what you require
          </h2>
          <div className="flex flex-col justify-center ">
            <p className="text-[#131226] text-justify md:mb-8 mb-1">
              Greetings from our active and varied offerings. We&apos;re
              committed to giving you access to superior guidance.
            </p>
            <Link
              className="mt-5 border-b border-black hover:border-[#FAB616] hover:text-[#FAB616] transition-colors duration-150 font-bold flex items-center group w-fit"
              href={"/categories"}
            >
              See All Categories
              <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categoriesData.map((categories) => (
            <div
              key={categories.id}
              className="border-2 bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg flex flex-col gap-4 justify-between items-center group py-10 px-2"
            >
              <div className="p-5 text-[30px] bg-white border group-hover:border-[#FAB616] rounded-full transition duration-300">
                <categories.icon />
              </div>
              <h3 className="text-[#0F0D26] text-lg font-bold text-center">
                {categories.name}
              </h3>
              <Link
                className="text-[#0F0D26] text-sm border px-5 py-2 rounded-full bg-white group-hover:bg-[#FAB616] flex items-center transition duration-300"
                href={`/categories/${categories.id}`}
              >
                {categories.count} Categories{" "}
                <FaArrowRight className="ml-1 text-sm" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
