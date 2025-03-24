"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaXmark } from "react-icons/fa6";

export const OTPForm = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      handleOtpSubmit(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleCloseError = () => setError(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) setEmail(savedEmail);
  }, []);
  

  const handleOtpSubmit = async (enteredOtp: string) => {
    if (!email) {
      setError(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/user/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: enteredOtp, email }),
      });

      if (!response.ok) throw new Error("Invalid OTP");

      router.push("/authentication/new-password");
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await fetch("/api/user/resend-otp", { method: "POST" });
      alert("OTP resent successfully!");
    } catch {
      alert("Failed to resend OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-login_bg bg-cover bg-center md:py-28 py-10">
      {error && (
        <div className="flex items-center px-3 py-2 mb-4 rounded-lg bg-black text-red-600 border border-red-600 absolute sm:top-[130px] top-[70px] right-5 z-50">
          <div className="text-sm font-medium">Invalid OTP</div>
          <button onClick={handleCloseError}>
            <FaXmark className="ml-3 text-[14px]" />
          </button>
        </div>
      )}
      <div className="flex justify-center items-center">
        <div className="w-[500px] sm:px-10 px-8 sm:py-14 py-12 mx-5 border border-[#131226] bg-gray-100 shadow-xl">
          <h2 className="text-[#131226] font-[700] text-[20px] mb-5">
            Verify Email Address
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label className="text-[14px] text-[#131226]" htmlFor="otp">
              Enter OTP
            </label>
            <div className="border border-[#45484d] bg-white bg-opacity-30 rounded p-5 mt-2">
              <div className="flex justify-between py-2">
                {otp.map((_, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="sm:w-12 w-8 sm:h-12 h-8 text-center font-[600] border rounded border-[#B9C1CC] text-[#131226] bg-transparent focus:outline-none focus:border-[#FAB616] transition-all duration-300"
                  />
                ))}
              </div>
            </div>
            <p className="text-[14px] text-[#131226] font-[500] mt-4">
              Didn&apos;t receive any code?{" "}
              <button
                type="button"
                className="text-[#131226] hover:text-[#FAB616] ml-1 transition duration-300"
                onClick={handleResendOtp}
                disabled={loading}
              >
                {loading ? "Resending..." : "RESEND"}
              </button>
            </p>
            <p className="text-[14px] text-[#131226] font-[500] mt-4">
              <Link
                className="text-[#131226] hover:text-[#FAB616] inline-flex items-center transition duration-300"
                href={"/authentication/forgot-password"}
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
