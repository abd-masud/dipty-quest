"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CategoriesItem } from "@/components/Frontend/Categories/CategoriesItem/CategoriesItem";
import { Media } from "@/components/Frontend/Home/Media";
import { Navigation } from "@/components/Frontend/Navigation/Navigation";
import { Breadcrumbs } from "@/components/Frontend/Categories/Breadcrumbs";
import Loader from "@/components/Loader";
import { Footer } from "@/components/Frontend/Footer/Footer";

export default function Categories() {
  const pathname = usePathname();
  const [categoryId, setCategoryId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const parts = pathname.split("-");
      const extractedId = parts[parts.length - 1];
      setCategoryId(extractedId);
    }
  }, [pathname]);

  if (!categoryId)
    return (
      <main>
        <Media />
        <div className="sticky top-0 z-50">
          <Navigation />
        </div>
        <Breadcrumbs />
        <div className="overflow-hidden">
          <div className="-mt-52 -mb-52">
            <Loader />
          </div>
        </div>
        <Footer />
      </main>
    );

  return <CategoriesItem categoryId={categoryId} />;
}
