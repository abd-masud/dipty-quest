"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../Context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export const ChangePasswordForm = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const payload = {
      oldPassword,
      newPassword,
    };

    try {
      const response = await fetch("/api/authentication/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password changed successfully!");
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => {
          router.push("/authentication/login");
        }, 2000);
      } else {
        setError(data.message || "Password change failed.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleCloseError = () => setError("");
  const handleCloseSuccess = () => setSuccess("");

  return (
    <main className="bg-login_bg bg-cover bg-center py-10">
      {error && (
        <div className="flex items-center px-3 py-2 mb-4 rounded-lg bg-black text-red-600 border border-red-600 absolute sm:top-[130px] top-[70px] left-5 z-50">
          <div className="text-sm font-medium">{error}</div>
          <button onClick={handleCloseError}>
            <FaXmark className="ml-3 text-[14px]" />
          </button>
        </div>
      )}
      {success && (
        <div className="flex items-center px-3 py-2 mb-4 rounded-lg bg-black text-green-600 border border-green-600 absolute sm:top-[130px] top-[70px] left-5 z-50">
          <div className="text-sm font-medium">{success}</div>
          <button onClick={handleCloseSuccess}>
            <FaXmark className="ml-3 text-[14px]" />
          </button>
        </div>
      )}
      <div className="flex justify-center items-center">
        <div className="w-[500px] sm:px-10 px-8 sm:py-14 py-12 mx-5 border border-[#131226] bg-gray-100 shadow-xl">
          <h2 className="text-[#131226] font-[700] text-[20px] mb-5">
            Change Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="text-[14px] text-[#131226]"
                htmlFor="oldPassword"
              >
                Old Password
              </label>
              <input
                placeholder="Enter old password"
                className="border text-[14px] py-3 px-[10px] w-full rounded-md mt-2"
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="text-[14px] text-[#131226]"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <input
                placeholder="Enter new password"
                className="border text-[14px] py-3 px-[10px] w-full rounded-md mt-2"
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="text-[14px] text-[#131226]"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                placeholder="Confirm new password"
                className="border text-[14px] py-3 px-[10px] w-full rounded-md mt-2"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <input
              className="bg-[#FAB616] hover:bg-[#131226] text-[#131226] hover:text-white w-full py-2 rounded transition-all duration-300 cursor-pointer"
              type="submit"
              value="Submit"
            />
            <p className="text-[14px] mt-4">
              <Link
                className="hover:text-[#FAB616]"
                href={"/authentication/login"}
              >
                <FaAngleLeft className="h-3 w-3 mr-2 inline" />
                Back
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};
