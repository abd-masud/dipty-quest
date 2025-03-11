"use client";

import { Table, TableColumnsType } from "antd";
import Link from "next/link";

interface DataType {
  key: string;
  id: number;
  jobTitle: string;
  jobDeadline?: string;
  newApplied: number;
  appliedCount: number;
  status: string;
  publication: string;
  applicants: string[];
}

interface JobsTableProps {
  jobs: DataType[];
  loading: boolean;
  fetchJobs: () => void;
}

export const DashboardItem: React.FC<JobsTableProps> = ({ jobs, loading }) => {
  const columns: TableColumnsType<DataType> = [
    {
      title: "#",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      render: (_text: string, record: { id: number; jobTitle: string }) => {
        const base = "/job-details";
        const jobTitleSlug = record.jobTitle.toLowerCase().replace(/\s+/g, "-");
        const jobUrl = `${base}/${jobTitleSlug}-${record.id}`;

        return (
          <a
            target="blank"
            href={jobUrl}
            className="text-blue-600 hover:text-blue-600 font-semibold"
          >
            {record.jobTitle}
          </a>
        );
      },
    },
    {
      title: "Deadline",
      dataIndex: "jobDeadline",
    },
    {
      title: "New Applicants",
      dataIndex: "newApplied",
    },
    {
      title: "Total Applicants",
      dataIndex: "appliedCount",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "view",
      render: (_, record: DataType) =>
        record.applicants.length === 0 ? (
          <span className="bg-gray-200 border px-5 py-2 rounded inline-block text-center">
            No Applicants
          </span>
        ) : (
          <Link
            className="bg-blue-500 text-white hover:text-white px-5 py-2 rounded inline-block text-center"
            href={`/user-panel/employer/view-applicants/${record.id}`}
          >
            View Applicants ({record.applicants.length})
          </Link>
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
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={jobs}
        loading={loading}
        bordered
      />
    </main>
  );
};
