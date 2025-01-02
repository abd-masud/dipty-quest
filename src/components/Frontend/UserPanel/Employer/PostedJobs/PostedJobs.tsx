import { Breadcrumb } from "./Breadcrumb";
import { PostedJobsList } from "./PostedJobsList";

export const PostedJobsCompound = () => {
  return (
    <main className="bg-[#F2F4F7] min-h-[calc(100vh-70px)] p-5">
      <Breadcrumb />
      <PostedJobsList />
    </main>
  );
};
