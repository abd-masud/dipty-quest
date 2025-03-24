"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

interface Category {
  id: number;
  icon: string;
  title: string;
  content: string;
  file: string;
}

export const Categories = () => {
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategoriesData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 md:py-[50px] py-10">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 sm:mb-[50px] mb-[30px]">
          <h2 className="col-span-2 md:text-[56px] sm:text-[35px] text-[28px] text-[#131226] font-semibold leading-tight">
            Pick a category that best fits what you require
          </h2>
          <div className="flex flex-col justify-center ">
            <p className="text-[#131226] text-justify md:mb-8 mb-2">
              Greetings from our active and varied offerings. We&apos;re
              committed to giving you access to superior guidance.
            </p>
            <div className="flex">
              <Link
                className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[12px] text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#FAB616] transition-colors duration-300 flex items-center group"
                href={"/categories"}
              >
                See All Categories
                <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-[10px]" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 md:py-[50px] py-10">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 sm:mb-[50px] mb-[30px]">
          <h2 className="col-span-2 md:text-[56px] sm:text-[35px] text-[28px] text-[#131226] font-semibold leading-tight">
            Pick a category that best fits what you require
          </h2>
          <div className="flex flex-col justify-center ">
            <p className="text-[#131226] text-justify md:mb-8 mb-2">
              Greetings from our active and varied offerings. We&apos;re
              committed to giving you access to superior guidance.
            </p>
            <div className="flex">
              <Link
                className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[12px] text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#FAB616] transition-colors duration-300 flex items-center group"
                href={"/categories"}
              >
                See All Categories
                <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-[10px]" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 md:py-[50px] py-10">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 sm:mb-[50px] mb-[30px]">
          <h2 className="col-span-2 md:text-[56px] sm:text-[35px] text-[28px] text-[#131226] font-semibold leading-tight">
            Pick a category that best fits what you require
          </h2>
          <div className="flex flex-col justify-center ">
            <p className="text-[#131226] text-justify md:mb-8 mb-2">
              Greetings from our active and varied offerings. We&apos;re
              committed to giving you access to superior guidance.
            </p>
            <div className="flex">
              <Link
                className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[12px] text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#FAB616] transition-colors duration-300 flex items-center group"
                href={"/categories"}
              >
                See All Categories
                <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-[10px]" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categoriesData.slice(0, 10).map((category) => {
            const slug = category.title.toLowerCase().replace(/\s+/g, "-");
            const categoryUrl = `/categories/${slug}-${category.id}`;
            return (
              <div
                key={category.id}
                className="border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg flex flex-col gap-4 justify-between items-center group sm:py-10 py-7 px-2"
              >
                <div className="p-5 text-[30px] bg-white border group-hover:border-[#FAB616] rounded-full transition duration-300">
                  <Image
                    className="h-10 w-10"
                    src={category.icon}
                    alt={category.title}
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className="text-[#0F0D26] text-lg font-bold text-center">
                  {category.title}
                </h3>
                <Link
                  href={categoryUrl}
                  className="text-[#0F0D26] text-sm border px-5 py-2 rounded-full bg-white group-hover:bg-[#FAB616] flex items-center transition duration-300"
                >
                  Apply
                  <FaArrowRight className="ml-1 text-sm" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
