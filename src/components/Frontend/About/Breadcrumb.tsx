import { FaAngleRight } from "react-icons/fa";

export const Breadcrumbs = () => {
  return (
    <main className="bg-breadcrumbs_bg bg-cover bg-center sm:py-0 py-10">
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <p className="flex items-center font-semibold">
          DiptyQuest <FaAngleRight className="mx-5" /> User Login
        </p>
        <h2 className="text-[48px] font-semibold">User Login</h2>
      </div>
    </main>
  );
};
