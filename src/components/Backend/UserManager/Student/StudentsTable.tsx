"use client";

import {
  Table,
  TableColumnsType,
  Button,
  Dropdown,
  MenuProps,
  Popconfirm,
} from "antd";
import React from "react";
import { MdDelete } from "react-icons/md";
import Image from "next/image";

interface DataType {
  key: string;
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  institute: string;
  qualification: string;
  department: string;
  graduation: string;
  duration: number;
  company: string;
  experience: number;
  business: string;
  plan: string;
  skills: string;
  switch: string;
  file: string;
  photo: string;
  primary: string;
  status: string;
}

interface StudentsTableProps {
  students: DataType[];
  loading: boolean;
  fetchStudents: () => void;
}

export const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
  fetchStudents,
  loading,
}) => {
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/authentication/user/action/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      fetchStudents();
    } catch {}
  };

  const getMenuItems = (record: DataType): MenuProps["items"] => [
    // {
    //   key: "edit",
    //   label: (
    //     <Button
    //       icon={<MdEdit />}
    //       onClick={() => showEditModal(record)}
    //       type="link"
    //     >
    //       Edit
    //     </Button>
    //   ),
    // },
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
      width: "40px",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Photo",
      dataIndex: "photo",
      width: "80px",
      render: (photo: string) => (
        <Image
          className="py-2"
          src={photo}
          alt="Student"
          width={50}
          height={50}
          priority
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
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
      title: "Institute",
      dataIndex: "institute",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Graduation",
      dataIndex: "duration",
      width: "100px",
      render: (duration: number) => {
        return `${duration} year${duration !== 1 ? "s" : ""}`;
      },
    },
    {
      title: "Resume",
      dataIndex: "file",
      width: "90px",
      render: (file: string) => (
        <a
          className="text-blue-900 border-b border-blue-900 hover:border-blue-300 transition duration-300"
          href={file}
          target="_blank"
          rel="noopener noreferrer"
        >
          View file
        </a>
      ),
    },
    {
      title: "Primary PN",
      dataIndex: "primary",
      width: "110px",
      render: (primary: string) => (primary === "1" ? "Yes" : "No"),
    },
    {
      title: "Status",
      width: "100px",
      dataIndex: "status",
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
        <h2 className="text-[13px] font-[500]">Students Info</h2>
      </div>
      <Table
        scroll={{ x: 1400 }}
        columns={columns}
        dataSource={students}
        loading={loading}
        bordered
      />
    </main>
  );
};
