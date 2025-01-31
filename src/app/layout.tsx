"use client";

import { useEffect, useState } from "react";
import QueryProvider from "./QueryProvider";
import "./globals.css";
import Loader from "@/components/Loader";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const [AuthProvider, setAuthProvider] = useState<any>(null);
  const [dynamicCanonical, setDynamicCanonical] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const loadAuthProvider = async () => {
      if (pathname.includes("dashboard")) {
        const { AuthProvider } = await import(
          "@/components/Backend/Context/AuthContext"
        );
        setAuthProvider(() => AuthProvider);
      } else {
        const { AuthProvider } = await import(
          "@/components/Frontend/Context/AuthContext"
        );
        setAuthProvider(() => AuthProvider);
      }
    };

    loadAuthProvider();
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const baseUrl = "https://diptyquest.com";
    const canonicalUrl = `${baseUrl}${pathname === "/" ? "" : pathname}`;
    setDynamicCanonical(canonicalUrl);
  }, [pathname]);

  const baseUrl = "https://diptyquest.com";
  const staticCanonicalUrl = `${baseUrl}${pathname === "/" ? "" : pathname}`;

  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>DiptyQuest | Empowering Careers, Ideas, Ventures & Growth</title>
        <link rel="shortcut icon" href="/images/logo.png" type="image/png" />
        <link rel="stylesheet" href="https://cdn.tailwindcss.com" />
        <link rel="canonical" href={staticCanonicalUrl} />
        <meta
          name="description"
          content="DiptyQuest is a dynamic platform for job seekers, idea sharing, venture capital opportunities, and organizational skill development. Connect, collaborate, and grow with a community driven by innovation and success."
        />
        <meta
          name="keywords"
          content="DiptyQuest, Empowering Careers, Idea Sharing, Venture Capital, Organizational Skill Development, Job Seekers Platform, Career Growth Opportunities, Collaboration Platform, Innovation Community, Professional Networking, Skill Development Hub, Dynamic Job Portal, Startup Opportunities, Business Growth, Success Driven Community"
        />
        <meta
          property="og:title"
          content="DiptyQuest | Empowering Careers, Ideas, Ventures & Growth"
        />
        <meta
          property="og:description"
          content="DiptyQuest is a dynamic platform for job seekers, idea sharing, venture capital opportunities, and organizational skill development. Connect, collaborate, and grow with a community driven by innovation and success."
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:url" content="https://diptyquest.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="DiptyQuest | Empowering Careers, Ideas, Ventures & Growth"
        />
        <meta
          name="twitter:description"
          content="DiptyQuest is a dynamic platform for job seekers, idea sharing, venture capital opportunities, and organizational skill development. Connect, collaborate, and grow with a community driven by innovation and success."
        />
        <meta name="twitter:image" content="/images/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="EN" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "DiptyQuest | Empowering Careers, Ideas, Ventures & Growth",
            image:
              "https://diptyquest.com/schema_image/diptyquest-empowering-careers-ideas-ventures-&-growth.jpg",
            author: {
              "@type": "Person",
              name: "Fahima Akter",
            },
            publisher: {
              "@type": "Organization",
              name: "DiptyQuest",
              logo: {
                "@type": "ImageObject",
                url: "https://diptyquest.com/images/logo.png",
              },
            },
            datePublished: "2024-12-20T06:00:00+08:00",
            dateModified: "2024-12-30T06:00:00+08:00",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Dhaka",
              addressRegion: "Bangladesh",
              streetAddress: "Road - 06, Avenue -01, Mirpur DOHS",
            },
            description:
              "DiptyQuest | Empowering Careers, Ideas, Ventures & Growth",
            name: "DiptyQuest",
            telephone: "09647123456",
          })}
        </script>

        {dynamicCanonical && <link rel="canonical" href={dynamicCanonical} />}
      </head>
      <body className="antialiased">
        {AuthProvider ? (
          <AuthProvider>
            <QueryProvider>{loading ? <Loader /> : children}</QueryProvider>
          </AuthProvider>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        )}
      </body>
    </html>
  );
}
