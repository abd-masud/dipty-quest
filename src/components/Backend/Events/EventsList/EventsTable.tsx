"use client";

import {
  Table,
  TableColumnsType,
  Button,
  Dropdown,
  MenuProps,
  Popconfirm,
  Form,
  Modal,
  Input,
  DatePicker,
  TimePicker,
} from "antd";
import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import dayjs from "dayjs";

interface DataType {
  key: string;
  id: number;
  event: string;
  date: string;
  time_begin: string;
  time_end: string;
  location: string;
  registered: number;
}

interface EventsTableProps {
  events: DataType[];
  loading: boolean;
  fetchEvents: () => void;
}

export const EventsTable: React.FC<EventsTableProps> = ({
  events,
  fetchEvents,
  loading,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      fetchEvents();
    } catch {}
  };

  const showEditModal = (event: DataType) => {
    setCurrentEvent(event);
    form.setFieldsValue({
      event: event.event,
      date: dayjs(event.date),
      time_begin: dayjs(event.time_begin, "hh:mm a"),
      time_end: dayjs(event.time_end, "hh:mm a"),
      location: event.location,
    });
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      const formattedValues = {
        ...values,
        id: currentEvent?.id,
        date: values.date.format("YYYY-MM-DD"),
        time_begin: values.time_begin.format("HH:mm"),
        time_end: values.time_end.format("HH:mm"),
      };

      const response = await fetch(`/api/events/${currentEvent?.id}`, {
        method: "PUT",
        body: JSON.stringify(formattedValues),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }
      setIsModalVisible(false);
      fetchEvents();
    } catch {}
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
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
          title={`Delete ${record.event}?`}
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
      title: "Event",
      dataIndex: "event",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time (Begin)",
      dataIndex: "time_begin",
    },
    {
      title: "Time (End)",
      dataIndex: "time_end",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Registered",
      dataIndex: "registered",
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
        <h2 className="text-[13px] font-[500]">Event Info</h2>
      </div>
      <Table
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={events}
        loading={loading}
        bordered
      />
      <Modal
        title="Edit Event"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Event"
            name="event"
            rules={[
              { required: true, message: "Please input the event name!" },
            ]}
          >
            <Input className="py-2" />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[
              { required: true, message: "Please select the event date!" },
            ]}
          >
            <DatePicker className="py-2" format="DD MMM YYYY" />
          </Form.Item>

          <Form.Item
            label="Time (Begin)"
            name="time_begin"
            rules={[
              { required: true, message: "Please select the start time!" },
            ]}
          >
            <TimePicker className="py-2" format="hh:mm a" />
          </Form.Item>

          <Form.Item
            label="Time (End)"
            name="time_end"
            rules={[{ required: true, message: "Please select the end time!" }]}
          >
            <TimePicker className="py-2" format="hh:mm a" />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[
              { required: true, message: "Please input the event location!" },
            ]}
          >
            <Input className="py-2" />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};
