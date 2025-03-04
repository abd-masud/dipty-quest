"use client";

import {
  Table,
  TableColumnsType,
  Button,
  Dropdown,
  MenuProps,
  Popconfirm,
  Form,
} from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

interface DataType {
  key: string;
  id: number;
  job_id: number;
  user_id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  photo: string;
  file: string;
}

interface ApplicantsTableProps {
  applicants: DataType[];
  loading: boolean;
  fetchApplicants: () => void;
}

export const ApplicantsList: React.FC<ApplicantsTableProps> = ({
  applicants,
  fetchApplicants,
  loading,
}) => {
  const [, setIsModalVisible] = useState<boolean>(false);
  const [, setCurrentEvent] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/job-app/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      fetchApplicants();
    } catch {}
  };

  const showEditModal = (applicants: DataType) => {
    setCurrentEvent(applicants);
    form.setFieldsValue({
      job_id: applicants.job_id,
      user_id: applicants.user_id,
      name: applicants.name,
      last_name: applicants.last_name,
      email: applicants.email,
      phone: applicants.phone,
      photo: applicants.photo,
      file: applicants.file,
    });
    setIsModalVisible(true);
  };

  const getMenuItems = (record: DataType): MenuProps["items"] => [
    {
      key: "edit",
      label: (
        <Button
          icon={<MdEdit />}
          onClick={() => showEditModal(record)}
          type="link"
        >
          Edit
        </Button>
      ),
    },
    {
      key: "delete",
      label: (
        <Popconfirm
          title={`Delete ${record.name}?`}
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            <MdDelete />
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const columns: TableColumnsType<DataType> = [
    {
      title: "#",
      render: (_, __, index) => index + 1,
    },
    {
      title: "job Title",
      dataIndex: "job_title",
    },
    {
      title: "Applicants",
      dataIndex: "photo",
      width: "100px",
      render: (url: string) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src={url}
            alt="photo"
            width={150}
            height={150}
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              border: "1px solid black",
            }}
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (_: any, record: { name: string; last_name: string }) =>
        `${record.name} ${record.last_name}`,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "150px",
    },
    {
      title: "File",
      dataIndex: "file",
      width: "90px",
      render: (url: string) => (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1890ff", textDecoration: "underline" }}
        >
          View File
        </a>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "100px",
    },
    {
      title: "Action",
      width: "100px",
      render: (_, record) => (
        <Dropdown menu={{ items: getMenuItems(record) }} trigger={["click"]}>
          <Button>Options</Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <main className="bg-white p-5 mt-6 rounded-lg border shadow-md">
      <div className="flex items-center pb-5">
        <div className="h-2 w-2 bg-[#E3E4EA] rounded-full mr-2"></div>
        <h2 className="text-[13px] font-[500]">Jobs List</h2>
      </div>
      <Table
        scroll={{ x: 1400 }}
        columns={columns}
        dataSource={applicants}
        loading={loading}
        bordered
      />
    </main>
  );
};
