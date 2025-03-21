"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Warning from "../../../../../../public/images/warning.png";

interface Gig {
  id: number;
  poster: string;
  title: string;
  content: string;
  price: number;
}

export const AppliedGigsItems = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        <div className="pb-10">
          <div className="md:flex block justify-between items-center mb-5">
            <h2 className="md:text-[56px] sm:text-[35px] text-[28px] text-[#222E48] font-semibold md:mb-0 mb-5">
              Featured Gigs
            </h2>
          </div>

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

  if (error || gigs.length === 0) {
    return (
      <main className="bg-[#F5F6F7]">
        <div className="pb-10">
          <div className="md:flex block justify-between items-center mb-5">
            <h2 className="md:text-[56px] sm:text-[35px] text-[28px] text-[#222E48] font-semibold md:mb-0 mb-5">
              Featured Gigs
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image height={200} width={200} src={Warning} alt="Warning" />
            <p>You haven&apos;t applied for any gigs</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F5F6F7]">
      <div className="pb-10">
        <div className="md:flex block justify-between items-center mb-5">
          <h2 className="md:text-[56px] sm:text-[35px] text-[28px] text-[#222E48] font-semibold md:mb-0 mb-5">
            Featured Gigs
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => {
            const slug = gig.title.toLowerCase().replace(/\s+/g, "-");
            const gigUrl = `/gigs/${slug}-${gig.id}`;
            return (
              <div
                key={gig.id}
                className="p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col gap-4 group shadow-lg animate-fadeInGrow"
              >
                <div className="overflow-hidden rounded-lg border hover:border-[#FAB616] transition duration-300">
                  <Image
                    className="w-full group-hover:scale-105 transition duration-300 "
                    src={gig.poster}
                    alt={gig.title}
                    width={500}
                    height={300}
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-[23px] text-[#222E48] font-bold leading-tight line-clamp-1 text-ellipsis overflow-hidden">
                    {gig.title}
                  </p>
                  <p className="line-clamp-2 text-ellipsis overflow-hidden">
                    {gig.content}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <Link
                    href={gigUrl}
                    className="border-b border-black hover:border-[#FAB616] hover:text-[#FAB616] transition-colors duration-150 font-bold flex items-center group w-fit"
                  >
                    Watch Now
                    <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
                  </Link>
                  <div className="text-[#222E48] font-bold">
                    {gig.price} BDT
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
