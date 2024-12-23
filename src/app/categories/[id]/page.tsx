"use client";

import { CategoriesItem } from "@/components/Frontend/Categories/CategoriesItem/CategoriesItem";
import { useParams } from "next/navigation";

export default function Categories() {
  const { id } = useParams();

  const categoryId = Array.isArray(id) ? id[0] : id;

  if (!categoryId) return <div>Category not found</div>;

  return <CategoriesItem categoryId={categoryId} />;
}
