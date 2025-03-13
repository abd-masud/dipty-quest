import { Breadcrumb } from "./Breadcrumb";
import { AppliedGigsItems } from "./AppliedGigsItems";

export const GuestGigPanel = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <AppliedGigsItems />
    </main>
  );
};
