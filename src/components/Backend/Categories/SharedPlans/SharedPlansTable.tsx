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

interface DataType {
  key: string;
  id: number;
  category_id: number;
  category_name: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  file: string;
}

interface CategoriesTableProps {
  employers: DataType[];
  loading: boolean;
  fetchCategories: () => void;
}

export const SharedPlansTable: React.FC<CategoriesTableProps> = ({
  employers,
  fetchCategories,
  loading,
}) => {
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/shared-plans/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete plan");
      }

      fetchCategories();
    } catch {}
  };

  const getMenuItems = (record: DataType): MenuProps["items"] => [
    // {
    //   key: "edit",
    //   label: (
    //     <Button
    //       icon={<MdEdit />}
    // onClick={() => showEditModal(record)}
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
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
    },
    {
      title: "File",
      dataIndex: "file",
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
        <h2 className="text-[13px] font-[500]">Categories Info</h2>
      </div>
      <Table
        scroll={{ x: 1400 }}
        columns={columns}
        dataSource={employers}
        loading={loading}
        bordered
      />
    </main>
  );
};
