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
  poster: string;
  title: string;
  content: string;
  price: number;
}

interface GigsTableProps {
  gigs: DataType[];
  loading: boolean;
  fetchGigs: () => void;
}

export const GigsTable: React.FC<GigsTableProps> = ({
  gigs,
  fetchGigs,
  loading,
}) => {
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/gigs/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete gig");
      }

      fetchGigs();
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
          title={`Delete ${record.title}?`}
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
      title: "Poster",
      dataIndex: "poster",
      render: (poster: string) => (
        <Image
          className="py-2"
          src={poster}
          alt="poster"
          width={50}
          height={50}
          priority
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: number) => `${price} BDT`,
    },
    {
      title: "Action",
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
        <h2 className="text-[13px] font-[500]">Gigs Info</h2>
      </div>
      <Table
        scroll={{ x: 1400 }}
        columns={columns}
        dataSource={gigs}
        loading={loading}
        bordered
      />
    </main>
  );
};