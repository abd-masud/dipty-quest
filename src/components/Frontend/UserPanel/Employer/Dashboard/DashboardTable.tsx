"use client";

import { Table, TableColumnsType, Tag, Badge, Card, Typography } from "antd";
import Link from "next/link";
import {
  CheckCircleOutlined,
  EyeInvisibleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

type JobStatus = "Published" | "Unpublished" | "Expired";

interface DataType {
  key: React.Key;
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

export const DashboardTable: React.FC<JobsTableProps> = ({ jobs, loading }) => {
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
          <Link
            href={jobUrl}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            {record.jobTitle}
          </Link>
        );
      },
    },
    {
      title: "Deadline",
      dataIndex: "jobDeadline",
      render: (date: string) => (
        <Text type={date && new Date(date) < new Date() ? "danger" : undefined}>
          {date || "N/A"}
        </Text>
      ),
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

  const dataSource = jobs
    .filter((job) => job.status === "Published")
    .map((job) => ({
      ...job,
      key: job.id,
    }));

  return (
    <Card
      title={
        <div className="flex items-center">
          <div className="h-2 w-2 bg-[#E3E4EA] rounded-full mr-2"></div>
          <span className="font-medium">Live Jobs</span>
        </div>
      }
      bordered={false}
      className="shadow-sm"
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        bordered
        scroll={{ x: "max-content" }}
      />
    </Card>
  );
};
