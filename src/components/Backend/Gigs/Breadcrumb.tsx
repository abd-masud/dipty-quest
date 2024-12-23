"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaAngleRight, FaPlus } from "react-icons/fa";
import { Modal } from "antd";

interface BreadcrumbProps {
  fetchGigs: () => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ fetchGigs }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [, setPoster] = useState<File | null>(null);

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
    const priceInput = document.getElementById("price") as HTMLInputElement;
    const posterInput = document.getElementById("poster") as HTMLInputElement;

    const data = {
      title: titleInput.value,
      content: contentInput.value,
      price: priceInput.value,
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

    if (posterInput && posterInput.files && posterInput.files[0]) {
      const posterToUpload = posterInput.files[0];
      const newPosterName = generateFileName(posterToUpload);
      const renamedPoster = new File([posterToUpload], newPosterName, {
        type: posterToUpload.type,
      });
      formData.append("poster", renamedPoster);
    }

    formData.append("data", JSON.stringify(data));

    try {
      const response = await fetch("/api/gigs", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        return;
      }

      titleInput.value = "";
      contentInput.value = "";
      priceInput.value = "";
      if (posterInput) posterInput.value = "";

      setIsModalVisible(false);
      fetchGigs();
    } catch {}
  };

  return (
    <>
      <main className="mb-4 pb-4 border-b flex justify-between items-center">
        <div>
          <p className="text-[16px] font-[600]">Gigs</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link className="text-[12px] text-[#797c8b]" href="/dashboard">
                Dashboard
              </Link>
              <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
              <p className="text-[12px] text-[#797c8b]">Gigs</p>
            </div>
          </div>
        </div>
        <button
          className="bg-[#FAB616] text-[#131226] flex items-center border-b-2 border-[#131226] hover:bg-[#FAB616] transition duration-300 text-[13px] py-2 px-3 rounded ml-4"
          onClick={showModal}
        >
          <FaPlus />
          <span className="font-semibold ml-2">Gigs</span>
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
          <div className="mb-4">
            <label className="text-[14px] text-[#131226]" htmlFor="price">
              Price (BDT)
            </label>
            <input
              placeholder="Enter price"
              className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
              id="price"
              type="number"
              min={0}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-[14px] text-[#131226]" htmlFor="poster">
              Upload Poster
            </label>
            <input
              className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
              type="file"
              id="poster"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setPoster)}
              required
            />
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
