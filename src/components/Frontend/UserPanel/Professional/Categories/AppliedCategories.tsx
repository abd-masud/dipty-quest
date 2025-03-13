import { Breadcrumb } from "./Breadcrumb";
import { AppliedCategoriesItems } from "./AppliedCategoriesItems";

export const ProfessionalCategoryPanel = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <AppliedCategoriesItems />
    </main>
  );
};
