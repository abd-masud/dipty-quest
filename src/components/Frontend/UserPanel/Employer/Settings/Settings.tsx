import { Breadcrumb } from "./Breadcrumb";
import { SettingsItem } from "./SettingsItem";

export const SettingsCompound = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <SettingsItem />
    </main>
  );
};
