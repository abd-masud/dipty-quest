"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay } from "swiper/modules";

import Image from "next/image";

const SponsorsImage = [
  {
    id: 1,
    title: "Sponsors",
    imageSrc: "/images/sponsor1.webp",
  },
  {
    id: 2,
    title: "Sponsors",
    imageSrc: "/images/sponsor2.webp",
  },
  {
    id: 3,
    title: "Sponsors",
    imageSrc: "/images/sponsor3.webp",
  },
  {
    id: 4,
    title: "Sponsors",
    imageSrc: "/images/sponsor4.webp",
  },
  {
    id: 5,
    title: "Sponsors",
    imageSrc: "/images/sponsor5.webp",
  },
  {
    id: 6,
    title: "Sponsors",
    imageSrc: "/images/sponsor6.webp",
  },
];

export const Sponsors = () => {
  return (
    <main className="border-y hover:border-[#FBB614] transition duration-300">
      <div className="max-w-screen-xl mx-auto px-4 md:py-16 py-10">
        <p className="text-center md:text-[16px] text-[14px] font-[600] text-[#0F0D26] mb-8">
          TRUSTED PARTNERS
        </p>
        <Swiper
          modules={[Autoplay]}
          loop
          slidesPerView={3}
          spaceBetween={16}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {SponsorsImage.map((item) => (
            <SwiperSlide key={item.id}>
              <div>
                <Image
                  className="sm:h-20 h-14 w-auto mx-auto"
                  src={item.imageSrc}
                  width={200}
                  height={30}
                  alt={item.title}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
};
