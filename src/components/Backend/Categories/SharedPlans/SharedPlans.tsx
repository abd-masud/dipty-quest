"use client";

import { useEffect, useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { SharedPlansTable } from "./SharedPlansTable";

interface DataType {
  key: string;
  id: number;
  category_id: number;
  category_name: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  file: string;
}

export const SharedPlansPage = () => {
  const [categoriesData, setCategoriesData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/shared-plans");
      if (!response.ok) {
        throw new Error("Failed to fetch plans");
      }
      const categories = await response.json();

      const mappedData: DataType[] = categories.map((user: DataType) => ({
        key: user.id.toString(),
        id: user.id,
        category_id: user.category_id,
        category_name: user.category_name,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
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
      <SharedPlansTable
        employers={categoriesData}
        fetchCategories={fetchCategories}
        loading={loading}
      />
    </main>
  );
};
