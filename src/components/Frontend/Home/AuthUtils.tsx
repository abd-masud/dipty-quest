"use client";

import { useEffect, useState } from "react";

export interface JwtPayload {
  role: string;
}

export const useJwtToken = (): JwtPayload | null => {
  const [payload, setPayload] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("DQ_USER_JWT_TOKEN")
        : null;
    if (!token) {
      setPayload(null);
      return;
    }

    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      setPayload(decodedPayload as JwtPayload);
    } catch (error) {
      console.error("Error parsing JWT token:", error);
      setPayload(null);
    }
  }, []);

  return payload;
};
