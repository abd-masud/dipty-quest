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
    imageSrc: "/images/logo.png",
  },
  {
    id: 2,
    title: "Sponsors",
    imageSrc: "/images/logo.png",
  },
  {
    id: 3,
    title: "Sponsors",
    imageSrc: "/images/logo.png",
  },
  {
    id: 4,
    title: "Sponsors",
    imageSrc: "/images/logo.png",
  },
  {
    id: 5,
    title: "Sponsors",
    imageSrc: "/images/logo.png",
  },
  {
    id: 6,
    title: "Sponsors",
    imageSrc: "/images/logo.png",
  },
  {
    id: 7,
    title: "Sponsors",
    imageSrc: "/images/logo.png",
  },
  {
    id: 8,
    title: "Sponsors",
    imageSrc: "/images/logo.png",
  },
  {
    id: 9,
    title: "Sponsors",
    imageSrc: "/images/logo.png",
  },
  {
    id: 10,
    title: "Sponsors",
    imageSrc: "/images/logo.png",
  },
];

export const Sponsors = () => {
  return (
    <main className="border-y hover:border-[#71F9A3] transition duration-300">
      <div className="max-w-screen-xl mx-auto py-16">
        <p className="text-center font-[600] text-[#222E48] mb-8">
          TRUSTED BY OVER 50 GREAT ENTREPRENEURS
        </p>
        <Swiper
          modules={[Autoplay]}
          loop
          slidesPerView={5}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {SponsorsImage.map((item) => (
            <SwiperSlide key={item.id}>
              <div>
                <Image
                  className=""
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
