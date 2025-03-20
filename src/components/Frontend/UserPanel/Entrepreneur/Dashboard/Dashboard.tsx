import { Breadcrumb } from "./Breadcrumb";
import { DashboardItem } from "./DashboardItem";
import { SuggestedGigs } from "./SuggestedGigs";
import { SuggestedJobs } from "./SuggestedJobs";

export const EntrepreneurPanel = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <DashboardItem />
      <SuggestedJobs />
      <SuggestedGigs />
    </main>
  );
};
