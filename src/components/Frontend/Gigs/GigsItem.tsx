"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Gig {
  id: number;
  poster: string;
  title: string;
  overview: string;
  price: number;
}

export const GigsItem = () => {
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

  if (loading) {
    return (
      <main className="bg-[#F5F6F7]">
        <div className="max-w-screen-xl mx-auto px-4 md:py-[50px] py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-[#F5F6F7]">
        <div className="max-w-screen-xl mx-auto px-4 md:py-[50px] py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow"></div>
          </div>
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
      const isItemInCart = existingCart.some((item) => item.id == gigInfo.id);
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
    <main className="bg-[#F5F6F7]">
      <div className="max-w-screen-xl mx-auto px-4 md:py-[50px] py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="flex flex-col">
                  <p className="text-[23px] text-[#222E48] font-bold leading-tight line-clamp-1 text-ellipsis overflow-hidden">
                    {gig.title}
                  </p>
                  <p className="line-clamp-2 text-ellipsis overflow-hidden">
                    {gig.overview}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto">
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
        </div>
      </div>
    </main>
  );
};
