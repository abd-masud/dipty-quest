"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker, InputNumber, Collapse } from "antd";
import type { FormProps } from "antd";
// import moment from "moment";
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
import { Benefits } from "./Benefits";
// import { Editor } from "@tinymce/tinymce-react";

const { TextArea } = Input;

type FieldType = {
  jobTitle: string;
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
  jobBenefits?: string[];
};

type DivisionType = {
  id: string;
  name: string;
};

type DistrictType = {
  id: string;
  division_id: string;
  name: string;
};

type UpazilaType = {
  id: string;
  district_id: string;
  name: string;
};

export const NewJobPostForm: React.FC = () => {
  const [divisions, setDivisions] = useState<DivisionType[]>([]);
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [filteredDistricts, setFilteredDistricts] = useState<DistrictType[]>(
    []
  );
  const [upazilas, setUpazilas] = useState<UpazilaType[]>([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState<UpazilaType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const divisionsData = await import("./Divisions.json");
      const districtsData = await import("./Districts.json");
      const upazilasData = await import("./Upazilas.json");

      setDivisions(divisionsData.divisions);
      setDistricts(districtsData.districts);
      setUpazilas(upazilasData.upazilas);
    };

    fetchData();
  }, []);

  const handleDivisionChange = (value: string) => {
    const filtered = districts.filter(
      (district) => district.division_id === value
    );
    setFilteredDistricts(filtered);
    setFilteredUpazilas([]);
  };

  const handleDistrictChange = (value: string) => {
    const filtered = upazilas.filter(
      (upazila) => upazila.district_id === value
    );
    setFilteredUpazilas(filtered);
  };

  const handleSubmit: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const formattedData = {
        ...values,
      };

      console.log(formattedData);

      const response = await fetch("/api/job-app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
      } else {
      }
    } catch {}
  };

  return (
    <main className="">
      <Form
        className="flex flex-col gap-4"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <div className="bg-white rounded-md border p-5">
          <div className="border-b mb-2 pb-2">
            <h3 className="font-semibold text-[17px]">Basic Information</h3>
            <p className="text-[14px]">
              Great to meet you! First off, help us with the basics.
            </p>
          </div>
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
                showSearch
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
                showSearch
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
                showSearch
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
                showSearch
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
              name="division"
              label="Division"
              rules={[{ required: true, message: "Division is required" }]}
            >
              <Select
                className="w-full h-12"
                placeholder="Select Division"
                onChange={handleDivisionChange}
                showSearch
              >
                {divisions.map((division) => (
                  <Select.Option key={division.id} value={division.id}>
                    {division.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="district"
              label="District"
              rules={[{ required: true, message: "District is required" }]}
            >
              <Select
                className="w-full h-12"
                placeholder="Select District"
                onChange={handleDistrictChange}
                disabled={filteredDistricts.length === 0}
                showSearch
              >
                {filteredDistricts.map((district) => (
                  <Select.Option key={district.id} value={district.id}>
                    {district.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="upazila"
              label="Upazila"
              rules={[{ required: true, message: "Upazila is required" }]}
            >
              <Select
                className="w-full h-12"
                placeholder="Select Upazila"
                disabled={filteredUpazilas.length === 0}
                showSearch
              >
                {filteredUpazilas.map((upazila) => (
                  <Select.Option key={upazila.id} value={upazila.id}>
                    {upazila.name}
                  </Select.Option>
                ))}
              </Select>
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
              placeholder="Enter job description"
              className="w-full p-3"
            />
            {/* <Editor
              apiKey="qxxj6qj7j1ljd2wtb9j3z1btrbe95ugat4o314faaamcxn06"
              init={{
                height: 400,
                plugins: ["advlist", "autolink", "lists"],
                toolbar: `
      undo redo | fontselect fontsizeselect formatselect | bold italic underline | 
       bullist numlist | 
    `,
              }}
              ref={jobDescriptionEditorRef}
            /> */}
          </Form.Item>
          <Form.Item
            name="jobRequirements"
            label="Job Requirements"
            rules={[{ required: true, message: "Job requirement is required" }]}
          >
            <TextArea
              placeholder="Enter job requirement"
              className="w-full p-3"
            />
            {/* <Editor
              apiKey="qxxj6qj7j1ljd2wtb9j3z1btrbe95ugat4o314faaamcxn06"
              init={{
                height: 400,
                plugins: ["advlist", "autolink", "lists"],
                toolbar: `
      undo redo | fontselect fontsizeselect formatselect | bold italic underline | 
       bullist numlist | 
    `,
              }}
              ref={jobRequirementsEditorRef}
            /> */}
          </Form.Item>
        </div>

        <div className="bg-white rounded-md border p-5">
          <div className="border-b mb-2 pb-2">
            <h3 className="font-semibold text-[17px]">Academic Information</h3>
            <p>To get ideal candidates, enter their academic qualifications.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-2 gap-0">
            <Form.Item
              name="minimumEducation"
              label="Minimum Level of Education"
              rules={[{ required: true, message: "Minimum level is required" }]}
            >
              <Select
                className="w-full h-12"
                placeholder="Select a level of education"
                showSearch
                options={educations.map((education) => ({
                  label: education,
                  value: education,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="preferredEducation"
              label="Preferred Level of Education"
              rules={[
                { required: true, message: "Preferred level is required" },
              ]}
            >
              <Select
                className="w-full h-12"
                placeholder="Select a level of education"
                showSearch
                options={educations.map((education) => ({
                  label: education,
                  value: education,
                }))}
              />
            </Form.Item>
          </div>
        </div>

        <div className="bg-white rounded-md border p-5">
          <div className="border-b mb-2 pb-2">
            <h3 className="font-semibold text-[17px]">Salary Range</h3>
            <p>To get ideal candidates, enter their academic qualifications.</p>
          </div>
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
                  showSearch
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
                  showSearch
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
              rules={[
                { required: true, message: "Minimum salary is required" },
              ]}
            >
              <InputNumber
                min={0}
                className="w-full py-2"
                placeholder="Enter minimum salary"
              />
            </Form.Item>
            <Form.Item
              name="maximumSalary"
              label="Maximum Salary"
              rules={[
                { required: true, message: "Maximum salary is required" },
              ]}
            >
              <InputNumber
                min={0}
                className="w-full py-2"
                placeholder="Enter maximum salary"
              />
            </Form.Item>
          </div>
        </div>

        <div className="bg-white rounded-md border p-5">
          <div className="border-b mb-2 pb-2">
            <h3 className="font-semibold text-[17px]">Work Experience</h3>
            <p>Enter work experience to find the right candidate.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-2 gap-0">
            <Form.Item
              name="totalExperience"
              label="Total Years of Experience"
              rules={[
                { required: true, message: "Total experience is required" },
              ]}
            >
              <InputNumber
                min={0}
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
                min={0}
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
                min={0}
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
                showSearch
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
                showSearch
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
                showSearch
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
                min={0}
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
                min={0}
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
                min={0}
                className="w-full py-2"
                placeholder="Enter number of vacancy"
              />
            </Form.Item>
          </div>
        </div>

        <div className="bg-white rounded-md border p-5">
          <div className="border-b mb-2 pb-2">
            <h3 className="font-semibold text-[17px]">Skills</h3>
            <p>Choose skills to find the right candidate.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-2 gap-0">
            <Form.Item
              name="jobSkill"
              label="Job Skill"
              rules={[{ required: true, message: "Job skill is required" }]}
            >
              <Select
                className="w-full h-12"
                placeholder="Select job skill"
                showSearch
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
                min={0}
                className="w-full py-2"
                placeholder="Enter years of experience"
              />
            </Form.Item>
          </div>
        </div>

        <div className="bg-white rounded-md border p-5">
          <div className="border-b mb-2 pb-2">
            <h3 className="font-semibold text-[17px]">Job Benefits</h3>
            <p>Enter the job benefits your employee would like to receive</p>
          </div>
          <Collapse className="bg-white" items={Benefits} />
        </div>

        {/* <div className="bg-white rounded-md border p-5">
          <div className="border-b mb-2 pb-2">
            <h3 className="font-semibold text-[17px]">Custom Questions</h3>
            <p>
              You can ask any specific question to your candidate or add your
              own
            </p>
          </div>
        </div> */}

        <Form.Item>
          <button
            className="font-semibold bg-[#FAB616] rounded-md px-5 py-2 text-[#131226] hover:bg-[#131226] hover:text-white border-b-2 border-[#0F0D26] hover:border-[#FBB614] transition-colors duration-300 flex items-center justify-center group"
            type="submit"
          >
            Submit
          </button>
        </Form.Item>
      </Form>
    </main>
  );
};
