"use client";

import { useState } from "react";
import React from "react";
import Select, { StylesConfig } from "react-select";

interface Option {
  value: string;
  label: string;
}

export const EntrepreneurRegistrationForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [countryCode, setCountryCode] = useState("+880");
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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");
    console.log("Form Submitted");
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
                <label
                  className="text-[14px] text-[#131226]"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  placeholder="Enter first name"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="text"
                  id="firstName"
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
                    id="number"
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
                  id="education"
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
                  max={30}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]" htmlFor="skills">
                Skills
              </label>
              <input
                placeholder="Enter current company"
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                id="skills"
                required
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
                Share your business plan
              </label>
              <textarea
                placeholder="Enter current company"
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                id="plan"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-0">
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]" htmlFor="cv">
                  Upload CV
                </label>
                <input
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="file"
                  id="cv"
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

            <input
              className="text-[14px] font-[500] bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] w-full py-2 rounded text-[#131226] hover:text-white cursor-pointer transition-all duration-300 mt-4"
              type="submit"
              value={"Register"}
            />
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
