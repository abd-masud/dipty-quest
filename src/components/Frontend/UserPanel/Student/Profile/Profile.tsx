import { Breadcrumb } from "./Breadcrumb";
import { ProfileCompound } from "./ProfileCompound";

export const StudentProfilePage = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <ProfileCompound />
    </main>
  );
};
