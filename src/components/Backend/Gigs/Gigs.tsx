"use client";

import { useEffect, useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { GigsTable } from "./GigsTable";

interface DataType {
  key: string;
  id: number;
  title: string;
  poster: string;
  url: string;
  overview: string;
  instructor: string;
  level: string;
  certifications: string;
  language: string;
  published: string;
  price: number;
}

export const GigsPage = () => {
  const [gigsData, setGigsData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGigs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/gigs");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const categories = await response.json();

      const mappedData: DataType[] = categories.map((user: DataType) => ({
        key: user.id.toString(),
        id: user.id,
        title: user.title,
        poster: user.poster,
        url: user.url,
        overview: user.overview,
        instructor: user.instructor,
        level: user.level,
        certifications: user.certifications,
        language: user.language,
        published: user.published,
        price: user.price,
      }));

      setGigsData(mappedData);
    } catch {
      setGigsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb fetchGigs={fetchGigs} />
      <GigsTable gigs={gigsData} fetchGigs={fetchGigs} loading={loading} />
    </main>
  );
};
