"use client";

import { useEffect, useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { EntrepreneursTable } from "./EntrepreneursTable";

interface DataType {
  key: string;
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  institute: string;
  qualification: string;
  department: string;
  graduation: string;
  duration: number;
  company: string;
  designation: string;
  experience: number;
  business: string;
  plan: string;
  skills: string;
  switch: string;
  file: string;
  photo: string;
  primary: string;
  status: string;
}

export const EntrepreneursPage = () => {
  const [EntrepreneursData, setEntrepreneursData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEntrepreneurs = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/authentication/user/action", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Role: "entrepreneur",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch Entrepreneurs");
      }
      const entrepreneurs = await response.json();

      const mappedData: DataType[] = entrepreneurs.map((user: DataType) => ({
        key: user.id.toString(),
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        institute: user.institute,
        qualification: user.qualification,
        department: user.department,
        graduation: user.graduation,
        duration: user.duration,
        company: user.company,
        experience: user.experience,
        business: user.business,
        plan: user.plan,
        skills: user.skills,
        switch: user.switch,
        file: user.file,
        photo: user.photo,
        primary: user.primary,
        status: user.status,
      }));

      setEntrepreneursData(mappedData);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntrepreneurs();
  }, []);

  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb fetchEntrepreneurs={fetchEntrepreneurs} />
      <EntrepreneursTable
        students={EntrepreneursData}
        fetchEntrepreneurs={fetchEntrepreneurs}
        loading={loading}
      />
    </main>
  );
};
