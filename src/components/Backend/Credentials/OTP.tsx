"use client";

// import { useAuth } from "@/components/Context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/images/logo.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaAngleLeft, FaXmark } from "react-icons/fa6";

export const OTPComponent = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
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

  const handleCloseError = () => setError(false);

  const handleOtpSubmit = (enteredOtp: string) => {
    const correctOtp = "123456";

    if (enteredOtp !== correctOtp) {
      setError(true);
    } else {
      router.push("/dashboard/authentication/new-password");
      setError(false);
    }
  };

  return (
    <main className="bg-login_bg bg-cover bg-left">
      {error && (
        <div className="flex items-center px-3 py-2 mb-4 rounded-lg bg-black text-red-600 border border-red-600 absolute top-5 right-5 z-50">
          <div className="text-[12px] font-medium">Invalid OTP</div>
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
            Verify Email Address
          </h1>
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
                    className="sm:w-12 w-8 sm:h-12 h-8 text-center font-[600] border rounded border-[#B9C1CC] hover:border-[#FAB616] text-[#131226] bg-transparent focus:outline-none focus:border-[#FAB616] transition-all duration-300"
                  />
                ))}
              </div>
            </div>
            <p className="text-[14px] text-[#131226] font-[500] mt-4">
              Didn&apos;t receive any code?{" "}
              <Link
                className="text-[#131226] hover:text-[#FAB616] ml-1 transition duration-300"
                href={"#"}
              >
                RESEND
              </Link>
            </p>
            <p className="text-[14px] text-[#131226] font-[500] mt-4">
              <Link
                className="text-[#131226] hover:text-[#FAB616] inline-flex items-center transition duration-300"
                href={"/dashboard/authentication/forgot-password"}
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
