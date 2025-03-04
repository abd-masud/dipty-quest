"use client";

import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import Image from "next/image";

interface JwtPayload {
  id: number;
  name: string;
  email: string;
  role: string;
  company: string;
  companyLogo: string;
}

export const ProfileCompound = () => {
  const [formData, setFormData] = useState<Partial<JwtPayload>>({});
  const [form] = Form.useForm();

  useEffect(() => {
    const token = localStorage.getItem("DQ_ADMIN_JWT_TOKEN");
    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        setFormData({
          id: decodedPayload.id,
          role: decodedPayload.role,
          name: decodedPayload?.name,
          email: decodedPayload?.email,
          company: decodedPayload?.company,
          companyLogo: decodedPayload?.companyLogo,
        });
      } catch (err) {
        console.error("Error decoding token", err);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      form.setFieldsValue(formData);
    }
  }, [formData, form]);

  return (
    <main>
      <Form
        form={form}
        className="lg:flex justify-between gap-4"
        layout="vertical"
      >
        <div className="bg-white rounded border p-5 shadow-md w-full h-full mb-5 max-w-screen-sm m-auto">
          <p className="border-b pb-5 mb-5 font-bold">Account Information</p>

          <Form.Item
            className="mt-3 w-full"
            label="Company Logo"
            name="companyLogo"
            rules={[
              { required: true, message: "Please upload the company logo!" },
            ]}
          >
            {formData?.companyLogo ? (
              <Image
                height={150}
                width={150}
                className="h-auto w-28"
                src={formData.companyLogo}
                alt="Company Logo"
              />
            ) : (
              <div>No logo uploaded</div>
            )}
          </Form.Item>

          <Form.Item
            className="mt-3 w-full"
            label="Username"
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

          <Form.Item
            className="mt-3 w-full"
            label="Company Name"
            name="company"
            rules={[{ required: true, message: "Please enter company name!" }]}
          >
            <Input className="py-2" placeholder="Enter company name" />
          </Form.Item>

          <Form.Item
            className="mt-3 w-full"
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please enter role!" }]}
          >
            <Input
              disabled
              className="py-2"
              type="text"
              placeholder="Enter role"
            />
          </Form.Item>

          <Form.Item>
            <button
              className="font-semibold bg-[#FAB616] w-full py-2 rounded-full text-[#131226] hover:bg-[#131226] hover:text-white border-b-2 border-[#0F0D26] hover:border-[#FBB614] transition-colors duration-300 flex items-center justify-center group"
              type="submit"
            >
              Submit
            </button>
          </Form.Item>
        </div>
      </Form>
    </main>
  );
};
