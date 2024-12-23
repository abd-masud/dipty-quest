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
  event_id: number;
  event_name: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface EventsTableProps {
  events: DataType[];
  loading: boolean;
  fetchEvents: () => void;
}

export const EventsRegisteredTable: React.FC<EventsTableProps> = ({
  events,
  fetchEvents,
  loading,
}) => {
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/event-form/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete event");
      }

      fetchEvents();
    } catch {}
  };

  const getMenuItems = (record: DataType): MenuProps["items"] => [
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
      title: "Registered For",
      dataIndex: "event_name",
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
        <h2 className="text-[13px] font-[500]">Events Registered Info</h2>
      </div>
      <Table
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={events}
        loading={loading}
        bordered
      />
    </main>
  );
};
