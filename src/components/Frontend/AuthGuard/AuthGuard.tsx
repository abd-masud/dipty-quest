"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/Frontend/Context/AuthContext";
import Loader from "@/components/Loader";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/dashboard"); // Redirect if not authenticated
    }
  }, [user, router]);

  if (!user) {
    return <Loader />; // Show loader while checking authentication
  }

  return <>{children}</>;
};

export default AuthGuard;
