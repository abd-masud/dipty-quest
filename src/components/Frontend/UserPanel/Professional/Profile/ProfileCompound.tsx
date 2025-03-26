"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Modal } from "antd";
import {
  // FaEdit,
  FaFileAlt,
  FaBriefcase,
  FaGraduationCap,
  FaUserTie,
  FaCode,
  FaExchangeAlt,
} from "react-icons/fa";

interface JwtPayload {
  id: string;
  role: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  institute: string;
  department: string;
  graduation: string;
  company: string;
  experience: string;
  skills: string;
  switch: string;
  file: string;
  photo: string;
  primary: string;
}

export const ProfileCompound = () => {
  const [profileData, setProfileData] = useState<Partial<JwtPayload>>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");

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
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-[#131226] to-[#1E1B4B] text-white p-6 relative">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {profileData.photo ? (
              <div className="w-32 h-32 rounded-full border-4 border-[#FAB616] overflow-hidden relative shadow-lg">
                <Image
                  src={profileData.photo}
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-[#FAB616] bg-gray-200 flex items-center justify-center shadow-lg">
                <span className="text-4xl text-gray-500">
                  {profileData.name?.[0]}
                  {profileData.last_name?.[0]}
                </span>
              </div>
            )}

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold">
                {profileData.name} {profileData.last_name}
              </h1>
              <p className="text-[#FAB616] text-lg capitalize mt-1">
                {profileData.role}
              </p>

              {profileData.company && (
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <FaBriefcase className="text-gray-300" />
                  <span>{profileData.company}</span>
                </div>
              )}

              {/* <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                <button className="bg-[#FAB616] hover:bg-[#E0A500] text-[#131226] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition">
                  <FaEdit size={14} /> Edit Profile
                </button>
              </div> */}
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("personal")}
              className={`px-6 py-3 font-medium text-sm flex items-center gap-2 ${
                activeTab === "personal"
                  ? "text-[#FAB616] border-b-2 border-[#FAB616]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FaUserTie />
              &nbsp;Personal&nbsp;Info
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`px-6 py-3 font-medium text-sm flex items-center gap-2 ${
                activeTab === "education"
                  ? "text-[#FAB616] border-b-2 border-[#FAB616]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FaGraduationCap /> Education
            </button>
            <button
              onClick={() => setActiveTab("professional")}
              className={`px-6 py-3 font-medium text-sm flex items-center gap-2 ${
                activeTab === "professional"
                  ? "text-[#FAB616] border-b-2 border-[#FAB616]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FaBriefcase /> Professional
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`px-6 py-3 font-medium text-sm flex items-center gap-2 ${
                activeTab === "skills"
                  ? "text-[#FAB616] border-b-2 border-[#FAB616]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FaCode /> Skills
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`px-6 py-3 font-medium text-sm flex items-center gap-2 ${
                activeTab === "documents"
                  ? "text-[#FAB616] border-b-2 border-[#FAB616]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FaFileAlt /> Documents
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "personal" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#131226] border-b pb-2 flex items-center gap-2">
                  <FaUserTie /> Basic Information
                </h3>
                <div>
                  <label className="block text-gray-600 text-sm mb-1">
                    Full Name
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {profileData.name} {profileData.last_name}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1">
                    Email
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {profileData.email || "Not provided"}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1">
                    Phone
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {profileData.phone || "Not provided"}
                    {profileData.primary === "1" && (
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#131226] border-b pb-2 flex items-center gap-2">
                  <FaExchangeAlt /> Career Switch
                </h3>
                <div>
                  <label className="block text-gray-600 text-sm mb-1">
                    Career Switch Status
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {profileData.switch || "Not specified"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "education" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#131226] border-b pb-2 flex items-center gap-2">
                  <FaGraduationCap /> Education Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      Institute
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {profileData.institute || "Not provided"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      Department
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {profileData.department || "Not provided"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      Graduation Year
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {profileData.graduation || "Not provided"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "professional" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#131226] border-b pb-2 flex items-center gap-2">
                  <FaBriefcase /> Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      Current Company
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {profileData.company || "Not provided"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">
                      Experience
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {profileData.experience || "Not provided"} Months
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#131226] border-b pb-2 flex items-center gap-2">
                <FaCode /> Skills
              </h3>
              <div>
                {profileData.skills ? (
                  <div className="flex flex-wrap gap-2">
                    {JSON.parse(profileData.skills).map(
                      (skill: string, index: number) => (
                        <span
                          key={index}
                          className="bg-[#FAB616] bg-opacity-20 text-[#131226] px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">No skills listed</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#131226] border-b pb-2 flex items-center gap-2">
                <FaFileAlt /> Documents
              </h3>
              <div>
                {profileData.file ? (
                  <>
                    <button
                      onClick={showModal}
                      className="border-b-2 border-[#131226] bg-[#FAB616] text-[#131226] hover:border-[#FAB616] hover:text-white hover:bg-[#131226] py-2 w-40 text-[12px] font-bold flex justify-center items-center rounded-full transition duration-300"
                    >
                      <FaFileAlt /> View Document
                    </button>
                    <Modal
                      title="Document Preview"
                      open={isModalVisible}
                      onCancel={handleCancel}
                      footer={null}
                      width="80%"
                    >
                      <div className="h-[calc(100vh-250px)]">
                        <iframe
                          src={profileData.file}
                          className="w-full h-full border-0"
                          title="Document Preview"
                        />
                      </div>
                    </Modal>
                  </>
                ) : (
                  <p className="text-gray-500">No documents uploaded</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
