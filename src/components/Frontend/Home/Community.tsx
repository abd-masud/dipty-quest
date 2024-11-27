import Link from "next/link";
import Image from "next/image";
import community from "../../../../public/images/comm1.png";
import { FaArrowRight } from "react-icons/fa";

const communityData = [
  {
    id: 1,
    title: "Exclusive Coach",
    description: "We believe in the power of education to transform",
  },
  {
    id: 2,
    title: "Personal Trainer",
    description: "Unlock your potential with custom workout plans",
  },
  {
    id: 3,
    title: "Nutrition Expert",
    description: "Learn to fuel your body the right way",
  },
  {
    id: 4,
    title: "Wellness Advocate",
    description: "Achieve well-being and peace of mind",
  },
];
export const Community = () => {
  return (
    <main className="bg-[#F5F6F7]">
      <div className="max-w-screen-xl mx-auto px-4 md:py-[50px] py-10">
        <div className="md:grid block grid-cols-3 md:mb-[50px] mb-5">
          <h2 className="col-span-2 md:text-[56px] text-[35px] text-[#0F0D26] font-semibold md:mb-0 mb-2">
            Life Learning Community Hub
          </h2>
          <div className="flex flex-col justify-center">
            <p className="text-[#222E48] text-justify md:mb-5 mb-1">
              Explore the philosophy that drives Edufast, shaping an educational
              ecosystem that values curiosity, collaboration
            </p>
            <Link
              className="mt-5 border-b border-black hover:border-[#FAB616] hover:text-[#FAB616] transition-colors duration-150 font-bold flex items-center group w-fit"
              href={"/courses"}
            >
              Browsing Course
              <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {communityData.map((card) => (
            <div
              key={card.id}
              className="m-5 border bg-white hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-center items-center group py-10"
            >
              <Image
                src={community}
                alt={card.title}
                // width={240}
                // height={240}
                className=""
              />
              <Link
                className="text-[#222E48] hover:text-[#FAB616] text-lg my-3 font-bold transition duration-300"
                href={""}
              >
                {card.title}
              </Link>
              <p className="text-center mx-5">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
