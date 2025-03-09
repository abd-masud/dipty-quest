"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Collapse,
  Modal,
  Checkbox,
} from "antd";
import type { FormProps } from "antd";
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
import Image from "next/image";
import Success from "../../../../../public/images/success.webp";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";

const { TextArea } = Input;

type FieldType = {
  userId: number;
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
  minSalary?: number;
  maxSalary?: number;
  negotiable?: boolean;
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

interface JwtPayload {
  id: number;
  company: string;
  companyLogo: string;
}

export const NewJobPostForm: React.FC = () => {
  const [form] = Form.useForm<FieldType>();
  const [divisions, setDivisions] = useState<DivisionType[]>([]);
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [filteredDistricts, setFilteredDistricts] = useState<DistrictType[]>(
    []
  );
  const negotiable = Form.useWatch("negotiable", form);
  const [upazilas, setUpazilas] = useState<UpazilaType[]>([]);
  const [
    ,
    // filteredUpazilas
    setFilteredUpazilas,
  ] = useState<UpazilaType[]>([]);
  const [formData, setFormData] = useState<Partial<JwtPayload>>({});
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const router = useRouter();
  const jobDescriptionEditorRef = useRef<any>(null);
  const jobRequirementsEditorRef = useRef<any>(null);
  const [content, setContent] = useState("");
  const handleEditorChange = (newContent: React.SetStateAction<string>) => {
    setContent(newContent);
  };

  useEffect(() => {
    const token = localStorage.getItem("DQ_ADMIN_JWT_TOKEN");
    if (!token) {
      return;
    }

    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      setFormData({
        id: decodedPayload?.id,
        company: decodedPayload?.company,
        companyLogo: decodedPayload?.companyLogo,
      });
    } catch {}
  }, []);

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
    const selectedDivision = divisions.find(
      (division) => division.name === value
    );
    const filtered = districts.filter(
      (district) => district.division_id === selectedDivision?.id
    );
    setFilteredDistricts(filtered);
    setFilteredUpazilas([]);
  };

  const handleDistrictChange = (value: string) => {
    const selectedDistrict = districts.find(
      (district) => district.name === value
    );
    const filtered = upazilas.filter(
      (upazila) => upazila.district_id === selectedDistrict?.id
    );
    setFilteredUpazilas(filtered);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
    router.push("/dashboard/jobs/posted-jobs");
  };

  const handleSubmit: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      let salary = "Negotiable";
      if (!values.negotiable) {
        salary = values.maxSalary
          ? `${values.minSalary} - ${values.maxSalary}`
          : values.minSalary?.toString() || "";
      }

      const jobDescription =
        jobDescriptionEditorRef.current?.getContent() || "";
      const jobRequirements =
        jobRequirementsEditorRef.current?.getContent() || "";

      const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("en-GB", { month: "short" });
        const year = date.getFullYear();
        const getOrdinalSuffix = (day: number) => {
          if (day > 3 && day < 21) return "th";
          switch (day % 10) {
            case 1:
              return "st";
            case 2:
              return "nd";
            case 3:
              return "rd";
            default:
              return "th";
          }
        };

        return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
      };

      const formattedData = {
        ...values,
        employerId: formData?.id,
        company: formData?.company,
        companyLogo: formData?.companyLogo,
        salary,
        jobSkill: Array.isArray(values.jobSkill)
          ? values.jobSkill.join(", ")
          : values.jobSkill || "",
        jobDeadline: values.jobDeadline ? formatDate(values.jobDeadline) : "",
        jobDescription,
        jobRequirements,
      };
      const response = await fetch("/api/job-app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        setIsSuccessModalVisible(true);
        form.resetFields();
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
        form={form}
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
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                  { label: "Male & Female", value: "Male & Female" },
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
                  <Select.Option key={division.id} value={division.name}>
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
                  <Select.Option key={district.id} value={district.name}>
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
              <Input className="w-full py-3" placeholder="Enter Upazila" />
              {/* <Select
                className="w-full h-12"
                placeholder="Select Upazila"
                disabled={filteredUpazilas.length === 0}
                showSearch
              >
                {filteredUpazilas.map((upazila) => (
                  <Select.Option key={upazila.id} value={upazila.name}>
                    {upazila.name}
                  </Select.Option>
                ))}
              </Select> */}
            </Form.Item>
          </div>
          <Form.Item
            name="fullAddress"
            label="Full Address"
            rules={[{ required: true, message: "Full address is required" }]}
          >
            <Input
              max={255}
              className="w-full py-3"
              placeholder="Enter full address"
            />
          </Form.Item>
          <Form.Item
            name="jobDescription"
            label="Job Description"
            rules={[{ required: true, message: "Job description is required" }]}
          >
            <Editor
              value={content}
              onEditorChange={handleEditorChange} // Handle content change
              tinymceScriptSrc="https://unpkg.com/tinymce@5.3.0/tinymce.min.js"
              init={{
                height: 400,
                menubar: false,
                plugins: ["advlist", "autolink", "lists"],
                toolbar: "undo redo | bold italic underline | bullist numlist",
                setup: (editor) => {
                  editor.on("keydown", (event) => {
                    if (event.key === "Backspace" || event.key === "Delete") {
                    }
                  });
                },
              }}
              onInit={(_evt, editor) => {
                jobDescriptionEditorRef.current = editor;
              }}
            />
          </Form.Item>
          <Form.Item
            className="rounded overflow-hidden"
            name="jobRequirements"
            label="Job Requirements"
            rules={[{ required: true, message: "Job requirement is required" }]}
          >
            <Editor
              value={content}
              onEditorChange={handleEditorChange} // Handle content change
              tinymceScriptSrc="https://unpkg.com/tinymce@5.3.0/tinymce.min.js"
              init={{
                height: 400,
                menubar: false,
                plugins: ["advlist", "autolink", "lists"],
                toolbar: "undo redo | bold italic underline | bullist numlist",
                setup: (editor) => {
                  editor.on("keydown", (event) => {
                    if (event.key === "Backspace" || event.key === "Delete") {
                    }
                  });
                },
              }}
              onInit={(_evt, editor) =>
                (jobRequirementsEditorRef.current = editor)
              }
            />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-2 gap-0">
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
              className="w-full"
              name="minSalary"
              label="Minimum Salary"
              rules={[
                {
                  required: !negotiable,
                  message: "Minimum salary is required",
                },
              ]}
            >
              <InputNumber
                min={0}
                className="w-full py-2"
                placeholder="Enter minimum salary"
                disabled={negotiable}
              />
            </Form.Item>
            <Form.Item
              className="w-full"
              name="maxSalary"
              label="Maximum Salary"
            >
              <InputNumber
                min={0}
                className="w-full py-2"
                placeholder="Enter maximum salary"
                disabled={negotiable}
              />
            </Form.Item>
            <Form.Item
              label="Or Choose"
              name="negotiable"
              valuePropName="checked"
            >
              <Checkbox className="mt-2">Negotiable</Checkbox>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-2 gap-0">
            <Form.Item
              name="jobSkill"
              label="Job Skill"
              rules={[{ required: true, message: "Job skill is required" }]}
              className="col-span-2"
            >
              <Select
                maxCount={10}
                mode="multiple"
                className="w-full overflow-hidden text-[12px]"
                placeholder="Select job skill"
                showSearch
                style={{ height: "48px" }}
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

        <div className="bg-white rounded-md border p-5">
          <div className="border-b mb-2 pb-2">
            <h3 className="font-semibold text-[17px]">Custom Questions</h3>
            <p>
              You can ask any specific question to your candidate or add your
              own
            </p>
          </div>
          <Form.Item name="customQuestion" label="Job Requirements">
            <TextArea
              maxLength={2000}
              placeholder="Enter custom question"
              className="w-full p-3"
            />
          </Form.Item>
        </div>

        <Form.Item>
          <button
            className="font-semibold bg-[#FAB616] rounded-md px-5 py-2 text-[#131226] hover:bg-[#131226] hover:text-white border-b-2 border-[#0F0D26] hover:border-[#FBB614] transition-colors duration-300 flex items-center justify-center group"
            type="submit"
          >
            Submit
          </button>
        </Form.Item>
      </Form>
      <Modal
        open={isSuccessModalVisible}
        onCancel={handleSuccessModalClose}
        title="Success!"
        centered
        okText="Yes"
        cancelText="Okay"
        onOk={handleSuccessModalClose}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        cancelButtonProps={{
          style: {
            borderBottom: "2px solid #FAB616",
            backgroundColor: "#131226",
            color: "white",
            transition: "all 0.3s ease",
          },
          onMouseOver: (e: React.MouseEvent) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.backgroundColor = "#131226";
            target.style.color = "white";
            target.style.borderBottomColor = "#FAB616";
          },
          onMouseOut: (e: React.MouseEvent) => {
            const target = e.currentTarget as HTMLButtonElement;
            target.style.backgroundColor = "#FAB616";
            target.style.color = "#131226";
            target.style.borderBottomColor = "#131226";
          },
        }}
      >
        <div className="flex justify-center items-center text-center">
          <Image src={Success} height={120} width={120} alt={"Success"} />
        </div>
        <p className="text-center">Job Posted Successfully!</p>
      </Modal>
    </main>
  );
};
