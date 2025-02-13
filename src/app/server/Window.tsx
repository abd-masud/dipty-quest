"use client";
import { useEffect } from "react";

export default function Window({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        window.location.hostname === "www.diptyquest.com" ||
        window.location.protocol !== "https:"
      ) {
        window.location.href =
          "https://diptyquest.com" +
          window.location.pathname +
          window.location.search;
      }
    }
  }, []);

  return <>{children}</>;
}
