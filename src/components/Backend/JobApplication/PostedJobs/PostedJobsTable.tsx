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
import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

interface DataType {
  key: string;
  id: number;
  jobTitle: string;
  company: string;
  industry: string;
  department: string;
  position: string;
  gender?: string;
  jobDeadline?: string;
  division: string;
  district?: string;
  upazila?: string;
  fullAddress?: string;
  jobDescription?: string;
  jobRequirements?: string;
  minimumEducation?: string;
  preferredEducation?: string;
  salaryType?: string;
  currency?: string;
  salary?: string;
  totalExperience?: number;
  minimumExperience?: number;
  maximumExperience?: number;
  jobType?: string;
  jobLevel?: string;
  jobShift?: string;
  minimumAge?: number;
  maximumAge?: number;
  numberOfVacancy?: number;
  jobSkill?: string;
  skillExperience?: number;
  jobBenefits?: string[];
  customQuestion?: string;
}

interface JobsTableProps {
  jobs: DataType[];
  loading: boolean;
  fetchJobs: () => void;
}

export const PostedJobsTable: React.FC<JobsTableProps> = ({
  jobs,
  fetchJobs,
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

      fetchJobs();
    } catch {}
  };

  const showEditModal = (job: DataType) => {
    setCurrentEvent(job);
    form.setFieldsValue({
      jobTitle: job.jobTitle,
      company: job.company,
      industry: job.industry,
      department: job.department,
      position: job.position,
      gender: job.gender,
      division: job.division,
      district: job.district,
      upazila: job.upazila,
      fullAddress: job.fullAddress,
      jobDescription: job.jobDescription,
      jobRequirements: job.jobRequirements,
      minimumEducation: job.minimumEducation,
      preferredEducation: job.preferredEducation,
      salaryType: job.salaryType,
      currency: job.currency,
      salary: job.salary,
      totalExperience: job.totalExperience,
      minimumExperience: job.minimumExperience,
      maximumExperience: job.maximumExperience,
      jobType: job.jobType,
      jobLevel: job.jobLevel,
      jobShift: job.jobShift,
      minimumAge: job.minimumAge,
      maximumAge: job.maximumAge,
      numberOfVacancy: job.numberOfVacancy,
      jobSkill: job.jobSkill,
      skillExperience: job.skillExperience,
      jobBenefits: job.jobBenefits,
      customQuestion: job.customQuestion,
      jobDeadline: job.jobDeadline,
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
          title={`Delete ${record.jobTitle}?`}
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
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Job Post",
      dataIndex: "jobTitle",
    },
    {
      title: "Job Skills",
      dataIndex: "jobSkill",
    },
    {
      title: "Address",
      dataIndex: "fullAddress",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      render: (_text, record) => {
        if (record.salary == "Negotiable") {
          return "Negotiable";
        }
        const salaryType =
          record.salaryType?.length && record.salaryType.length > 2
            ? record.salaryType.slice(0, -2)
            : record.salaryType;

        return `${record.salary} ${record.currency}/${salaryType}`;
      },
    },
    {
      title: "Vacancies",
      dataIndex: "numberOfVacancy",
    },
    {
      title: "Deadline",
      dataIndex: "jobDeadline",
    },
    {
      title: "Applied",
      dataIndex: "applied",
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
        <h2 className="text-[13px] font-[500]">Jobs List</h2>
      </div>
      <Table
        scroll={{ x: 1800 }}
        columns={columns}
        dataSource={jobs}
        loading={loading}
        bordered
      />
    </main>
  );
};
