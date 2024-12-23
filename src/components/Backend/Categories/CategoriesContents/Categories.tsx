"use client";

import { useEffect, useState } from "react";
import { CategoriesTable } from "./CategoriesTable";
import { Breadcrumb } from "./Breadcrumb";

interface DataType {
  key: string;
  id: number;
  icon: string;
  title: string;
  content: string;
  file: string;
}

export const CategoriesPage = () => {
  const [categoriesData, setCategoriesData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const categories = await response.json();

      const mappedData: DataType[] = categories.map((user: DataType) => ({
        key: user.id.toString(),
        id: user.id,
        icon: user.icon,
        title: user.title,
        content: user.content,
        file: user.file,
      }));

      setCategoriesData(mappedData);
    } catch {
      setCategoriesData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb fetchCategories={fetchCategories} />
      <CategoriesTable
        employers={categoriesData}
        fetchCategories={fetchCategories}
        loading={loading}
      />
    </main>
  );
};
