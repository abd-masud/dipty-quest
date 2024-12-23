"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { FaXmark } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import google from "../../../../../public/images/google.svg";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch("/api/authentication/admin/", {
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
          email: user.email,
          name: user.name,
          role: user.role,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        localStorage.setItem("email", userData.email);

        setEmail("");
        setPassword("");

        router.push("/dashboard");
      } else {
        const { message } = await response.json();
        setError(message);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  // const handleGoogleSignIn = async () => {
  //   setIsLoading(true);
  //   const provider = new GoogleAuthProvider();
  //   const auth = getAuth();

  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const firebaseUser = result.user;

  //     const userData: User = {
  //       id: firebaseUser.uid,
  //       name: firebaseUser.displayName || "",
  //       email: firebaseUser.email || "",
  //       role: firebaseUser.role || "",
  //     };

  //     setUser(userData);
  //     localStorage.setItem("user", JSON.stringify(userData));
  //     router.push("/");
  //   } catch {
  //     setError("Google Sign-In failed. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleCloseError = () => {
    setError("");
  };

  return (
    <main className="bg-login_bg bg-cover bg-center py-10">
      {error && (
        <div className="flex items-center px-3 py-2 mb-4 rounded-lg bg-black text-red-600 border border-red-600 absolute sm:top-[130px] top-[70px] right-5 z-50">
          <div className="text-sm font-medium">{error}</div>
          <button onClick={handleCloseError}>
            <FaXmark className="ml-3 text-[14px]" />
          </button>
        </div>
      )}
      <div className="flex justify-center items-center">
        <div className="w-[500px] sm:px-10 px-8 sm:py-14 py-12 mx-5 border border-[#131226] bg-gray-100 shadow-xl">
          <h2 className="text-[#131226] font-[700] text-[20px] mb-5">
            Sign In
          </h2>
          <div className="mt-4">
            <button
              // onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full py-2 text-[14px] font-[500] bg-white border-b-2 border-[#131226] hover:bg-gray-200 text-black rounded transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <Image
                    src={google}
                    alt="Google icon"
                    className="w-5 h-5 mr-2"
                  />
                  Sign in with Google
                </>
              )}
            </button>
          </div>
          <div>
            <p className="text-[#131226] text-[18px] font-[600] my-4 text-center">
              Or continue with email
            </p>
          </div>
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
                href={"/authentication/forgot-password"}
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
