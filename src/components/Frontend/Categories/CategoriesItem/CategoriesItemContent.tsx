import { CategoriesItemDownload } from "./CategoriesItemDownload";
import { CategoriesItemForm } from "./CategoriesItemForm";
import { CategoriesItemPitch } from "./CategoriesItemPitch";

export const CategoriesItemContent = () => {
  return (
    <main>
      <CategoriesItemPitch />
      <CategoriesItemDownload />
      <CategoriesItemForm />
    </main>
  );
};
