"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaAngleRight, FaPlus } from "react-icons/fa";
import { Modal } from "antd";

interface BreadcrumbProps {
  fetchCategories: () => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ fetchCategories }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [, setFile] = useState<File | null>(null);
  const [, setIcon] = useState<File | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const titleInput = document.getElementById("title") as HTMLInputElement;
    const contentInput = document.getElementById(
      "content"
    ) as HTMLTextAreaElement;
    const fileInput = document.getElementById("file") as HTMLInputElement;
    const iconInput = document.getElementById("icon") as HTMLInputElement;

    const data = {
      title: titleInput.value,
      content: contentInput.value,
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

    if (fileInput && fileInput.files && fileInput.files[0]) {
      const fileToUpload = fileInput.files[0];
      const newFileName = generateFileName(fileToUpload);
      const renamedFile = new File([fileToUpload], newFileName, {
        type: fileToUpload.type,
      });
      formData.append("file", renamedFile);
    }

    if (iconInput && iconInput.files && iconInput.files[0]) {
      const iconToUpload = iconInput.files[0];
      const newIconName = generateFileName(iconToUpload);
      const renamedIcon = new File([iconToUpload], newIconName, {
        type: iconToUpload.type,
      });
      formData.append("icon", renamedIcon);
    }

    formData.append("data", JSON.stringify(data));

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        return;
      }

      titleInput.value = "";
      contentInput.value = "";
      if (fileInput) fileInput.value = "";
      if (iconInput) iconInput.value = "";

      setIsModalVisible(false);
      fetchCategories();
    } catch {}
  };

  return (
    <>
      <main className="mb-4 pb-4 border-b flex justify-between items-center">
        <div>
          <p className="text-[16px] font-[600]">Categories</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link className="text-[12px] text-[#797c8b]" href="/dashboard">
                Dashboard
              </Link>
              <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
              <p className="text-[12px] text-[#797c8b]">Categories</p>
            </div>
          </div>
        </div>
        <button
          className="bg-[#FAB616] text-[#131226] flex items-center border-b-2 border-[#131226] hover:bg-[#FAB616] transition duration-300 text-[13px] py-2 px-3 rounded ml-4"
          onClick={showModal}
        >
          <FaPlus />
          <span className="font-semibold ml-2">Categories</span>
        </button>
      </main>

      <Modal
        title="Add New Category"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-[14px] text-[#131226]" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter title"
              className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
              id="title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-[14px] text-[#131226]" htmlFor="content">
              Content
            </label>
            <textarea
              placeholder="Enter content"
              className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
              id="content"
              required
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-0">
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]" htmlFor="photo">
                Upload Icon
              </label>
              <input
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                type="file"
                id="icon"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setIcon)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-[14px] text-[#131226]" htmlFor="resume">
                Upload File (.pdf / .pptx)
              </label>
              <input
                className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                type="file"
                id="file"
                accept=".pdf , .pptx"
                onChange={(e) => handleFileChange(e, setFile)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-[14px] font-[500] bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] w-full py-2 rounded text-[#131226] hover:text-white cursor-pointer transition-all duration-300 mt-4"
          >
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
};
