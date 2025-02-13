"use client";

import { useEffect, useState } from "react";
import { Footer } from "../../Footer/Footer";
import { Media } from "../../Home/Media";
import { Breadcrumbs } from "./Breadcrumbs";
import { Navigation } from "../../Navigation/Navigation";
import Loader from "@/components/Loader";

interface Gig {
  id: number;
  title: string;
  content: string;
}

interface GigsItemProps {
  gigId: string;
}

export const GigsItemComponent = ({ gigId }: GigsItemProps) => {
  const [gigData, setGigData] = useState<Gig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gigId) return;

    const fetchGigData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/featured-gigs/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Gig-Id": gigId,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch gig data");
        }
        const data = await response.json();
        setGigData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchGigData();
  }, [gigId]);

  if (loading) {
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
  }

  if (error) {
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
  }

  if (!gigData) {
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
  }

  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Breadcrumbs />
      <div className="max-w-screen-xl mx-auto px-4 mt-10">
        <h1 className="font-bold text-[40px] mb-2">{gigData.title}</h1>
        <p className="mb-5">{gigData.content}</p>
      </div>
      <p className="text-center font-bold text-[40px] py-40">Coming Soon!</p>
      <Footer />
    </main>
  );
};
