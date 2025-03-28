"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Modal } from "antd";

interface JwtPayload {
  id: string;
  role: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  designation: string;
  experience: string;
  skills: string;
  file: string;
  photo: string;
  logo: string;
  primary: string;
}

export const ProfileCompound = () => {
  const [profileData, setProfileData] = useState<Partial<JwtPayload>>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FAB616]"></div>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto sm:my-8 my-5 sm:px-4 px-0">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-[#131226] to-[#2a2a4a] text-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {profileData.photo && (
              <div className="w-32 h-32 rounded-full border-4 border-[#FAB616] overflow-hidden relative shrink-0">
                <Image
                  src={profileData.photo}
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            )}

            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold">
                {profileData.name} {profileData.last_name}
              </h1>
              <p className="text-[#FAB616] text-lg capitalize mt-1">
                {profileData.role}
              </p>
            </div>
          </div>
        </div>

        {(profileData.company || profileData.designation) && (
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              {profileData.logo && (
                <div className="w-20 h-20 relative shrink-0 border rounded-md">
                  <Image
                    src={profileData.logo}
                    alt="Company Logo"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}
              <div>
                {profileData.company && (
                  <p className="font-medium text-gray-900">
                    {profileData.company}
                  </p>
                )}
                {profileData.designation && (
                  <p className="text-gray-600 text-sm">
                    {profileData.designation}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h2 className="text-lg font-semibold text-[#131226] mb-4 border-b pb-2">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <p className="text-gray-900 font-medium">
                    {profileData.email || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Phone</p>
                  <p className="text-gray-900 font-medium">
                    {profileData.phone || "-"}
                    {profileData.primary == "1" && (
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                        Primary
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {profileData.skills && (
              <div className="bg-gray-50 p-5 rounded-lg">
                <h2 className="text-lg font-semibold text-[#131226] mb-4 border-b pb-2">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="bg-[#FAB616]/20 text-[#131226] px-3 py-1 rounded-full text-sm"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            {profileData.experience && (
              <div className="bg-gray-50 p-5 rounded-lg">
                <h2 className="text-lg font-semibold text-[#131226] mb-4 border-b pb-2">
                  Experience
                </h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {profileData.experience} Months
                </p>
              </div>
            )}

            {profileData.file && (
              <div className="bg-gray-50 p-5 rounded-lg">
                <h2 className="text-lg font-semibold text-[#131226] mb-4 border-b pb-2">
                  Documents
                </h2>
                <div className="sm:flex block items-center justify-between">
                  <div className="mb-3">
                    <p className="text-gray-600 text-sm">Attached Document</p>
                    <p className="text-gray-900 font-medium">Resume/CV</p>
                  </div>
                  <button
                    onClick={showModal}
                    className="border-b-2 border-[#131226] bg-[#FAB616] text-[#131226] hover:border-[#FAB616] hover:text-white hover:bg-[#131226] py-2 w-40 text-[12px] font-bold flex justify-center items-center rounded-full transition duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    View Document
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <Modal
          title="Document Preview"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width="80%"
          centered
        >
          <div className="h-[calc(100vh-250px)]">
            {profileData.file && (
              <iframe
                src={profileData.file}
                className="w-full h-full border-0"
                title="Document Preview"
              />
            )}
          </div>
        </Modal>
      </div>
    </main>
  );
};
