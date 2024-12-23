"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/images/logo.png";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
// import { useAuth } from "../Context/AuthContext";

export const ChangePasswordPage = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [createNewPassword, setCreateNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  // const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (createNewPassword !== confirmPassword) {
      setError("Password Not Matched");
      return;
    } else {
      router.push("/dashboard/authentication/login");
    }

    // Uncomment and update when you’re ready to handle the password change logic
    // const payload = {
    //   oldPassword,
    //   createNewPassword,
    //   confirmPassword,
    // };

    // try {
    //   const response = await fetch("/api/authentication/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   if (response.ok) {
    //     const { user: userData } = await response.json();
    //     setUser(userData);
    //     localStorage.setItem("user", JSON.stringify(userData));
    //   } else {
    //     const { message } = await response.json();
    //     setError(message);
    //   }
    // } catch (error) {
    //   setError("An unexpected error occurred. Please try again.");
    // }
  };

  const handleCloseError = () => {
    setError("");
  };

  return (
    <main className="bg-login_bg bg-cover bg-left">
      {error && (
        <div className="flex items-center px-3 py-2 mb-4 rounded-lg bg-black text-red-600 border border-red-600 absolute top-5 left-5 z-50">
          <div className="text-[12px] font-medium">Password Not Matched</div>
          <button onClick={handleCloseError}>
            <FaXmark className="ml-3 text-[14px]" />
          </button>
        </div>
      )}
      <div className="flex justify-center items-center h-screen">
        <div className="w-[500px] sm:px-10 px-8 sm:py-14 py-12 mx-5 border border-[#131226] bg-gray-100 shadow-xl">
          <p className="text-white font-bold flex items-center justify-center text-[30px] mb-5">
            <Image height={30} src={logo} alt={"Logo"} priority />
            <p className="text-[#131226] text-[24px] font-bold ml-2">
              DiptyQuest
            </p>
          </p>
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
              <div className="relative">
                <input
                  placeholder="Enter old password"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="text-[14px] text-[#131226]"
                htmlFor="createNewPassword"
              >
                Create New Password
              </label>
              <div className="relative">
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
            </div>
            <div className="mb-4">
              <label
                className="text-[14px] text-[#131226]"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative">
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
            </div>
            <input
              className="text-[14px] font-[500] bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] w-full py-2 rounded text-[#131226] hover:text-white cursor-pointer transition-all duration-300"
              type="submit"
              value={"Submit"}
            />
            <p className="text-[14px] text-[#131226] font-[500] mt-4">
              <Link
                className="text-[#131226] hover:text-[#FAB616] inline-flex items-center transition duration-300"
                href={"/dashboard/authentication/login"}
              >
                <FaAngleLeft className="h-3 w-3 mr-2 mt-[2px]" />
                Back
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};
