"use client";

import React from "react";
import { Form, Input, Button } from "antd";
import { useAuth } from "@/components/Frontend/Context/AuthContext";

interface user {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const ProfileCompound = () => {
  const { user, setUser } = useAuth();

  const onFinish = (values: user) => {
    console.log("Form values:", values);
    setUser({
      ...user,
      id: values.id,
      name: values.name,
      email: values.email,
      role: values.role,
    });
  };

  return (
    <main>
      <Form
        className="lg:flex justify-between gap-4"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: user?.name,
          email: user?.email,
          role: user?.role,
        }}
      >
        <div className="bg-white rounded border p-5 shadow-md w-full h-full mb-5 max-w-screen-sm m-auto">
          <p className="border-b pb-5 mb-5 font-bold">Account Information</p>
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
