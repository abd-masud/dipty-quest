"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import React from "react";
import { FaXmark } from "react-icons/fa6";
import Select, { StylesConfig } from "react-select";
import { options } from "./Options";
import { jobSkills } from "./JobSkills";
import Link from "next/link";
import { signOut } from "next-auth/react";

const skills = jobSkills.map((jobSkill) => ({
  label: jobSkill,
  value: jobSkill,
}));

export const EntrepreneurRegistrationForm = () => {
  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+880");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [, setFile] = useState<File | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<
    { label: string; value: string }[]
  >([]);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (!token) {
      router.push("/authentication/login");
      return;
    }

    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));

      setUserId(decodedPayload?.id || "");
      setName(decodedPayload?.name || "");
      setEmail(decodedPayload?.email || "");
    } catch {
      router.push("/authentication/login");
    }
  }, [router]);

  const passwordRules = useMemo(
    () => ({
      minLength: (password: string) => password.length >= 8,
      hasUpperCase: (password: string) => /[A-Z]/.test(password),
      hasLowerCase: (password: string) => /[a-z]/.test(password),
      hasNumber: (password: string) => /\d/.test(password),
      hasSpecialChar: (password: string) => /[!@#$%^&*]/.test(password),
    }),
    []
  );

  const validatePassword = useCallback(
    (password: string) => {
      const newErrorMessages: string[] = [];

      if (!passwordRules.minLength(password)) {
        newErrorMessages.push("At least 8 characters long.");
      }
      if (!passwordRules.hasUpperCase(password)) {
        newErrorMessages.push("At least one uppercase letter.");
      }
      if (!passwordRules.hasLowerCase(password)) {
        newErrorMessages.push("At least one lowercase letter.");
      }
      if (!passwordRules.hasNumber(password)) {
        newErrorMessages.push("At least one number.");
      }
      if (!passwordRules.hasSpecialChar(password)) {
        newErrorMessages.push("At least one special character.");
      }

      setErrorMessages(newErrorMessages);
    },
    [passwordRules]
  );

  useEffect(() => {
    if (password) {
      validatePassword(password);
    } else {
      setErrorMessages([]);
    }
  }, [password, validatePassword]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const MAX_FILE_SIZE = 200 * 1024 * 1024;

      if (file.size > MAX_FILE_SIZE) {
        setError("Maximum limit of 200KB.");
        e.target.value = "";
        setFile(null);
      } else {
        setError(null);
        setFile(file);
      }
    }
  };

  const handleChange = (selected: any) => {
    setSelectedSkills(selected || []);
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsChecked(e.target.checked);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsProcessing(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (errorMessages.length > 0) {
      setErrorMessages(errorMessages);
      return;
    }

    const data = {
      id: userId,
      phone: (() => {
        let phone = (document.getElementById("number") as HTMLInputElement)
          .value;
        if (phone.startsWith("0")) {
          phone = phone.slice(1);
        }
        return countryCode + phone;
      })(),
      institute:
        document.querySelector(".react-select__single-value")?.textContent ||
        "",
      qualification: (
        document.getElementById("qualification") as HTMLInputElement
      ).value,
      experience: parseInt(
        (document.getElementById("experience") as HTMLInputElement).value,
        10
      ),
      business: (document.getElementById("business") as HTMLInputElement).value,
      plan: (document.getElementById("plan") as HTMLInputElement).value,
      skills: selectedSkills.map((skill) => skill.value),
      password: password,
      status: "Registered",
      primary: (
        document.getElementById("primary") as HTMLInputElement
      ).checked.toString(),
      role: "entrepreneur",
    };

    const formData = new FormData();

    const file = document.getElementById("file") as HTMLInputElement;

    const generateFileName = (file: File) => {
      const date = new Date();
      const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
      const formattedTime = `${date
        .getHours()
        .toString()
        .padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}${date
        .getSeconds()
        .toString()
        .padStart(2, "0")}${date
        .getMilliseconds()
        .toString()
        .padStart(3, "0")}`;
      const fileExtension = file.name.slice(file.name.lastIndexOf("."));
      return `${formattedDate}.${formattedTime}${fileExtension}`;
    };

    if (file && file.files && file.files[0]) {
      const fileToUpload = file.files[0];
      const newFileName = generateFileName(fileToUpload);
      const renamedFile = new File([fileToUpload], newFileName, {
        type: fileToUpload.type,
      });
      formData.append("file", renamedFile);
    } else {
      return;
    }

    formData.append("data", JSON.stringify(data));

    try {
      const response = await fetch("/api/authentication/user/action", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          localStorage.removeItem("DQ_USER_JWT_TOKEN");
          localStorage.removeItem("gigEnrollment");
          localStorage.removeItem("userEmail");
          await signOut({
            redirect: false,
            callbackUrl: "/authentication/login",
          });
          router.push("/authentication/login");
        } else {
          setIsProcessing(false);
          setError(result.message);
        }
      } else {
        setIsProcessing(false);
        setError("Email already exists");
      }
    } catch {
      setIsProcessing(false);
      setError("An error occurred. Please try again.");
    }

    setTimeout(() => setError(null), 5000);
  };

  const customStyles: StylesConfig<{ label: string; value: string }> = {
    control: (provided) => ({
      ...provided,
      borderColor: "#E3E5E9",
      borderRadius: "0.375rem",
      padding: "5px 0",
      fontSize: "14px",
      outline: "none",
      color: "black",
      width: "100%",
      transition: "border-color 0.3s",
      "&:hover": {
        borderColor: "#FAB616",
      },
      "&:focus": {
        borderColor: "#FAB616",
        outline: "none",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.375rem",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#E3E5E9" : "white",
      color: state.isSelected ? "#131226" : "#131226",
      padding: "5px 10px",
      fontSize: "14px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#E3E5E9",
        color: "#131226",
      },
    }),
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <main className="bg-login_bg bg-cover bg-center md:py-20 py-10">
      {error && (
        <div className="flex items-center px-3 py-2 mb-4 rounded-lg bg-red-100 text-red-600 border border-red-600 fixed sm:top-[130px] top-[70px] right-5 z-50">
          <div className="text-sm font-medium">{error}</div>
          <button onClick={handleCloseError}>
            <FaXmark className="ml-3 text-[14px]" />
          </button>
        </div>
      )}
      <div className="flex justify-center items-center">
        <div className="w-[700px] sm:px-10 px-8 sm:py-14 py-12 mx-5 border border-[#131226] bg-gray-100 shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]" htmlFor="name">
                First Name
              </label>
              <input
                placeholder="Enter first name"
                className="border text-[14px] text-[#131226] bg-white py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                type="text"
                id="name"
                value={name}
                disabled
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-0">
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]" htmlFor="email">
                  Email Address
                </label>
                <input
                  placeholder="Enter email address"
                  className="border text-[14px] text-[#131226] bg-white py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="email"
                  id="email"
                  value={email}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]" htmlFor="number">
                  Phone Number
                </label>
                <div className="flex">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="border text-[14px] text-[#131226] py-3 px-[10px] hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-l-md transition-all duration-300 mt-2 appearance-none"
                  >
                    <option value="+880">+880</option>
                  </select>

                  <input
                    placeholder="Enter phone number"
                    className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-r-md transition-all duration-300 mt-2"
                    type="text"
                    id="number"
                    maxLength={11}
                    minLength={10}
                    value={phoneNumber}
                    onChange={(e) => {
                      let value = e.target.value;
                      value = value.replace(/[^0-9]/g, "");
                      if (value.length > 0 && value[0] == "0") {
                        value = value.slice(1);
                      }
                      setPhoneNumber(value);
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]" htmlFor="institute">
                Institution
              </label>
              <Select
                id="university"
                options={options}
                placeholder="Select University"
                isSearchable
                className="react-select-container"
                classNamePrefix="react-select"
                styles={customStyles}
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-0">
              <div className="mb-4">
                <label
                  className="text-[14px] text-[#131226]"
                  htmlFor="education"
                >
                  Education Qualification
                </label>
                <input
                  placeholder="Enter department"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="text"
                  id="qualification"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="text-[14px] text-[#131226]"
                  htmlFor="experience"
                >
                  Work Experience (Month)
                </label>
                <input
                  placeholder="Enter work experience"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="number"
                  id="experience"
                  min={1}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]" htmlFor="skills">
                Major Skills
              </label>
              <Select
                id="skills"
                options={skills}
                placeholder="Select Skills"
                isSearchable
                isMulti
                value={selectedSkills}
                onChange={handleChange}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={customStyles}
              />
            </div>
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]" htmlFor="business">
                Do you have any current business? (Describe)
              </label>
              <textarea
                placeholder="Enter current company"
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                id="business"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]" htmlFor="plan">
                Share your business plan shortly
              </label>
              <textarea
                placeholder="Enter current company"
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                id="plan"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]" htmlFor="cv">
                Upload CV (.pdf / .docx)
              </label>
              <input
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full bg-white hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                type="file"
                id="file"
                accept=".pdf , .docx"
                onChange={(e) => handleFileChange(e, setFile)}
                required
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-0">
              <div className="mb-4">
                <label
                  className="text-[14px] text-[#131226]"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                    type="password"
                    id="password"
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter password"
                    className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                    type="password"
                    id="confirmPassword"
                    required
                  />
                </div>
              </div>
              {errorMessages.length > 0 && (
                <div className="text-red-600 text-sm mb-4 -mt-1 md:-mt-7">
                  <ol className="list-disc pl-5">
                    {errorMessages.map((message, index) => (
                      <li key={index} className="block">
                        {message}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <div className="mb-4">
              <div className="flex">
                <input className="mr-3" type="checkbox" id="primary" />
                <label className="text-[14px] text-[#131226]" htmlFor="primary">
                  Is this your primary phone number?
                </label>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-start">
                <input
                  className="mr-3 mt-1"
                  type="checkbox"
                  id="terms"
                  onChange={handleTermsChange}
                />
                <label className="text-[14px] text-[#131226]" htmlFor="terms">
                  By clicking &quot;Create an account&quot;, you confirm that
                  you agree to DiptyQuest{" "}
                  <Link
                    className="text-[#FAB616] font-bold"
                    href={"/terms-conditions"}
                  >
                    Terms & Conditions
                  </Link>
                  ,{" "}
                  <Link
                    className="text-[#FAB616] font-bold"
                    href={"/privacy-policy"}
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    className="text-[#FAB616] font-bold"
                    href={"/refund-policy"}
                  >
                    Refund Policy
                  </Link>
                  .
                </label>
              </div>
            </div>

            <input
              className={`text-[14px] font-[500] py-2 rounded w-full cursor-pointer transition-all duration-300 mt-4 ${
                isTermsChecked
                  ? "bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] text-[#131226] hover:text-white"
                  : "bg-gray-400 cursor-not-allowed text-[#131226] border-b-2 border-[#131226]"
              }`}
              type="submit"
              value={isProcessing ? "Processing..." : "Create an account"}
              disabled={!isTermsChecked || isProcessing}
            />

            <p className="text-[14px] text-[#131226] font-[500] mt-4">
              Already have an account?{" "}
              <Link
                className="text-[#131226] hover:text-[#FAB616] transition duration-300 font-bold"
                href={"/authentication/login"}
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};
