import { Breadcrumb } from "./Breadcrumb";
import { NewJobPostForm } from "./NewJobPostForm";

export const NewJobPostCompound = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <NewJobPostForm />
    </main>
  );
};
