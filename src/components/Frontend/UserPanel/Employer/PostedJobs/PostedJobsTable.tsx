"use client";

import { Select, Table, TableColumnsType } from "antd";
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

const { Option } = Select;

const handlePublicationChange = async (
  value: string,
  record: DataType,
  fetchJobs: () => void
) => {
  try {
    const response = await fetch("/api/job-app", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: record.id,
        publication: value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update publication status");
    }
    fetchJobs();
  } catch (error) {
    console.error("Error updating publication:", error);
  }
};

export const PostedJobsTable: React.FC<JobsTableProps> = ({
  jobs,
  loading,
  fetchJobs,
}) => {
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
      title: "Publication",
      dataIndex: "publication",
      render: (text: string, record: DataType) =>
        record.status === "Expired" ? null : (
          <Select
            defaultValue={text}
            onChange={(value) =>
              handlePublicationChange(value, record, fetchJobs)
            }
            style={{ width: 150 }}
          >
            <Option value="Published">Published</Option>
            <Option value="Unpublished">Unpublished</Option>
          </Select>
        ),
    },
    {
      title: "Action",
      dataIndex: "view",
      render: (_, record: DataType) => (
        <Link
          className="bg-blue-500 text-white hover:text-white px-5 py-2 rounded"
          href={`/user-panel/employer/view-applicants/${record.id}`}
        >
          Applicants ({record.applicants.length})
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
        scroll={{ x: 800 }}
        columns={columns}
        dataSource={jobs}
        loading={loading}
        bordered
      />
    </main>
  );
};
