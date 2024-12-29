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
          <title>DiptyQuest</title>
          <link rel="shortcut icon" href="/images/logo.png" type="image/png" />
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
        <title>DiptyQuest</title>
        <link rel="shortcut icon" href="/images/logo.png" type="image/png" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <QueryProvider>{loading ? <Loader /> : children}</QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
