"use client";

import { Table, TableColumnsType } from "antd";
import Image from "next/image";
import React from "react";

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
  loading,
}) => {
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
  ];

  return (
    <main className="bg-white p-5 mt-6 rounded-lg border shadow-md">
      <div className="flex items-center pb-5">
        <div className="h-2 w-2 bg-[#E3E4EA] rounded-full mr-2"></div>
        <h2 className="text-[13px] font-[500]">Applicants List</h2>
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
