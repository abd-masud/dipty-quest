"use client";

import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";

interface JwtPayload {
  id: string;
  role: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  institute: string;
  department: string;
  duration: string;
  file: string;
  photo: string;
  primary: string;
}

export const ProfileCompound = () => {
  const [form] = Form.useForm(); // Use form instance to set fields dynamically
  const [, setFormData] = useState<Partial<JwtPayload>>({});

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64Payload));

        setFormData(decodedPayload);
        form.setFieldsValue(decodedPayload); // This ensures the form updates dynamically
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [form]); // Depend on form to ensure updates

  const onFinish = (values: any) => {
    console.log("Form submitted:", values);
  };

  return (
    <main>
      <Form
        form={form}
        className="lg:flex justify-between gap-4"
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="bg-white rounded border p-5 shadow-md w-full h-full mb-5 max-w-screen-sm m-auto">
          <p className="border-b pb-5 mb-5 font-bold">Account Information</p>

          {/* <Form.Item label="ID" name="id">
            <Input disabled className="py-2" />
          </Form.Item>

          <Form.Item label="Role" name="role">
            <Input disabled className="py-2" />
          </Form.Item> */}

          <Form.Item
            label="First Name"
            name="name"
            rules={[{ required: true, message: "Please enter first name!" }]}
          >
            <Input className="py-2" placeholder="Enter your first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Please enter last name!" }]}
          >
            <Input className="py-2" placeholder="Enter your last name" />
          </Form.Item>

          <Form.Item
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

          <Form.Item label="Phone" name="phone">
            <Input className="py-2" placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item label="Institute" name="institute">
            <Input className="py-2" placeholder="Enter institute" />
          </Form.Item>

          <Form.Item label="Department" name="department">
            <Input className="py-2" placeholder="Enter department" />
          </Form.Item>

          <Form.Item label="Graduation Duration" name="duration">
            <Input className="py-2" placeholder="Enter graduation year" />
          </Form.Item>

          <Form.Item label="File" name="file">
            <Input className="py-2" placeholder="Enter file name" />
          </Form.Item>

          <Form.Item label="Photo URL" name="photo">
            <Input className="py-2" placeholder="Enter photo URL" />
          </Form.Item>

          <Form.Item label="Primary" name="primary">
            <Input className="py-2" placeholder="Enter primary info" />
          </Form.Item>

          {/* <Form.Item>
            <button
              className="font-semibold bg-[#FAB616] w-full py-2 rounded-full text-[#131226] hover:bg-[#131226] hover:text-white border-b-2 border-[#0F0D26] hover:border-[#FBB614] transition-colors duration-300 flex items-center justify-center group"
              type="submit"
            >
              Submit
            </button>
          </Form.Item> */}
        </div>
      </Form>
    </main>
  );
};
