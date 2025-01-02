"use client";

import React from "react";
import { Form, Input, Select, DatePicker, InputNumber, Button } from "antd";
import type { FormProps } from "antd";
import moment from "moment";
import { industries } from "./Industries";
import { departments } from "./Departments";
import { positions } from "./Positions";
import { educations } from "./Educations";
import {
  currencies,
  jobTypes,
  salaryTypes,
  jobLevels,
  jobShifts,
} from "./Others";
import { jobSkills } from "./JobSkills";

const { TextArea } = Input;

type FieldType = {
  jobTitle: string;
  industry: string;
  department: string;
  position: string;
  gender?: string;
  jobDeadline?: string;
  district: string;
  upazila?: string;
  area?: string;
  fullAddress?: string;
  jobDescription?: string;
  jobRequirements?: string;
  minimumEducation?: string;
  preferredEducation?: string;
  salaryType?: string;
  currency?: string;
  minimumSalary?: number;
  maximumSalary?: number;
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
};

export const NewJobPostForm: React.FC = () => {
  const handleSubmit: FormProps<FieldType>["onFinish"] = (values) => {
    const formattedJobDeadline = moment(values.jobDeadline).format(
      "Do MMM, YYYY"
    );
    console.log("Form values:", {
      ...values,
      jobDeadline: formattedJobDeadline,
    });
  };

  return (
    <main className="">
      <Form layout="vertical" onFinish={handleSubmit}>
        <h3 className="font-semibold text-[17px]">Basic Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-2 gap-0">
          <Form.Item
            name="jobTitle"
            label="Job Title"
            rules={[{ required: true, message: "Job Title is required" }]}
          >
            <Input className="w-full py-3" placeholder="Enter job title" />
          </Form.Item>
          <Form.Item
            name="industry"
            label="Industry"
            rules={[{ required: true, message: "Industry is required" }]}
          >
            <Select
              className="w-full h-12"
              placeholder="Select an industry"
              options={industries.map((industry) => ({
                label: industry,
                value: industry,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: "Department is required" }]}
          >
            <Select
              className="w-full h-12"
              placeholder="Select a department"
              options={departments.map((department) => ({
                label: department,
                value: department,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: "Position is required" }]}
          >
            <Select
              className="w-full h-12"
              placeholder="Select a position"
              options={positions.map((position) => ({
                label: position,
                value: position,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Gender is required" }]}
          >
            <Select
              className="w-full h-12"
              placeholder="Select gender"
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="jobDeadline"
            label="Job Deadline"
            rules={[{ required: true, message: "Job deadline is required" }]}
          >
            <DatePicker format={"Do MMM, YYYY"} className="w-full py-3" />
          </Form.Item>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 sm:gap-2 gap-0">
          <Form.Item
            name="district"
            label="District"
            rules={[{ required: true, message: "District is required" }]}
          >
            <Input className="w-full py-3" placeholder="Enter district" />
          </Form.Item>
          <Form.Item
            name="upazila"
            label="Upazila"
            rules={[{ required: true, message: "Upazila is required" }]}
          >
            <Input className="w-full py-3" placeholder="Enter upazila" />
          </Form.Item>
          <Form.Item
            name="area"
            label="Area"
            rules={[{ required: true, message: "Area is required" }]}
          >
            <Input className="w-full py-3" placeholder="Enter area" />
          </Form.Item>
        </div>
        <Form.Item
          name="fullAddress"
          label="Full Address"
          rules={[{ required: true, message: "Full address is required" }]}
        >
          <Input className="w-full py-3" placeholder="Enter full address" />
        </Form.Item>
        <Form.Item
          name="jobDescription"
          label="Job Description"
          rules={[{ required: true, message: "Job description is required" }]}
        >
          <TextArea
            className="w-full py-2"
            placeholder="Enter job description"
            rows={4}
            style={{ resize: "none" }}
          />
        </Form.Item>
        <Form.Item
          name="jobRequirements"
          label="Job Requirements"
          rules={[{ required: true, message: "Job requirement is required" }]}
        >
          <TextArea
            className="w-full py-2"
            placeholder="Enter job requirements"
            rows={4}
            style={{ resize: "none" }}
          />
        </Form.Item>

        <hr className="bg-[#E5E7EB] mb-5" />
        <h3 className="font-semibold text-[17px]">Academic Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-2 gap-0">
          <Form.Item
            name="minimumEducation"
            label="Minimum Level of Education"
            rules={[{ required: true, message: "Minimum level is required" }]}
          >
            <Select
              className="w-full h-12"
              placeholder="Select a level of education"
              options={educations.map((education) => ({
                label: education,
                value: education,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="preferredEducation"
            label="Preferred Level of Education"
            rules={[{ required: true, message: "Preferred level is required" }]}
          >
            <Select
              className="w-full h-12"
              placeholder="Select a level of education"
              options={educations.map((education) => ({
                label: education,
                value: education,
              }))}
            />
          </Form.Item>
        </div>
        <hr className="bg-[#E5E7EB] mb-5" />
        <h3 className="font-semibold text-[17px]">Salary Range</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-2 gap-0">
          <div className="grid grid-cols-4 gap-2">
            <Form.Item
              className="col-span-3"
              name="salaryType"
              label="Salary Type"
              rules={[{ required: true, message: "Salary type is required" }]}
            >
              <Select
                className="w-full h-12"
                placeholder="Select salary type"
                options={salaryTypes.map((salaryType) => ({
                  label: salaryType,
                  value: salaryType,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="currency"
              label="Currency"
              rules={[{ required: true, message: "Currency is required" }]}
            >
              <Select
                className="w-full h-12"
                placeholder="Select currency"
                options={currencies.map((currency) => ({
                  label: currency,
                  value: currency,
                }))}
              />
            </Form.Item>
          </div>
          <Form.Item
            name="minimumSalary"
            label="Minimum Salary"
            rules={[{ required: true, message: "Minimum salary is required" }]}
          >
            <InputNumber
              className="w-full py-2"
              placeholder="Enter minimum salary"
            />
          </Form.Item>
          <Form.Item
            name="maximumSalary"
            label="Maximum Salary"
            rules={[{ required: true, message: "Maximum salary is required" }]}
          >
            <InputNumber
              className="w-full py-2"
              placeholder="Enter maximum salary"
            />
          </Form.Item>
        </div>

        <hr className="bg-[#E5E7EB] mb-5" />
        <h3 className="font-semibold text-[17px]">Work Experience</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-2 gap-0">
          <Form.Item
            name="totalExperience"
            label="Total Years of Experience"
            rules={[
              { required: true, message: "Total experience is required" },
            ]}
          >
            <InputNumber
              className="w-full py-2"
              placeholder="Enter total years of experience"
            />
          </Form.Item>
          <Form.Item
            name="minimumExperience"
            label="Minimum Experience"
            rules={[
              { required: true, message: "Minimum experience is required" },
            ]}
          >
            <InputNumber
              className="w-full py-2"
              placeholder="Enter minimum experience"
            />
          </Form.Item>
          <Form.Item
            name="maximumExperience"
            label="Maximum Experience"
            rules={[
              { required: true, message: "Maximum experience is required" },
            ]}
          >
            <InputNumber
              className="w-full py-2"
              placeholder="Enter maximum experience"
            />
          </Form.Item>
          <Form.Item
            name="jobType"
            label="Job Type"
            rules={[{ required: true, message: "Job type is required" }]}
          >
            <Select
              className="w-full h-12"
              placeholder="Select job type"
              options={jobTypes.map((jobType) => ({
                label: jobType,
                value: jobType,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="jobLevel"
            label="Job Level"
            rules={[{ required: true, message: "Job level is required" }]}
          >
            <Select
              className="w-full h-12"
              placeholder="Select job level"
              options={jobLevels.map((jobLevel) => ({
                label: jobLevel,
                value: jobLevel,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="jobShift"
            label="Job Shift"
            rules={[{ required: true, message: "Job shift is required" }]}
          >
            <Select
              className="w-full h-12"
              placeholder="Select job shift"
              options={jobShifts.map((jobShift) => ({
                label: jobShift,
                value: jobShift,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="minimumAge"
            label="Minimum Age"
            rules={[{ required: true, message: "Minimum age is required" }]}
          >
            <InputNumber
              className="w-full py-2"
              placeholder="Enter minimum age"
            />
          </Form.Item>
          <Form.Item
            name="maximumAge"
            label="Maximum Age"
            rules={[{ required: true, message: "Maximum age is required" }]}
          >
            <InputNumber
              className="w-full py-2"
              placeholder="Enter maximum age"
            />
          </Form.Item>
          <Form.Item
            name="numberOfVacancy"
            label="Number of Vacancy"
            rules={[
              { required: true, message: "Number of vacancy is required" },
            ]}
          >
            <InputNumber
              className="w-full py-2"
              placeholder="Enter number of vacancy"
            />
          </Form.Item>
        </div>

        <hr className="bg-[#E5E7EB] mb-5" />
        <h3 className="font-semibold text-[17px]">Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-2 gap-0">
          <Form.Item
            name="jobSkill"
            label="Job Skill"
            rules={[{ required: true, message: "Job skill is required" }]}
          >
            <Select
              className="w-full h-12"
              placeholder="Select job skill"
              options={jobSkills.map((jobSkill) => ({
                label: jobSkill,
                value: jobSkill,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="skillExperience"
            label="Years of Experience"
            rules={[
              { required: true, message: "Years experience is required" },
            ]}
          >
            <InputNumber
              className="w-full py-1"
              placeholder="Enter years of experience"
            />
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};
