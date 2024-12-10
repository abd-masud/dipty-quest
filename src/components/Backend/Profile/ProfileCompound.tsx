"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  GetProp,
  UploadProps,
  message,
  Upload,
} from "antd";
import Image from "next/image";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
// import dummy from "../../../public/images/dummy.png";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export const ProfileCompound = () => {
  const [loading, setLoading] = useState(false);
  const [dummy, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (dummy) => {
        setLoading(false);
        setImageUrl(dummy);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const onFinish = (values: string) => {
    console.log("Form values:", values);
  };

  return (
    <main>
      <Form
        className="lg:flex justify-between gap-4"
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="bg-white rounded border p-5 shadow-md w-full h-full mb-5 max-w-screen-sm m-auto">
          <p className="border-b pb-5 mb-5 font-bold">Account Information</p>

          <p className="text-left mb-2">User Image</p>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {dummy ? (
              <Image src={dummy} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
          <Form.Item
            className="mt-3 w-full"
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter name!" }]}
          >
            <Input className="py-2" placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            className="mt-3 w-full"
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Please enter email address!" }]}
          >
            <Input
              className="py-2"
              type="email"
              placeholder="Enter email address"
            />
          </Form.Item>
          <Form.Item>
            <Button className="flex" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </main>
  );
};
