"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Backend/Header/Header";
import { SideBar } from "@/components/Backend/SideBar/SideBar";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Define your User type
interface User {
  id: string;
  name: string;
  email: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [user, setUser] = useState<User | null>(null); // Explicitly define User type
  const [authLoaded, setAuthLoaded] = useState(false); // Track when auth is loaded
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Dynamically load and fetch the user from the appropriate context
    const loadAuthContext = async () => {
      try {
        let authModule;
        if (pathname.includes("dashboard")) {
          authModule = await import("@/components/Backend/Context/AuthContext");
        } else {
          authModule = await import(
            "@/components/Frontend/Context/AuthContext"
          );
        }

        const { user } = authModule.useAuth();
        setUser(user); // Now works because User type matches
      } catch (err) {
        console.error("Error loading auth context:", err);
      } finally {
        setAuthLoaded(true);
      }
    };

    loadAuthContext();
  }, [pathname]);

  useEffect(() => {
    if (authLoaded && !user) {
      router.push("/dashboard/authentication/login");
    }
  }, [user, authLoaded, router]);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isSidebarVisible) setSidebarVisible(false);
  };

  const hiddenPages = [
    "/dashboard/authentication/sign-up",
    "/dashboard/authentication/login",
    "/dashboard/authentication/forgot-password",
    "/dashboard/authentication/otp",
    "/dashboard/authentication/change-password",
    "/dashboard/authentication/new-password",
  ];
  const isHiddenPage = hiddenPages.includes(pathname);

  // Show a loader while auth data is loading
  if (!authLoaded) {
    return (
      <html lang="en">
        <head></head>
        <body>
          <div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head></head>
      <body
        className={`${geistSans.variable} ${
          geistMono.variable
        } antialiased relative ${
          isSidebarVisible ? "overflow-hidden md:overflow-auto" : ""
        }`}
      >
        {!isHiddenPage && (
          <>
            <div
              className={`fixed w-[250px] z-50 transition-transform duration-300 ${
                isSidebarVisible ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <SideBar />
            </div>
            {isSidebarVisible && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition duration-300"
                onClick={closeSidebar}
              />
            )}
          </>
        )}

        <main
          className={`flex-1 transition-all duration-300 ${
            !isHiddenPage && isSidebarVisible ? "md:ml-[250px] ml-0" : "ml-0"
          }`}
        >
          {!isHiddenPage && (
            <div className="sticky top-0 z-20">
              <Header toggleSidebar={toggleSidebar} />
            </div>
          )}
          {children}
        </main>
      </body>
    </html>
  );
}
