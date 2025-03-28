"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import Warning from "../../../../../../public/images/warning.png";

interface Category {
  id: number;
  icon: string;
  title: string;
  content: string;
}

interface SharedPlan {
  user_id: number;
  category_id: number;
  file: string;
}

export const AppliedCategoriesItems = () => {
  const router = useRouter();
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [sharedPlans, setSharedPlans] = useState<SharedPlan[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

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
    const fetchSharedPlans = async () => {
      if (!userId) return;
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/shared-plans");
        if (!response.ok) {
          throw new Error("Failed to fetch shared plans");
        }
        const data: SharedPlan[] = await response.json();
        const filteredPlans = data.filter((plan) => plan.user_id == userId);
        setSharedPlans(filteredPlans);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedPlans();
  }, [userId]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data: Category[] = await response.json();

        const categoryIds = sharedPlans.map((plan) => plan.category_id);
        const filteredCategories = data.filter((category) =>
          categoryIds.includes(category.id)
        );

        setCategoriesData(filteredCategories);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (sharedPlans.length > 0) {
      fetchCategories();
    }
  }, [sharedPlans]);

  const categoryCounts = sharedPlans.reduce((acc, plan) => {
    acc[plan.category_id] = (acc[plan.category_id] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const handleOpenModal = (category: Category) => {
    const files = sharedPlans
      .filter((plan) => plan.category_id == category.id)
      .map((plan) => plan.file);

    setSelectedCategory(category);
    setSelectedFiles(files);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <main className="mx-auto">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-10">
          <h2 className="col-span-2 md:text-[56px] sm:text-[35px] text-[28px] text-[#131226] font-semibold leading-tight md:mb-0 mb-2">
            Pick a category that best fits what you require
          </h2>
          <div className="flex flex-col justify-start md:mt-2 mt-0">
            <p className="text-[#131226] text-justify md:mb-8 mb-1">
              Greetings from our active and varied offerings. We&apos;re
              committed to giving you access to superior guidance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
          <div className="w-full h-[290px] border bg-[#F5F6F7] hover:border-[#FAB616] hover:bg-white shadow-lg transition duration-300 rounded-lg"></div>
        </div>
      </main>
    );
  }

  if (error || categoriesData.length == 0) {
    return (
      <main className="mx-auto">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-10">
          <h2 className="col-span-2 md:text-[56px] sm:text-[35px] text-[28px] text-[#131226] font-semibold leading-tight md:mb-0 mb-2">
            Pick a category that best fits what you require
          </h2>
          <div className="flex flex-col justify-start md:mt-2 mt-0">
            <p className="text-[#131226] text-justify md:mb-8 mb-1">
              Greetings from our active and varied offerings. We&apos;re
              committed to giving you access to superior guidance.
            </p>
          </div>
        </div>
        <div className="pb-20 h-[calc(100vh-370px)] flex items-center justify-center">
          <div className="md:flex block justify-between items-center mb-5">
            <div className="flex flex-col items-center justify-center">
              <Image height={200} width={200} src={Warning} alt="Warning" />
              <p>You haven&apos;t applied for any categories</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="mx-auto">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-10">
          <h2 className="col-span-2 md:text-[56px] sm:text-[35px] text-[28px] text-[#131226] font-semibold leading-tight md:mb-0 mb-2">
            Pick a category that best fits what you require
          </h2>
          <div className="flex flex-col justify-start md:mt-2 mt-0">
            <p className="text-[#131226] text-justify md:mb-8 mb-1">
              Greetings from our active and varied offerings. We&apos;re
              committed to giving you access to superior guidance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {categoriesData.map((category) => {
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
                <div className="flex gap-3">
                  {categoryCounts[category.id] > 0 && (
                    <button
                      onClick={() => handleOpenModal(category)}
                      className="text-[#0F0D26] text-sm border px-5 py-2 rounded-full bg-white group-hover:bg-[#FAB616] flex items-center transition duration-300"
                    >
                      Shared ({categoryCounts[category.id]})
                      <FaArrowRight className="ml-1 text-sm" />
                    </button>
                  )}
                  <Link
                    href={categoryUrl}
                    className="text-[#0F0D26] text-sm border px-5 py-2 rounded-full bg-white group-hover:bg-[#FAB616] flex items-center transition duration-300"
                  >
                    Reapply
                    <FaArrowRight className="ml-1 text-sm" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <Modal
          title="Shared Files"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          {selectedCategory && (
            <>
              <div className="p-5 text-[30px] bg-white transition duration-300 mb-5 border-b">
                <Image
                  className="h-10 w-10 mx-auto mb-5"
                  src={selectedCategory.icon}
                  alt={selectedCategory.title}
                  width={40}
                  height={40}
                />
                <h3 className="text-[#0F0D26] text-lg font-bold text-center">
                  {selectedCategory.title}
                </h3>
              </div>
            </>
          )}

          {selectedFiles.length > 0 ? (
            <div className="grid sm:grid-cols-3 grid-cols-2 mb-10">
              {selectedFiles.map((file, index) => (
                <div key={index} className="mb-2 mx-auto">
                  <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b-2 border-[#131226] bg-[#FAB616] text-[#131226] hover:border-[#FAB616] hover:text-white hover:bg-[#131226] font-bold text-[12px] py-2 w-32 flex justify-center items-center rounded-full transition duration-300"
                  >
                    File {index + 1}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p>No shared files available.</p>
          )}
        </Modal>
      </div>
    </main>
  );
};
