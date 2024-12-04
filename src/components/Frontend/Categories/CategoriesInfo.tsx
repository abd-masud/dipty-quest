import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Category1 from "../../../../public/images/category1.png";
import Category2 from "../../../../public/images/category2.png";
import Category3 from "../../../../public/images/category3.png";
import Category4 from "../../../../public/images/category4.png";
import Category5 from "../../../../public/images/category5.png";
import Category6 from "../../../../public/images/category6.png";
import Category7 from "../../../../public/images/category7.png";
import Category8 from "../../../../public/images/category8.png";
import Category9 from "../../../../public/images/category9.png";
import Category10 from "../../../../public/images/category10.png";
import Image from "next/image";

export const CategoriesInfo = () => {
  const categoriesData = [
    {
      id: 1,
      icon: Category1,
      name: "Pitch your idea & solve business challenges",
    },
    {
      id: 2,
      icon: Category2,
      name: "Career grooming & personal branding",
    },
    { id: 3, icon: Category3, name: "Entrepreneur challenges" },
    { id: 4, icon: Category4, name: "Business mentorship" },
    { id: 5, icon: Category5, name: "Internships & jobs" },
    { id: 6, icon: Category6, name: "Career guidance" },
    {
      id: 7,
      icon: Category7,
      name: "Curriculum vitae & portfolio support",
    },
    { id: 8, icon: Category8, name: "Networking hub" },
    { id: 9, icon: Category9, name: "Startup incubation" },
    { id: 10, icon: Category10, name: "Competitions & awards" },
    {
      id: 11,
      icon: Category1,
      name: "Pitch your idea & solve business challenges",
    },
    {
      id: 12,
      icon: Category2,
      name: "Career grooming & personal branding",
    },
    { id: 13, icon: Category3, name: "Entrepreneur challenges" },
    { id: 14, icon: Category4, name: "Business mentorship" },
    { id: 15, icon: Category5, name: "Internships & jobs" },
    { id: 16, icon: Category6, name: "Career guidance" },
    {
      id: 17,
      icon: Category7,
      name: "Curriculum vitae & portfolio support",
    },
    { id: 18, icon: Category8, name: "Networking hub" },
    { id: 19, icon: Category9, name: "Startup incubation" },
    { id: 20, icon: Category10, name: "Competitions & awards" },
  ];

  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 md:py-[50px] py-10">
        <div className="md:grid block grid-cols-3 mb-[50px]">
          <h2 className="col-span-2 md:text-[56px] text-[35px] text-[#131226] font-semibold md:mb-0 mb-2">
            Pick a category that best fits what you require
          </h2>
          <div className="flex flex-col justify-start mt-5">
            <p className="text-[#131226] text-justify md:mb-8 mb-1">
              Greetings from our active and varied offerings. We&apos;re
              committed to giving you access to superior guidance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categoriesData.map((categories) => (
            <div
              key={categories.id}
              className="border-2 bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg flex flex-col gap-4 justify-between items-center group py-10 px-2"
            >
              <div className="p-5 text-[30px] bg-white border group-hover:border-[#FAB616] rounded-full transition duration-300">
                <Image
                  className="h-10 w-10"
                  src={categories.icon}
                  alt={categories.name}
                />
              </div>
              <h3 className="text-[#0F0D26] text-lg font-bold text-center">
                {categories.name}
              </h3>
              <Link
                className="text-[#0F0D26] text-sm border px-5 py-2 rounded-full bg-white group-hover:bg-[#FAB616] flex items-center transition duration-300"
                href={`/categories/${categories.id}`}
              >
                Apply
                <FaArrowRight className="ml-1 text-sm" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
