"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { AuthProvider as BackendAuthProvider } from "@/components/Backend/Context/AuthContext";
import { AuthProvider as FrontendAuthProvider } from "@/components/Frontend/Context/AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export default function Layout({ children }: AuthProviderProps) {
  const pathname = usePathname();
  const AuthProvider = pathname.includes("dashboard")
    ? BackendAuthProvider
    : FrontendAuthProvider;

  return <AuthProvider>{children}</AuthProvider>;
}
