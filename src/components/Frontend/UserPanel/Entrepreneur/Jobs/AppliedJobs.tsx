import { AppliedJobsItems } from "./AppliedJobsItems";
import { Breadcrumb } from "./Breadcrumb";

export const EntrepreneurJobPanel = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <AppliedJobsItems />
    </main>
  );
};
