"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa";

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/authentication/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("A verification code has been sent to your email.");
        localStorage.setItem("userEmail", email);
        setTimeout(() => router.push("/authentication/otp"), 2000);
      } else {
        setError(data.message || "Failed to send verification code.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-login_bg bg-cover bg-center md:py-28 py-10">
      {error && (
        <div className="fixed top-16 left-5 z-50 flex items-center px-4 py-2 bg-red-100 text-red-600 border border-red-600 rounded-lg shadow-md">
          <span className="text-sm font-medium">{error}</span>
          <button onClick={() => setError("")} className="ml-3">
            <FaXmark className="text-[14px]" />
          </button>
        </div>
      )}

      {success && (
        <div className="fixed top-16 left-5 z-50 flex items-center px-4 py-2 bg-green-100 text-green-700 border border-green-600 rounded-lg shadow-md">
          <span className="text-sm font-medium">{success}</span>
        </div>
      )}

      <div className="flex justify-center items-center">
        <div className="w-[500px] sm:px-10 px-8 sm:py-14 py-12 mx-5 border border-gray-300 bg-gray-100 shadow-xl rounded-lg">
          <h2 className="text-[#131226] font-bold text-[20px] mb-5">
            Forgot Password?
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]" htmlFor="email">
                Email Address
              </label>
              <input
                placeholder="Enter email address"
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`text-[14px] font-[500] bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] w-full py-2 rounded text-[#131226] hover:text-white transition-all duration-300 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>

            <p className="text-[14px] text-[#131226] font-[500] mt-4">
              <Link
                className="text-[#131226] hover:text-[#FAB616] inline-flex items-center transition duration-300"
                href={"/authentication/login"}
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
