"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/images/logo.png";
import { useRouter } from "next/navigation";
import { FaXmark } from "react-icons/fa6";
import { useAuth } from "../Context/AuthContext";

export const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = { email, password };

    try {
      const response = await fetch("/api/authentication/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setEmail("");
        setPassword("");
        router.push("/dashboard");
      } else {
        const { error } = await response.json();
        setError(error || "Invalid credentials");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    }

    setTimeout(() => setError(null), 5000);
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <main className="bg-login_bg bg-cover bg-left">
      {error && (
        <div className="flex items-center px-3 py-2 mb-4 rounded-lg bg-black text-red-600 border border-red-600 absolute top-5 right-5 z-50">
          <div className="text-[12px] font-medium">{error}</div>
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
          <h1 className="text-[#131226] font-bold text-[20px] mb-5">Sign In</h1>
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
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  placeholder="Enter password"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input className="mr-3" type="checkbox" id="remember" />
                <label
                  className="text-[14px] text-[#131226]"
                  htmlFor="remember"
                >
                  Remember Me
                </label>
              </div>
              <Link
                className="text-[14px] text-[#131226] hover:text-[#FAB616] font-[500] transition duration-300"
                href={"/dashboard/authentication/forgot-password"}
              >
                Forgot password?
              </Link>
            </div>
            <input
              className="text-[14px] font-[500] bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] w-full py-2 rounded text-[#131226] hover:text-white cursor-pointer transition-all duration-300"
              type="submit"
              value={"Sign In"}
            />
          </form>

          <p className="text-[14px] text-[#131226] font-[500] mt-4">
            Don&apos;t have an account?{" "}
            <Link
              className="text-[#131226] hover:text-[#FAB616] ml-1 transition duration-300"
              href={"/dashboard/authentication/sign-up"}
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};
