"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const ReviewsContent = [
  {
    id: 1,
    content:
      "I can't thank enough for the incredible courses they offer. I completed the 'Web Development Fundamentals",
    name: "John Doe",
    role: "Student",
  },
  {
    id: 2,
    content:
      "I can't thank enough for the incredible courses they offer. I completed the 'Web Development Fundamentals",
    name: "John Doe",
    role: "Student",
  },
  {
    id: 3,
    content:
      "I can't thank enough for the incredible courses they offer. I completed the 'Web Development Fundamentals",
    name: "John Doe",
    role: "Student",
  },
  {
    id: 4,
    content:
      "I can't thank enough for the incredible courses they offer. I completed the 'Web Development Fundamentals",
    name: "John Doe",
    role: "Student",
  },
  {
    id: 5,
    content:
      "I can't thank enough for the incredible courses they offer. I completed the 'Web Development Fundamentals",
    name: "John Doe",
    role: "Student",
  },
];

export const Reviews = () => {
  return (
    <main className="">
      <div className="max-w-screen-xl mx-auto px-4 md:py-[50px] py-10">
        <div className="mb-10">
          <h2 className="col-span-2 md:text-[56px] text-[35px] text-[#222E48] font-semibold text-center md:mb-0 mb-3">
            What our customers say
          </h2>
          <p className="text-[#222E48] text-[18px] text-center mb-5">
            We take immense pride in the positive impact our courses and
            community have on learners&apos; lives.
          </p>
        </div>
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            loop
            spaceBetween={20}
            slidesPerView={1}
            autoHeight={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              nextEl: ".custom-next-button",
              prevEl: ".custom-prev-button",
            }}
          >
            {ReviewsContent.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="p-5 bg-[#F5F6F7] border rounded-xl hover:border-[#FAB616] transition duration-300 hover:shadow-inner">
                  <p className="text-[18px] text-[#222E48]">{item.content}</p>
                  <p className="text-[20px] text-[#222E48] font-semibold mt-6 mb-2">
                    {item.name}
                  </p>
                  <p className="text-[#222E48]">{item.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center space-x-4 mt-4">
            <button className="custom-prev-button text-[20px] bg-[#FAB616] text-[#222E48] border-l-2 border-[#222E48] hover:bg-[#222E48] hover:border-[#FAB616] hover:text-white flex justify-center items-center h-12 w-12 rounded-full transition duration-300">
              <FaAngleLeft />
            </button>
            <button className="custom-next-button text-[20px] hover:bg-[#FAB616] hover:text-[#222E48] border-l-2 hover:border-[#222E48] bg-[#222E48] border-[#FAB616] text-white flex justify-center items-center h-12 w-12 rounded-full transition duration-300">
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
