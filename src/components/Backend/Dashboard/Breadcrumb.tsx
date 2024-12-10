"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export const Breadcrumb = () => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const formattedDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      setTime(formattedTime);
      setDate(formattedDate);
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="mb-4 pb-4 border-b flex justify-between items-center">
      <div>
        <p className="text-[16px] font-[600]">Dashboard</p>
        <Link className="text-[12px] text-[#797c8b]" href={"/"}>
          Dashboard
        </Link>
      </div>
      <div className="text-right">
        <p className="text-[14px] text-[#797C8B] font-[500]">{time}</p>
        <p className="text-[12px] text-[#797C8B] font-[500]">{date}</p>
      </div>
    </main>
  );
};
