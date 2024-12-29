"use client";

import "./globals.css";
import { Header } from "@/components/Backend/Header/Header";
import { SideBar } from "@/components/Backend/SideBar/SideBar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import QueryProvider from "../QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [AuthProvider, setAuthProvider] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const loadAuthContext = async () => {
      const { AuthProvider } = await import(
        "@/components/Backend/Context/AuthContext"
      );
      setAuthProvider(() => AuthProvider);
    };

    loadAuthContext();
  }, [pathname]);

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

  if (!AuthProvider) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      className={`antialiased relative ${
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
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
      </main>
    </div>
  );
}
