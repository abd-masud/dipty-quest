"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

interface JwtPayload {
  id: string;
  email: string;
  password: string;
}

export const ChangePasswordForm = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [createNewPassword, setCreateNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const decodedPayload: JwtPayload = JSON.parse(atob(base64Payload));

        if (decodedPayload.password) {
          setOldPassword(decodedPayload.password);
        }
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (createNewPassword !== confirmPassword) {
      setError("Password Not Matched");
      return;
    }

    const payload = {
      oldPassword,
      createNewPassword,
      confirmPassword,
    };

    try {
      const response = await fetch("/api/authentication/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("DQ_USER_JWT_TOKEN")}`, // Send the JWT token
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Clear the JWT token from localStorage after successful password change
        localStorage.removeItem("DQ_USER_JWT_TOKEN");

        // Redirect to login page
        router.push("/authentication/login");
      } else {
        const { message } = await response.json();
        setError(message);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleCloseError = () => {
    setError("");
  };

  return (
    <main className="bg-login_bg bg-cover bg-left">
      {error && (
        <div className="flex items-center px-3 py-2 mb-4 rounded-lg bg-black text-red-600 border border-red-600 absolute top-5 left-5 z-50">
          <div className="text-[12px] font-medium">{error}</div>
          <button onClick={handleCloseError}>
            <FaXmark className="ml-3 text-[14px]" />
          </button>
        </div>
      )}
      <div className="flex justify-center items-center h-[calc(100vh-170px)]">
        <div className="w-[500px] sm:px-10 px-8 sm:py-14 py-12 mx-5 border border-[#131226] bg-gray-100 shadow-xl">
          <h1 className="text-[#131226] font-[700] text-[20px] mb-5">
            Change Password
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="text-[14px] text-[#131226]"
                htmlFor="oldPassword"
              >
                Old Password
              </label>
              <input
                placeholder="Old password from JWT"
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                type="password"
                id="oldPassword"
                value={oldPassword}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label
                className="text-[14px] text-[#131226]"
                htmlFor="createNewPassword"
              >
                Create New Password
              </label>
              <input
                placeholder="Enter new password"
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                type="password"
                id="createNewPassword"
                value={createNewPassword}
                onChange={(e) => setCreateNewPassword(e.target.value)}
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
                placeholder="Enter confirm password"
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <input
              className="text-[14px] font-[500] bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] w-full py-2 rounded text-[#131226] hover:text-white cursor-pointer transition-all duration-300"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </main>
  );
};
