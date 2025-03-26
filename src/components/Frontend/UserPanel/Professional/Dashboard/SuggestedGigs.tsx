"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Slider from "react-slick";

interface Gig {
  id: number;
  poster: string;
  title: string;
  overview: string;
  price: number;
}

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{ ...style, display: "flex" }}
      onClick={onClick}
    >
      <div className="arrow-container bg-[#FAB616] hover:bg-[#0E0C25] text-[#0E0C25] hover:text-[#FAB616] p-3 rounded-full shadow-lg transition-colors duration-300">
        <FaChevronRight className="text-lg" />
      </div>
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{ ...style, display: "flex" }}
      onClick={onClick}
    >
      <div className="arrow-container bg-[#FAB616] hover:bg-[#0E0C25] text-[#0E0C25] hover:text-[#FAB616] p-3 rounded-full shadow-lg transition-colors duration-300">
        <FaChevronLeft className="text-[#0E0C25] hover:text-[#FAB616] text-lg" />
      </div>
    </div>
  );
};

export const SuggestedGigs = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/gigs");
        if (!response.ok) {
          throw new Error("Failed to fetch gigs");
        }
        const data: Gig[] = await response.json();
        setGigs(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <main className="mx-auto md:py-[50px] py-5">
        <h2 className="mb-2 font-bold">Suggested Gigs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
          <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
          <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto px-4 md:py-[50px] py-5">
        <h2 className="mb-2 font-bold">Suggested Gigs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
          <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
          <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
        </div>
      </main>
    );
  }

  const handleEnrollClick = (gigs: Gig) => {
    const gigInfo = {
      id: gigs.id,
      image: gigs.poster,
      title: gigs.title,
      overview: gigs.overview,
      price: gigs.price,
    };
    const existingCart = JSON.parse(
      localStorage.getItem("gigEnrollment") || "[]"
    );
    if (Array.isArray(existingCart)) {
      const isItemInCart = existingCart.some((item) => item.id === gigInfo.id);
      if (!isItemInCart) {
        existingCart.push(gigInfo);
        localStorage.setItem("gigEnrollment", JSON.stringify(existingCart));
      }
    } else {
      localStorage.setItem("gigEnrollment", JSON.stringify([gigInfo]));
    }

    router.push("/cart");
  };

  return (
    <main className="mx-auto py-5 overflow-x-hidden relative">
      <h2 className="mb-2 font-bold">Suggested Gigs</h2>
      <Slider {...settings}>
        {gigs.map((gig) => {
          const slug = gig.title.toLowerCase().replace(/\s+/g, "-");
          const gigUrl = `/gigs/${slug}-${gig.id}`;
          return (
            <div
              key={gig.id}
              className="p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col gap-4 group shadow-lg animate-fadeInGrow"
            >
              <div className="overflow-hidden rounded-lg border hover:border-[#FAB616] transition duration-300 relative">
                <Link href={gigUrl}>
                  <Image
                    className="w-full group-hover:scale-105 transition duration-300 "
                    src={gig.poster}
                    alt={gig.title}
                    width={500}
                    height={300}
                    priority
                  />
                  <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-y-full transition-all duration-700 ease-in-out rotate-[-45deg]"></div>
                </Link>
              </div>
              <div className="flex flex-col mt-4">
                <p className="text-[23px] text-[#222E48] font-bold leading-tight line-clamp-1 text-ellipsis overflow-hidden">
                  {gig.title}
                </p>
                <p className="line-clamp-2 text-ellipsis overflow-hidden">
                  {gig.overview}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleEnrollClick(gig)}
                  className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[12px] text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#FAB616] transition-colors duration-300 flex items-center group"
                >
                  Enroll Now
                  <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
                </button>
                <div className="text-[#222E48] font-bold">
                  {gig.price == 0 ? "Free" : `${gig.price} BDT`}
                </div>
              </div>
            </div>
          );
        })}
      </Slider>

      <style jsx global>{`
        .custom-arrow {
          z-index: 1;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .prev-arrow {
          left: 0px;
        }

        .next-arrow {
          right: 0px;
        }

        .slick-prev:before,
        .slick-next:before {
          display: none;
        }

        .arrow-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </main>
  );
};
