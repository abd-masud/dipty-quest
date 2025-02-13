"use client";

import { Footer } from "../../Footer/Footer";
import { Media } from "../../Home/Media";
import { Navigation } from "../../Navigation/Navigation";
import { Breadcrumbs } from "./Breadcrumbs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import Warning from "../../../../../public/images/warning.webp";
import Image from "next/image";
import Loader from "@/components/Loader";

interface Category {
  id: number;
  title: string;
  content: string;
  file: string | null;
}

interface JwtPayload {
  name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface CategoriesItemProps {
  categoryId: string;
}

export const CategoriesItem = ({ categoryId }: CategoriesItemProps) => {
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Partial<JwtPayload>>({});
  const [loading, setLoading] = useState(true);
  const [, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState<(() => void) | null>(null);
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
      setFormData({
        name: decodedPayload?.name,
        last_name: decodedPayload?.last_name,
        email: decodedPayload?.email,
        phone: decodedPayload?.phone,
      });
    } catch {
      router.push("/authentication/login");
    }
  }, [router]);

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategoryData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/category-items/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Category-Id": categoryId,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch category data");
        }
        const data = await response.json();
        setCategoryData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill out all required fields.");
      return false;
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone || "")) {
      setError("Invalid phone number.");
      return false;
    }
    return true;
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsModalVisible(true);
    setPendingSubmit(() => async () => {
      const nameInput = document.getElementById("name") as HTMLInputElement;
      const lastNameInput = document.getElementById(
        "lastName"
      ) as HTMLInputElement;
      const emailInput = document.getElementById("email") as HTMLInputElement;
      const numberInput = document.getElementById("number") as HTMLInputElement;
      const fileInput = document.getElementById("file") as HTMLInputElement;

      const phoneInput = (() => {
        let phone = numberInput.value;
        if (phone.startsWith("0")) {
          phone = phone.slice(1);
        }
        return phone;
      })();

      const data = {
        category_id: categoryId,
        category_name: categoryData?.title,
        name: nameInput.value,
        last_name: lastNameInput.value,
        email: emailInput.value,
        phone: phoneInput,
      };

      const formData = new FormData();

      const generateFileName = (file: File) => {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
        const formattedTime = `${date
          .getHours()
          .toString()
          .padStart(2, "0")}${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}${date
          .getSeconds()
          .toString()
          .padStart(2, "0")}${date
          .getMilliseconds()
          .toString()
          .padStart(3, "0")}`;
        const fileExtension = file.name.slice(file.name.lastIndexOf("."));
        return `${formattedDate}.${formattedTime}${fileExtension}`;
      };

      if (fileInput && fileInput.files && fileInput.files[0]) {
        const fileToUpload = fileInput.files[0];
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
        const response = await fetch("/api/shared-plans/", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          return;
        }

        if (fileInput) {
          fileInput.value = "";
        }

        setIsModalVisible(false);
      } catch {}
    });
  };

  const handleModalConfirm = () => {
    if (pendingSubmit) pendingSubmit();
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setPendingSubmit(() => null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  if (loading) {
    return (
      <main>
        <Media />
        <div className="sticky top-0 z-50">
          <Navigation />
        </div>
        <Breadcrumbs />
        <div className="overflow-hidden">
          <div className="-mt-52 -mb-52">
            <Loader />
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <Media />
        <div className="sticky top-0 z-50">
          <Navigation />
        </div>
        <Breadcrumbs />
        <div className="overflow-hidden">
          <div className="-mt-52 -mb-52">
            <Loader />
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!categoryData) {
    return (
      <main>
        <Media />
        <div className="sticky top-0 z-50">
          <Navigation />
        </div>
        <Breadcrumbs />
        <div className="overflow-hidden">
          <div className="-mt-52 -mb-52">
            <Loader />
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Breadcrumbs />
      <div className="max-w-screen-xl mx-auto px-4 mt-10">
        <h2 className="md:text-[56px] sm:text-[35px] text-[28px] text-[#131226] font-semibold leading-tight mb-5">
          {categoryData.title}
        </h2>
        <p className="mb-5 whitespace-pre-line">{categoryData.content}</p>
        {categoryData.file && (
          <a
            href={categoryData.file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Download Template
          </a>
        )}
      </div>
      <main className="md:py-20 py-10">
        <div className="flex justify-center items-center">
          <div className="w-[700px] sm:px-10 px-8 sm:py-14 py-12 mx-5 border border-[#131226] bg-gray-100 shadow-xl">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-0">
                <div className="mb-4">
                  <label className="text-[14px] text-[#131226]">
                    First Name
                  </label>
                  <input
                    placeholder="Enter first name"
                    className="border text-[14px] text-[#131226] py-3 px-[10px] w-full bg-white hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                    id="name"
                    disabled
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="text-[14px] text-[#131226]">
                    Last Name
                  </label>
                  <input
                    placeholder="Enter last name"
                    className="border text-[14px] text-[#131226] py-3 px-[10px] w-full bg-white hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                    id="lastName"
                    disabled
                    value={formData.last_name || ""}
                    onChange={handleInputChange}
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
                    className="border text-[14px] text-[#131226] py-3 px-[10px] w-full bg-white hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                    type="email"
                    id="email"
                    disabled
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="text-[14px] text-[#131226]"
                    htmlFor="number"
                  >
                    Phone Number
                  </label>
                  <input
                    placeholder="Enter phone number"
                    className="border text-[14px] text-[#131226] py-3 px-[10px] w-full bg-white hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                    type="text"
                    id="number"
                    disabled
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    maxLength={11}
                    minLength={10}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">
                  Upload File
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

              <input
                className="text-[14px] font-[500] bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] w-full py-2 rounded text-[#131226] hover:text-white cursor-pointer transition-all duration-300 mt-4"
                type="submit"
                value={"Submit"}
              />
            </form>
            <Modal
              className="flex flex-col justify-center items-center mx-auto"
              title="Confirmation"
              open={isModalVisible}
              onOk={handleModalConfirm}
              onCancel={handleModalCancel}
              okText="Yes"
              cancelText="No"
              okButtonProps={{
                style: {
                  borderBottom: "2px solid #131226",
                  backgroundColor: "#FAB616",
                  color: "#131226",
                  transition: "all 0.3s ease",
                },
                onMouseOver: (e: React.MouseEvent) => {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.backgroundColor = "#131226";
                  target.style.color = "white";
                  target.style.borderBottomColor = "#FAB616";
                },
                onMouseOut: (e: React.MouseEvent) => {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.backgroundColor = "#FAB616";
                  target.style.color = "#131226";
                  target.style.borderBottomColor = "#131226";
                },
              }}
              cancelButtonProps={{
                style: {
                  borderBottom: "2px solid #FAB616",
                  backgroundColor: "#131226",
                  color: "white",
                  transition: "all 0.3s ease",
                },
                onMouseOver: (e: React.MouseEvent) => {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.backgroundColor = "#FAB616";
                  target.style.color = "#131226";
                  target.style.borderBottomColor = "#131226";
                },
                onMouseOut: (e: React.MouseEvent) => {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.backgroundColor = "#131226";
                  target.style.color = "white";
                  target.style.borderBottomColor = "#FAB616";
                },
              }}
            >
              <Image
                className="mx-auto mt-10"
                src={Warning}
                height={150}
                width={150}
                alt="Warning"
              />
              <p className="text-center font-bold text-[20px] mb-5">
                Hey {formData.name}!
              </p>
              <p className="px-10">Are you want to submit this form?</p>
            </Modal>
          </div>
        </div>
      </main>
      <Footer />
    </main>
  );
};
