"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import Select, { StylesConfig } from "react-select";

interface Option {
  value: string;
  label: string;
}

export const StudentRegistrationForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [countryCode, setCountryCode] = useState("+880");
  const [, setFile] = useState<File | null>(null);
  const [, setPhoto] = useState<File | null>(null);
  const [isLoading] = useState(false);
  const router = useRouter();

  const options = [
    { value: "University of Dhaka", label: "University of Dhaka" },
    { value: "University of Rajshahi", label: "University of Rajshahi" },
    {
      value: "Bangladesh Agricultural University",
      label: "Bangladesh Agricultural University",
    },
    {
      value: "Bangladesh University of Engineering & Technology",
      label: "Bangladesh University of Engineering & Technology",
    },
    { value: "University of Chittagong", label: "University of Chittagong" },
    { value: "Jahangirnagar University", label: "Jahangirnagar University" },
  ];

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");

    const data = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      last_name: (document.getElementById("lastName") as HTMLInputElement)
        .value,
      email: (document.getElementById("email") as HTMLInputElement).value,
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
      qualification: "NA",
      department: (document.getElementById("department") as HTMLInputElement)
        .value,
      graduation: "NA",
      duration: parseInt(
        (document.getElementById("duration") as HTMLInputElement).value,
        10
      ),
      company: "NA",
      experience: 0,
      business: "NA",
      plan: "NA",
      skills: "NA",
      switch: "NA",
      password: password,
      status: "Registered",
      primary: (
        document.getElementById("primary") as HTMLInputElement
      ).checked.toString(),
      role: "student",
    };

    const formData = new FormData();

    const file = document.getElementById("file") as HTMLInputElement;
    const photo = document.getElementById("photo") as HTMLInputElement;

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

    if (photo && photo.files && photo.files[0]) {
      const photoToUpload = photo.files[0];
      const newPhotoName = generateFileName(photoToUpload);
      const renamedPhoto = new File([photoToUpload], newPhotoName, {
        type: photoToUpload.type,
      });
      formData.append("photo", renamedPhoto);
    } else {
      return;
    }

    formData.append("data", JSON.stringify(data));

    console.log("Form Data: ");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch("/api/authentication/user/action", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Failed to submit data", response.statusText);
        return;
      }

      router.push("/authentication/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const customStyles: StylesConfig<Option, false> = {
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

  return (
    <main className="bg-login_bg bg-cover bg-center md:py-20 py-10">
      <div className="flex justify-center items-center">
        <div className="w-[700px] sm:px-10 px-8 sm:py-14 py-12 mx-5 border border-[#131226] bg-gray-100 shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-0">
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]" htmlFor="name">
                  First Name
                </label>
                <input
                  placeholder="Enter first name"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="text"
                  id="name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="text-[14px] text-[#131226]"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  placeholder="Enter last name"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="text"
                  id="lastName"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-0">
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]" htmlFor="email">
                  Email Address
                </label>
                <input
                  placeholder="Enter email address"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="email"
                  id="email"
                  required
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
                required
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-0">
              <div className="mb-4">
                <label
                  className="text-[14px] text-[#131226]"
                  htmlFor="department"
                >
                  Department
                </label>
                <input
                  placeholder="Enter department"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="text"
                  id="department"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="text-[14px] text-[#131226]"
                  htmlFor="duration"
                >
                  Duration (Years to Finish Graduation)
                </label>
                <input
                  placeholder="Enter duration"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="number"
                  id="duration"
                  min={1}
                  max={6}
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-0">
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]" htmlFor="resume">
                  Upload Resume
                </label>
                <input
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="file"
                  id="file"
                  accept=".pdf , .docx"
                  onChange={(e) => handleFileChange(e, setFile)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]" htmlFor="photo">
                  Upload Photo
                </label>
                <input
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setPhoto)}
                  required
                />
              </div>
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
            </div>

            <div className="mb-4">
              <div className="flex items-center">
                <input className="mr-3" type="checkbox" id="primary" />
                <label className="text-[14px] text-[#131226]" htmlFor="primary">
                  Is this your primary phone number?
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="text-[14px] font-[500] bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] w-full py-2 rounded text-[#131226] hover:text-white cursor-pointer transition-all duration-300 mt-4"
            >
              {isLoading ? "Sending..." : "Register"}
            </button>
            {passwordError && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {passwordError}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};
