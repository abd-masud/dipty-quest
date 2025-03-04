"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  companyLogo: string;
  password: string;
}

interface AuthContextType {
  user: JwtPayload | null;
  setUser: (user: JwtPayload | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("DQ_ADMIN_JWT_TOKEN");
    if (!token) {
      router.push("/dashboard/authentication/login");
      return;
    }

    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      setUser({
        id: decodedPayload?.id,
        name: decodedPayload?.name,
        email: decodedPayload?.email,
        role: decodedPayload?.role,
        company: decodedPayload?.company,
        companyLogo: decodedPayload?.companyLogo,
        password: decodedPayload?.password,
      });
    } catch {
      router.push("/authentication/login");
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
