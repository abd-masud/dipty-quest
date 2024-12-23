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
  designation: string;
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

interface ProfessionalsTableProps {
  students: DataType[];
  loading: boolean;
  fetchProfessionals: () => void;
}

export const ProfessionalsTable: React.FC<ProfessionalsTableProps> = ({
  students,
  fetchProfessionals,
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

      fetchProfessionals();
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
      dataIndex: "graduation",
      width: "120px",
      render: (graduation: string) => {
        const [day, month, year] = graduation.split("-");
        const date = new Date(`${year}-${month}-${day}`);
        const options: Intl.DateTimeFormatOptions = {
          day: "2-digit",
          month: "short",
          year: "numeric",
        };
        return date.toLocaleDateString("en-GB", options);
      },
    },

    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Experience",
      dataIndex: "experience",
      render: (experience: number) => {
        return `${experience} month${experience !== 1 ? "s" : ""}`;
      },
    },
    {
      title: "Skills",
      dataIndex: "skills",
    },
    {
      title: "Switching Reason",
      dataIndex: "switch",
      width: "150px",
    },
    {
      title: "CV",
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
      dataIndex: "status",
      width: "100px",
    },
    {
      title: "Action",
      width: "110px",
      fixed: "right",
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
        <h2 className="text-[13px] font-[500]">Professionals Info</h2>
      </div>
      <Table
        scroll={{ x: 1800 }}
        columns={columns}
        dataSource={students}
        loading={loading}
        bordered
      />
    </main>
  );
};
