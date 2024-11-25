"use client";

import { useEffect, useState } from "react";
import QueryProvider from "./QueryProvider";
import "./globals.css";
import { AuthProvider } from "@/components/Frontend/Context/AuthContext";
import Loader from "@/components/Loader";

import { Inter } from "next/font/google";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>DiptyQuest</title>
        <link rel="shortcut icon" href="/images/logo.png" type="image/png" />
        {/* <meta
          name="description"
          content="Watch Ti Channel - Islamic Live TV for live Islamic scholar discussions, Quran learning sessions, Islamic episodes, and spiritual content. Join now for enriching and educational Islamic broadcasts."
        />
        <meta
          name="keywords"
          content="Islamic live TV, Ti Channel, Quran learning, Islamic scholars, Islamic videos, live Islamic episodes, Muslim TV channel, Islamic education, spirituality, Islamic lectures, Quran streaming, Islamic children’s content"
        />
        <meta
          property="og:title"
          content="Ti Channel - Islamic Live TV | Your Source for Islamic Knowledge and Inspiration"
        />
        <meta
          property="og:description"
          content="Tune in to Ti Channel for live streams, Islamic lectures, Quran learning, and enriching Islamic episodes."
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:url" content="https://tichannel.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Ti Channel - Islamic Live TV | Your Source for Islamic Knowledge and Inspiration"
        />
        <meta
          name="twitter:description"
          content="Tune in to Ti Channel for live streams, Islamic lectures, Quran learning, and enriching Islamic episodes."
        />
        <meta name="twitter:image" content="/images/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="EN" /> */}
      </head>
      <body className="antialiased">
        <AuthProvider>
          <QueryProvider>{loading ? <Loader /> : children}</QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
