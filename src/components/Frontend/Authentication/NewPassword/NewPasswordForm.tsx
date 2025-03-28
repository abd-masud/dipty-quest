"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../Context/AuthContext";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export const NewPasswordForm = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState<string | null>(null);
  const [createNewPassword, setCreateNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setError("Invalid session. Please request a new password reset.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("Email not found. Please request a password reset again.");
      return;
    }

    if (createNewPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (createNewPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    const payload = {
      email,
      newPassword: createNewPassword,
    };

    try {
      const response = await fetch("/api/authentication/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const { user: userData } = await response.json();
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        router.push("/authentication/login");
      } else {
        const { message } = await response.json();
        setError(message || "Password reset failed. Try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  const passwordRules = useMemo(
    () => ({
      minLength: (createNewPassword: string) => createNewPassword.length >= 8,
      hasUpperCase: (createNewPassword: string) =>
        /[A-Z]/.test(createNewPassword),
      hasLowerCase: (createNewPassword: string) =>
        /[a-z]/.test(createNewPassword),
      hasNumber: (createNewPassword: string) => /\d/.test(createNewPassword),
      hasSpecialChar: (createNewPassword: string) =>
        /[!@#$%^&*]/.test(createNewPassword),
    }),
    []
  );

  const validatePassword = useCallback(
    (createNewPassword: string) => {
      const newErrorMessages: string[] = [];

      if (!passwordRules.minLength(createNewPassword)) {
        newErrorMessages.push("At least 8 characters long.");
      }
      if (!passwordRules.hasUpperCase(createNewPassword)) {
        newErrorMessages.push("At least one uppercase letter.");
      }
      if (!passwordRules.hasLowerCase(createNewPassword)) {
        newErrorMessages.push("At least one lowercase letter.");
      }
      if (!passwordRules.hasNumber(createNewPassword)) {
        newErrorMessages.push("At least one number.");
      }
      if (!passwordRules.hasSpecialChar(createNewPassword)) {
        newErrorMessages.push("At least one special character.");
      }

      setErrorMessages(newErrorMessages);
    },
    [passwordRules]
  );

  useEffect(() => {
    if (createNewPassword) {
      validatePassword(createNewPassword);
    } else {
      setErrorMessages([]);
    }
  }, [createNewPassword, validatePassword]);

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
          <h2 className="text-[#131226] font-[700] text-[20px] mb-5">
            New Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="text-[14px] text-[#131226]"
                htmlFor="createNewPassword"
              >
                Create New Password
              </label>
              <input
                type="password"
                id="createNewPassword"
                placeholder="Enter new password"
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
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
                type="password"
                id="confirmPassword"
                placeholder="Enter confirm password"
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {errorMessages.length > 0 && (
              <div className="text-red-600 text-sm -mt-2 mb-2">
                <ol className="list-disc pl-5">
                  {errorMessages.map((message, index) => (
                    <li key={index} className="block">
                      {message}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <input
              type="submit"
              value="Submit"
              className="text-[14px] font-[500] bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] w-full py-2 rounded text-[#131226] hover:text-white cursor-pointer transition-all duration-300"
            />
            <p className="text-[14px] text-[#131226] font-[500] mt-4">
              <Link
                href={"/authentication/login"}
                className="text-[#131226] hover:text-[#FAB616] inline-flex items-center transition duration-300"
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
