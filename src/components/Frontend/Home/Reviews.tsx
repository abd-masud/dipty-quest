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
      <div className="max-w-screen-xl mx-auto px-4 py-[50px]">
        <div className="">
          <h2 className="col-span-2 text-[56px] text-[#222E48] font-semibold text-center">
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
            slidesPerView={3}
            autoHeight={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".custom-next-button",
              prevEl: ".custom-prev-button",
            }}
          >
            {ReviewsContent.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="p-5 bg-[#F5F6F7] border rounded-xl hover:border-[#2FA75F] transition duration-300 hover:shadow-inner">
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
            <button className="custom-prev-button bg-[#71F9A3] text-[#222E48] border-l-2 border-[#222E48] hover:bg-[#222E48] hover:border-[#71F9A3] hover:text-white flex justify-center items-center h-12 w-12 rounded-full transition duration-300">
              <FaAngleLeft />
            </button>
            <button className="custom-next-button bg-[#71F9A3] text-[#222E48] border-l-2 border-[#222E48] hover:bg-[#222E48] hover:border-[#71F9A3] hover:text-white flex justify-center items-center h-12 w-12 rounded-full transition duration-300">
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
