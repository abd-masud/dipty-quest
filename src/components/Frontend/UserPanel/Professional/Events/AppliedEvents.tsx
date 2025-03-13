import { Breadcrumb } from "./Breadcrumb";
import { AppliedEventsItems } from "./AppliedEventsItems";

export const ProfessionalEventPanel = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <AppliedEventsItems />
    </main>
  );
};
