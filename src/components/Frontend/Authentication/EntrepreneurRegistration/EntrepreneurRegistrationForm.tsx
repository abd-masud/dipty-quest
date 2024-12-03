"use client";

// import { useRouter } from "next/navigation";
import { useState } from "react";

export const EntrepreneurRegistrationForm = () => {
  // const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");
    console.log("Form Submitted");
  };

  return (
    <main className="bg-login_bg bg-cover bg-center md:py-20 py-10">
      <div className="flex justify-center items-center">
        <div className="w-[700px] sm:px-10 px-8 sm:py-14 py-12 mx-5 border border-[#131226] bg-gray-100 shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-0">
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">First Name</label>
                <input
                  placeholder="Enter first name"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="text"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">Last Name</label>
                <input
                  placeholder="Enter last name"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-0">
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">
                  Email Address
                </label>
                <input
                  placeholder="Enter email address"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">
                  Phone Number
                </label>
                <input
                  placeholder="Enter phone number"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]">Institution</label>
              <input
                placeholder="Enter institution"
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                type="text"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-0">
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">
                  Education Qualification
                </label>
                <input
                  placeholder="Enter department"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="text"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">
                  Work Experience (Month)
                </label>
                <input
                  placeholder="Enter work experience"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="number"
                  min={1}
                  max={30}
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-0"></div>
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]">
                Do you have any current business? (Describe)
              </label>
              <textarea
                placeholder="Enter current company"
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]">
                Share your business plan
              </label>
              <textarea
                placeholder="Enter current company"
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-0">
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">Upload CV</label>
                <input
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="file"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">
                  Upload Photo
                </label>
                <input
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="file"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-0">
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">Password</label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                    type="password"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter password"
                    className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                    type="password"
                    required
                  />
                </div>
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
