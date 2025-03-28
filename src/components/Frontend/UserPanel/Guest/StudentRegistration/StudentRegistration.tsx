import { Breadcrumbs } from "./Breadcrumbs";
import { StudentRegistrationForm } from "./StudentRegistrationForm";

export const StudentRegistrationPage = () => {
  return (
    <main className="p-5 bg-[#F2F4F7]">
      <Breadcrumbs />
      <StudentRegistrationForm />
    </main>
  );
};
