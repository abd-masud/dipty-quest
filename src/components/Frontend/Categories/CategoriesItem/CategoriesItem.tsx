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
  id: number;
  name: string;
  email: string;
}

interface CategoriesItemProps {
  categoryId: string;
}

export const CategoriesItem = ({ categoryId }: CategoriesItemProps) => {
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Partial<JwtPayload>>({});
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState<(() => void) | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        setFormData({
          id: decodedPayload.id,
          name: decodedPayload?.name,
        });
      } catch {}
    }
  }, []);

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

    setIsModalVisible(true);
    setPendingSubmit(() => async () => {
      const fileInput = document.getElementById("file") as HTMLInputElement;

      const data = {
        category_id: categoryId,
        user_id: formData.id,
      };

      const NewFormData = new FormData();

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
        NewFormData.append("file", renamedFile);
      } else {
        return;
      }

      NewFormData.append("data", JSON.stringify(data));
      const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
      if (!token) {
        router.push("/authentication/login");
      } else {
        try {
          const response = await fetch("/api/shared-plans/", {
            method: "POST",
            body: NewFormData,
          });

          if (!response.ok) {
            return;
          }

          if (fileInput) {
            fileInput.value = "";
          }

          setIsModalVisible(false);
          router.push("/categories");
        } catch {}
      }
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
        <div className="border p-5 rounded-lg bg-white shadow-lg">
          <p className="mb-5 whitespace-pre-line">{categoryData.content}</p>
        </div>
        {categoryData.file && (
          <div className="mt-6">
            <a
              href={categoryData.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] text-[#131226] hover:text-white transition-colors duration-200"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Download Template
            </a>
          </div>
        )}
      </div>
      <div className="md:py-20 py-10 flex justify-center px-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden border border-[#FAB616]">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">
                Upload Your File
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Please upload your document in PDF or PPTX format
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select File
                </label>
                <label htmlFor="file" className="block cursor-pointer">
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors duration-200">
                    {file ? (
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="mt-2 text-sm font-medium text-gray-900">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex justify-center text-sm text-gray-600">
                          <span className="relative bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                            Upload a file
                          </span>
                          <span className="pl-1">or drag and drop</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF or PPTX up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.docx"
                  onChange={(e) => handleFileChange(e, setFile)}
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="text-[14px] font-[500] bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] w-full py-2 rounded text-[#131226] hover:text-white cursor-pointer transition-all duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
            <Modal
              title="Warning!"
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
              <div className="flex justify-center items-center text-center">
                <Image src={Warning} alt="Warning" width={120} height={120} />
              </div>
              {formData.name ? (
                <div>
                  <p className="text-center font-bold text-[20px] mb-5">
                    Hey {formData.name}!
                  </p>
                  <p className="text-center">
                    You are about to submit the file. Are you sure?
                  </p>
                </div>
              ) : (
                <p className="text-center font-bold text-[20px] mb-5">
                  You are not logged in. Do you want to log in?
                </p>
              )}
            </Modal>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};
