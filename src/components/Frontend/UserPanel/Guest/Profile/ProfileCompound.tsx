"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface JwtPayload {
  id: string;
  role: string;
  name: string;
  email: string;
  image: string;
}

export const ProfileCompound = () => {
  const [profileData, setProfileData] = useState<Partial<JwtPayload>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        setProfileData(decodedPayload);
      } catch (error) {
        console.error("Invalid token:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FAB616]"></div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-[#131226] to-[#2a2a4a] text-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {profileData.image && (
              <div className="w-28 h-28 rounded-full border-4 border-[#FAB616] overflow-hidden relative shrink-0">
                <Image
                  src={profileData.image}
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            )}

            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold">
                {profileData.name}
              </h1>
              <p className="text-[#FAB616] text-lg capitalize mt-1">
                {profileData.role}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 p-5 rounded-lg">
            <h2 className="text-lg font-semibold text-[#131226] mb-4 border-b pb-2">
              Profile Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <p className="text-gray-600 text-sm">Name</p>
                  <p className="text-gray-900 font-medium break-all">
                    {profileData.name || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <p className="text-gray-900 font-medium break-all">
                    {profileData.email || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
