import { Breadcrumbs } from "./Breadcrumbs";
import { StudentRegistrationForm } from "./StudentRegistrationForm";

export const StudentRegistrationPage = () => {
  return (
    <main className="p-5">
      <Breadcrumbs />
      <StudentRegistrationForm />
    </main>
  );
};
