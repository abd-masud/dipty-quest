"use client";

import { usePathname } from "next/navigation";

const OpenGraphURL = () => {
  const pathname = usePathname();
  const host =
    typeof window !== "undefined" ? window.location.host : "diptyquest.com";
  const protocol =
    typeof window !== "undefined" ? window.location.protocol : "https:";
  const OpenGraphUrl = `${protocol}//${host}${pathname}`;

  return (
    <>
      <meta property="og:url" content={OpenGraphUrl} />
    </>
  );
};

export default OpenGraphURL;
