import Link from "next/link";
import { GoDotFill } from "react-icons/go";

export const CreateAccountInfo = () => {
  return (
    <main className="bg-login_bg bg-cover bg-center">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:py-28 py-10">
        <div className="border bg-[#F3F4F6] hover:border-[#FAB616] shadow-lg rounded-xl px-10 py-5 flex flex-col justify-between h-full transition duration-300">
          <h2 className="mb-2 text-[30px] font-semibold text-center border-b border-[#131226] border-dashed">
            Student
          </h2>
          <div className="h-full mt-2">
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Register in programs
            </p>
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Access to educational resources
            </p>
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Utilize access on educational resources
            </p>
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Career Progression
            </p>
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              test your skills
            </p>
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              certifications
            </p>
          </div>
          <div className="pt-4">
            <Link
              className="block mt-2 py-2 bg-[#FAB616] border-b-2 border-[#131226] rounded-full text-center text-[14px] font-semibold hover:bg-[#131226] hover:text-white hover:border-[#FAB616] transition duration-300"
              href={"/authentication/student-registration"}
            >
              Apply
            </Link>
          </div>
        </div>

        <div className="border hover:border-[#FAB616] bg-[#F3F4F6] shadow-lg rounded-xl px-10 py-5 flex flex-col justify-between h-full transition duration-300">
          <h2 className="mb-2 text-[30px] font-semibold text-center border-b border-[#131226] border-dashed">
            Employer
          </h2>
          <div className="h-full mt-2">
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Find out talents{" "}
            </p>
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Post vacancies{" "}
            </p>
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Give requirement
            </p>
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Hire people
            </p>
          </div>
          <div className="pt-4">
            <Link
              className="block mt-2 py-2 bg-[#FAB616] border-b-2 border-[#131226] rounded-full text-center text-[14px] font-semibold hover:bg-[#131226] hover:text-white hover:border-[#FAB616] transition duration-300"
              href={"/authentication/employer-registration"}
            >
              Apply
            </Link>
          </div>
        </div>

        <div className="border hover:border-[#FAB616] bg-[#F3F4F6] shadow-lg rounded-xl px-10 py-5 flex flex-col justify-between h-full transition duration-300">
          <h2 className="mb-2 text-[30px] font-semibold text-center border-b border-[#131226] border-dashed">
            Professional
          </h2>
          <div className="h-full mt-2">
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Look for better jobs
            </p>
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Switch job at ease
            </p>
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Profile showcasing
            </p>
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Work-Life integration
            </p>
          </div>
          <div className="pt-4">
            <Link
              className="block mt-2 py-2 bg-[#FAB616] border-b-2 border-[#131226] rounded-full text-center text-[14px] font-semibold hover:bg-[#131226] hover:text-white hover:border-[#FAB616] transition duration-300"
              href={"/authentication/professional-registration"}
            >
              Apply
            </Link>
          </div>
        </div>

        <div className="border hover:border-[#FAB616] bg-[#F3F4F6] shadow-lg rounded-xl px-10 py-5 flex flex-col justify-between h-full transition duration-300">
          <h2 className="mb-2 text-[30px] font-semibold text-center border-b border-[#131226] border-dashed">
            Entrepreneur
          </h2>
          <div className="h-full mt-2">
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Vision and Strategy
            </p>
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Legal and regulatory knowledge
            </p>
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Networking and relationships
            </p>
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Time management and productivity
            </p>
            <p className="flex">
              <span className="font-semibold">
                <GoDotFill className="mt-1 mr-2" />
              </span>{" "}
              Technology and tools
            </p>
          </div>
          <div className="pt-4">
            <Link
              className="block mt-2 py-2 bg-[#FAB616] border-b-2 border-[#131226] rounded-full text-center text-[14px] font-semibold hover:bg-[#131226] hover:text-white hover:border-[#FAB616] transition duration-300"
              href={"/authentication/entrepreneur-registration"}
            >
              Apply
            </Link>
          </div>
        </div>
        <p className="text-[14px] text-[#131226] font-[500] mt-2">
          Already have an account?{" "}
          <Link
            className="text-[#131226] hover:text-[#FAB616] transition duration-300 font-bold"
            href={"/authentication/login"}
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};
