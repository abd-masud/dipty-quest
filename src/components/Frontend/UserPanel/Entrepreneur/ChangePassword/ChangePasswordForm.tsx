"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaXmark } from "react-icons/fa6";

interface JwtPayload {
  id: string;
  email: string;
}

export const ChangePasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [createNewPassword, setCreateNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const decodedPayload: JwtPayload = JSON.parse(atob(base64Payload));

        if (decodedPayload.email) {
          setEmail(decodedPayload.email);
        }
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (createNewPassword !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => setError(""), 5000);
      setIsSubmitting(false);
      return;
    }

    const payload = {
      email,
      oldPassword,
      createNewPassword,
    };

    try {
      const response = await fetch("/api/authentication/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.error || data.message || "Password change failed";
        setError(errorMessage);
        setTimeout(() => setError(""), 5000);
        setIsSubmitting(false);
        return;
      }

      localStorage.removeItem("DQ_USER_JWT_TOKEN");
      router.push("/authentication/login");
    } catch (err) {
      console.error("Password change error:", err);
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setTimeout(() => setError(""), 5000);
      setIsSubmitting(false);
    }
  };

  const handleCloseError = () => {
    setError("");
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
    <main className="bg-login_bg bg-cover bg-left">
      {error && (
        <div className="flex items-center px-3 py-2 mb-4 rounded-lg bg-red-100 text-red-600 border border-red-600 fixed sm:top-[130px] top-[70px] right-5 z-50">
          <div className="text-sm font-medium">{error}</div>
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
                placeholder="Enter your old password"
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
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
                placeholder="Confirm new password"
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                type="password"
                id="confirmPassword"
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
            <button
              className="text-[14px] font-[500] bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] w-full py-2 rounded text-[#131226] hover:text-white cursor-pointer transition-all duration-300"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
