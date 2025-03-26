import { Breadcrumb } from "./Breadcrumb";
import { ChangePasswordForm } from "./ChangePasswordForm";

export const ChangePasswordPage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <ChangePasswordForm />
    </main>
  );
};
