import { Breadcrumb } from "./Breadcrumb";
import { CandidatesList } from "./CandidatesList";

export const CandidatesCompound = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <CandidatesList />
    </main>
  );
};
