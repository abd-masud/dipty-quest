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

  if (!AuthProvider) {
    return (
      <html lang="en" className={inter.className}>
        <head>
          <title>
            DiptyQuest | Empowering Careers, Ideas, Ventures & Growth
          </title>
          <link rel="shortcut icon" href="/images/logo.png" type="image/png" />
          <meta
            name="description"
            content="DiptyQuest is a dynamic platform for job seekers, idea sharing, venture capital opportunities, and organizational skill development. Connect, collaborate, and grow with a community driven by innovation and success."
          />
          <meta name="keywords" content="" />
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
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="robots" content="index, follow" />
          <meta name="language" content="EN" />
        </head>
        <body className="antialiased">
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>DiptyQuest | Empowering Careers, Ideas, Ventures & Growth</title>
        <link rel="shortcut icon" href="/images/logo.png" type="image/png" />
        <meta
          name="description"
          content="DiptyQuest is a dynamic platform for job seekers, idea sharing, venture capital opportunities, and organizational skill development. Connect, collaborate, and grow with a community driven by innovation and success."
        />
        <meta name="keywords" content="" />
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
      </head>
      <body className="antialiased">
        <AuthProvider>
          <QueryProvider>{loading ? <Loader /> : children}</QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
