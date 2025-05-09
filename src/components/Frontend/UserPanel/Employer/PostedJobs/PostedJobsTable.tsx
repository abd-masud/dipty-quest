"use client";

import { Badge, Select, Table, TableColumnsType, Tag } from "antd";
import Link from "next/link";
import {
  CheckCircleOutlined,
  EyeInvisibleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

type JobStatus = "Published" | "Unpublished" | "Expired";

interface DataType {
  key: string;
  id: number;
  jobTitle: string;
  jobDeadline?: string;
  newApplied: number;
  appliedCount: number;
  status: JobStatus;
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

const parseDate = (dateString: string) => {
  const parts = dateString.split(/[\s,]+/);
  const day = parseInt(parts[0]);
  const month = parts[1];
  const year = parseInt(parts[2]);
  const monthMap: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  return new Date(year, monthMap[month], day);
};

export const PostedJobsTable: React.FC<JobsTableProps> = ({
  jobs,
  loading,
  fetchJobs,
}) => {
  const dataSource = jobs.map((job) => ({ ...job, key: job.id.toString() }));
  const statusConfig: Record<
    JobStatus,
    { color: string; icon: React.ReactNode; label: string }
  > = {
    Published: {
      color: "green",
      icon: <CheckCircleOutlined />,
      label: "Published",
    },
    Unpublished: {
      color: "orange",
      icon: <EyeInvisibleOutlined />,
      label: "Unpublished",
    },
    Expired: {
      color: "red",
      icon: <ClockCircleOutlined />,
      label: "Expired",
    },
  };
  const columns: TableColumnsType<DataType> = [
    {
      title: "#",
      render: (_, __, index) => index + 1,
      width: 60,
      align: "center",
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
      sorter: (a, b) => {
        if (!a.jobDeadline || !b.jobDeadline) return 0;
        const dateA = parseDate(a.jobDeadline);
        const dateB = parseDate(b.jobDeadline);
        return dateA.getTime() - dateB.getTime();
      },
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: "descend",
    },
    {
      title: "New Applicants",
      dataIndex: "newApplied",
      render: (count: number) => (
        <Badge
          count={count}
          style={{ backgroundColor: count > 0 ? "#1890ff" : "#d9d9d9" }}
          className="ml-2"
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: JobStatus) => {
        const config = status ? statusConfig[status] : null;
        return config ? (
          <Tag color={config.color} icon={config.icon} className="capitalize">
            {config.label}
          </Tag>
        ) : (
          <Tag color="default">Unknown</Tag>
        );
      },
      filters: Object.entries(statusConfig).map(([value, config]) => ({
        text: config.label,
        value: value as JobStatus,
      })),
      onFilter: (value, record) => record.status == value,
    },
    {
      title: "Publication",
      dataIndex: "publication",
      render: (text: string, record: DataType) =>
        record.status == "Expired" ? null : (
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
      title: "Applicants",
      dataIndex: "view",
      render: (_, record: DataType) =>
        record.applicants.length == 0 ? (
          <span className="bg-gray-200 border px-5 py-1 rounded inline-block text-center">
            No Applicants
          </span>
        ) : (
          <Link
            className="bg-blue-500 text-white hover:text-white px-5 py-1 rounded inline-block text-center"
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
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        bordered
        scroll={{ x: "max-content" }}
        rowClassName={(record) =>
          record.status == "Expired" ? "bg-gray-50" : ""
        }
      />
    </main>
  );
};
