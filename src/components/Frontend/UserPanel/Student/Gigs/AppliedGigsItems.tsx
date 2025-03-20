"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Warning from "../../../../../../public/images/warning.png";

interface Gig {
  id: number;
  poster: string;
  title: string;
  overview: string;
  price: number;
}

export const AppliedGigsItems = () => {
  const router = useRouter();
  const [gigsData, setGigsData] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (!token) {
      router.push("/authentication/login");
      return;
    }

    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      setUserId(decodedPayload?.id || null);
    } catch {
      router.push("/authentication/login");
    }
  }, [router]);

  useEffect(() => {
    if (!userId) return;

    const fetchFilteredGigs = async () => {
      try {
        const formResponse = await fetch("/api/gigs-cart");
        if (!formResponse.ok) throw new Error("Failed to fetch gigs-cart data");
        const formData = await formResponse.json();

        const userGigIds = formData
          .filter((entry: { user_id: number }) => entry.user_id === userId)
          .map((entry: { gig_id: number }) => entry.gig_id);

        if (userGigIds.length === 0) {
          setLoading(false);
          return;
        }

        const gigsResponse = await fetch("/api/gigs");
        if (!gigsResponse.ok) throw new Error("Failed to fetch gigs");
        const allGigs = await gigsResponse.json();

        const filteredGigs = allGigs.filter((gig: Gig) =>
          userGigIds.includes(gig.id)
        );

        setGigsData(filteredGigs);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredGigs();
  }, [userId]);

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
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow" />
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow" />
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow" />
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow" />
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow" />
            <div className="w-full h-[360px] p-5 bg-white border hover:border-[#FAB616] transition duration-300 rounded-lg flex flex-col justify-between gap-4 shadow-lg animate-fadeInGrow" />
          </div>
        </div>
      </main>
    );
  }

  if (error || gigsData.length === 0) {
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
          {gigsData.map((gig) => {
            const slug = gig.title
              ? gig.title.toLowerCase().replace(/\s+/g, "-")
              : "";
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
                  <Link
                    href={gigUrl}
                    className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[12px] text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#FAB616] transition-colors duration-300 flex items-center group"
                  >
                    Enrolled
                    <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
                  </Link>
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
