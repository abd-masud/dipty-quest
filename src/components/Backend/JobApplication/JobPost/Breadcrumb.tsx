"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaAngleRight,
  // , FaPlus
} from "react-icons/fa";
import { Modal, Input, DatePicker, TimePicker, Form, InputNumber } from "antd";
import { Moment } from "moment";

interface BreadcrumbProps {
  fetchEvents: () => void;
}

interface FormValues {
  event: string;
  date: Moment;
  duration: number;
  time_begin: Moment;
  time_end: Moment;
  location: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ fetchEvents }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const formattedData = {
        event: values.event,
        date: values.date.format("YYYY-MM-DD"),
        duration: values.duration,
        time_begin: values.time_begin.format("HH:mm"),
        time_end: values.time_end.format("HH:mm"),
        location: values.location,
      };

      const response = await fetch("/api/job-app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit event");
      }

      form.resetFields();
      setIsModalVisible(false);

      fetchEvents();
    } catch {}
  };

  return (
    <>
      <main className="mb-4 pb-4 border-b flex justify-between items-center">
        <div>
          <p className="text-[16px] font-[600]">Job Posts</p>
          <div className="md:block hidden">
            <div className="flex items-center">
              <Link className="text-[12px] text-[#797c8b]" href="/dashboard">
                Dashboard
              </Link>
              <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
              <p className="text-[12px] text-[#797c8b]">Job Application</p>
              <FaAngleRight className="text-[12px] text-[#797c8b] mx-2" />
              <p className="text-[12px] text-[#797c8b]">Job Posts</p>
            </div>
          </div>
        </div>
        {/* <button
          className="bg-[#FAB616] text-[#131226] flex items-center border-b-2 border-[#131226] hover:bg-[#FAB616] transition duration-300 text-[13px] py-2 px-3 rounded ml-4"
          onClick={showModal}
        >
          <FaPlus />
          <span className="font-semibold ml-2">Job</span>
        </button> */}
      </main>

      <Modal
        title="Add New Job"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Job Post"
            name="job-post"
            rules={[{ required: true, message: "Please input the job post!" }]}
          >
            <Input className="py-2" placeholder="Enter job post" />
          </Form.Item>

          <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-0">
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select a date!" }]}
            >
              <DatePicker className="py-2 w-full" format="DD MMM YYYY" />
            </Form.Item>

            <Form.Item
              label="Duration (Day)"
              name="duration"
              rules={[
                { required: true, message: "Please input the duration!" },
              ]}
            >
              <InputNumber
                min={1}
                className="py-2 w-full"
                placeholder="Enter duration"
              />
            </Form.Item>
          </div>

          <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-0">
            <Form.Item
              label="Time (Begin)"
              name="time_begin"
              rules={[
                { required: true, message: "Please select the start time!" },
              ]}
            >
              <TimePicker className="py-2 w-full" format="hh:mm a" />
            </Form.Item>

            <Form.Item
              label="Time (End)"
              name="time_end"
              rules={[
                { required: true, message: "Please select the end time!" },
              ]}
            >
              <TimePicker className="py-2 w-full" format="hh:mm a" />
            </Form.Item>
          </div>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please input the location!" }]}
          >
            <Input className="py-2" placeholder="Enter location" />
          </Form.Item>

          <button
            type="submit"
            className="text-[14px] font-[500] bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] w-full py-2 rounded text-[#131226] hover:text-white cursor-pointer transition-all duration-300"
          >
            Submit
          </button>
        </Form>
      </Modal>
    </>
  );
};
