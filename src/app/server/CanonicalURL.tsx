"use client";

import { usePathname } from "next/navigation";

const CanonicalURL = () => {
  const pathname = usePathname();
  const host =
    typeof window !== "undefined" ? window.location.host : "diptyquest.com";
  const protocol =
    typeof window !== "undefined" ? window.location.protocol : "https:";
  const canonicalUrl = `${protocol}//${host}${pathname}`;

  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
    </>
  );
};

export default CanonicalURL;
