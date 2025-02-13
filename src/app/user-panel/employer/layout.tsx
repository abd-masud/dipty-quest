"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SideBar } from "@/components/Frontend/UserPanel/Employer/SideBar/SideBar";
import { Header } from "@/components/Frontend/UserPanel/Employer/Header/Header";
import Loader from "@/components/Loader";

interface JwtPayload {
  name: string;
  role: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [formData, setFormData] = useState<Partial<JwtPayload>>({});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (!token) {
      router.push("/authentication/login");
      return;
    }

    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      setFormData({
        name: decodedPayload?.name,
        role: decodedPayload?.role,
      });
    } catch {
      router.push("/authentication/login");
    }
  }, [router]);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isSidebarVisible) setSidebarVisible(false);
  };

  if (!formData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="antialiased relative">
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

      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarVisible ? "md:ml-[250px] ml-0" : "ml-0"
        }`}
      >
        <div className="sticky top-0 z-20">
          <Header toggleSidebar={toggleSidebar} />
        </div>
        {children}
      </main>
    </div>
  );
}
