"use client";

import { useState } from "react";

export const JoinEventInfo = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      // Submit form logic here
      console.log("Form submitted");
    }
  };

  return (
    <main className="md:py-20 py-10">
      <div className="flex justify-center items-center">
        <div className="w-[700px] sm:px-10 px-8 sm:py-14 py-12 mx-5 border border-[#131226] bg-gray-100 shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-0 md:gap-6">
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">First Name</label>
                <input
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">Last Name</label>
                <input
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]">
                Email Address
              </label>
              <input
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                type="email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]">Phone Number</label>
              <input
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-0 md:gap-6">
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">Password</label>
                <input
                  type="password"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]">
                Photo (Passport Size)
              </label>
              <input
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                type="file"
                required
              />
            </div>

            <input
              className="text-[14px] font-[500] bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] w-full py-2 rounded text-[#131226] hover:text-white cursor-pointer transition-all duration-300"
              type="submit"
              value="Register"
            />

            {error && (
              <div className="mt-4 text-red-500 text-center text-sm">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};
