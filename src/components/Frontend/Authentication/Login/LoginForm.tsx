"use client";

import {
  // signIn,
  useSession,
} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Link from "next/link";
// import Image from "next/image";
// import google from "../../../../../public/images/google.svg";
import { useAuth } from "../../Context/AuthContext";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useAuth();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    console.log("Session:", session);
    console.log("Status:", status);

    if (status === "authenticated" && session?.user) {
      localStorage.setItem("user", JSON.stringify(session.user));
      console.log("User data saved to localStorage");
    } else if (status === "unauthenticated") {
      localStorage.removeItem("user");
      console.log("User data removed from localStorage");
    }
  }, [session, status]);

  // const handleSignIn = async () => {
  //   if (googleLoading) return;
  //   setGoogleLoading(true);
  //   const result = await signIn("google", {
  //     callbackUrl: "/api/auth/callback/google",
  //   });
  //   if (result?.error) {
  //     console.error("Sign-in error:", result.error);
  //   } else {
  //     console.log("Sign-in successful");
  //   }
  //   setGoogleLoading(false);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch("/api/authentication/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const { token, user } = await response.json();
        const userData = {
          id: user.id,
          role: user.role,
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          institute: user.institute,
          qualification: user.qualification,
          department: user.department,
          graduation: user.graduation,
          duration: user.duration,
          company: user.company,
          designation: user.designation,
          experience: user.experience,
          business: user.business,
          plan: user.plan,
          skills: user.skills,
          switch: user.switch,
          file: user.file,
          photo: user.photo,
          logo: user.logo,
          primary: user.primary,
          status: user.status,
          password: user.password,
        };

        setUser(userData);
        localStorage.setItem("DQ_USER_JWT_TOKEN", token);

        setEmail("");
        setPassword("");

        router.push("/");
      } else {
        const { error } = await response.json();
        setError(error);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    }

    setTimeout(() => setError(null), 5000);
    setLoading(false);
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <main className="bg-login_bg bg-cover bg-center md:py-28 py-10">
      {error && (
        <div className="flex items-center px-3 py-2 mb-4 rounded-lg bg-red-100 text-red-600 border border-red-600 fixed sm:top-[130px] top-[70px] right-5 z-50">
          <div className="text-sm font-medium">{error}</div>
          <button onClick={handleCloseError}>
            <FaXmark className="ml-3 text-[14px]" />
          </button>
        </div>
      )}
      <div className="flex justify-center items-center">
        <div className="w-[500px] sm:px-10 px-8 sm:py-14 py-12 mx-5 border border-[#131226] bg-gray-100 shadow-xl">
          <h1 className="text-[#131226] font-[700] text-[20px] mb-5">
            Sign In
          </h1>
          {/* <div className="mt-4">
            <button
              className="flex items-center justify-center w-full py-2 text-[14px] font-[500] bg-white border-b-2 border-[#131226] hover:bg-gray-200 text-black rounded transition-all duration-300"
              onClick={handleSignIn}
              disabled={googleLoading}
            >
              {!googleLoading ? (
                <>
                  <Image
                    src={google}
                    alt="Google icon"
                    className="w-5 h-5 mr-2"
                  />
                  Sign in with Google
                </>
              ) : (
                "Signing in..."
              )}
            </button>
          </div>
          <div>
            <p className="text-[#131226] text-[18px] font-[600] my-4 text-center">
              Or continue with email
            </p>
          </div> */}
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {password && (
                  <button
                    type="button"
                    className="absolute right-[11px] top-5 text-[24px] text-black"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VscEyeClosed /> : <VscEye />}
                  </button>
                )}
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
              {/* <Link
                className="text-[14px] text-[#131226] hover:text-[#FAB616] font-[500] transition duration-300"
                href={"/authentication/forgot-password"}
              >
                Forgot password?
              </Link> */}
            </div>
            <input
              className={`text-[14px] font-[500] w-full py-2 rounded cursor-pointer transition-all duration-300 ${
                loading
                  ? "bg-[#131226] text-white cursor-not-allowed"
                  : "bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] text-[#131226] hover:text-white"
              }`}
              type="submit"
              value={loading ? "Signing In..." : "Sign In"}
              disabled={loading}
            />
          </form>

          <p className="text-[14px] text-[#131226] font-[500] mt-4">
            Don&apos;t have an account?{" "}
            <Link
              className="block text-[#131226] hover:text-[#FAB616] transition duration-300"
              href={"/create-account"}
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};
