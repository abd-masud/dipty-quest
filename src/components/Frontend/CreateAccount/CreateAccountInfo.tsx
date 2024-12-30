import Link from "next/link";

export const CreateAccountInfo = () => {
  return (
    <main className="bg-login_bg bg-cover bg-center">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 py-10">
        <div className="border bg-[#F5F6F7] hover:border-[#FAB616] shadow-lg rounded-xl px-10 py-5 flex flex-col justify-between h-full transition duration-300">
          <h2 className="mb-2 text-[30px] font-semibold text-center border-b border-[#131226] border-dashed">
            Student
          </h2>
          <div className="h-full mt-2">
            <p>
              <span className="font-semibold">1.</span> Register in programs
            </p>
            <p>
              <span className="font-semibold">2.</span> Access to educational
              resources
            </p>
            <p>
              <span className="font-semibold">3.</span> Utilize access on
              educational resources
            </p>
            <p>
              <span className="font-semibold">4.</span> Career Progression
            </p>
            <p>
              <span className="font-semibold">5.</span> test your skills
            </p>
            <p>
              <span className="font-semibold">6.</span> certifications
            </p>
          </div>
          <div className="pt-4">
            <Link
              className="block mt-2 py-2 bg-[#FAB616] border-b-2 border-[#131226] rounded-full text-center text-[14px] font-semibold hover:bg-[#131226] hover:text-white hover:border-[#FAB616] transition duration-300"
              href={"/authentication/student-registration"}
            >
              Register Now
            </Link>
          </div>
        </div>

        <div className="border hover:border-[#FAB616] bg-[#F5F6F7] shadow-lg rounded-xl px-10 py-5 flex flex-col justify-between h-full transition duration-300">
          <h2 className="mb-2 text-[30px] font-semibold text-center border-b border-[#131226] border-dashed">
            Employer
          </h2>
          <div className="h-full mt-2">
            <p>
              <span className="font-semibold">1.</span> Find out talents{" "}
            </p>
            <p>
              <span className="font-semibold">2.</span> Post vacancies{" "}
            </p>
            <p>
              <span className="font-semibold">3.</span> Give requirement
            </p>
            <p>
              <span className="font-semibold">4.</span> Hire people
            </p>
          </div>
          <div className="pt-4">
            <Link
              className="block mt-2 py-2 bg-[#FAB616] border-b-2 border-[#131226] rounded-full text-center text-[14px] font-semibold hover:bg-[#131226] hover:text-white hover:border-[#FAB616] transition duration-300"
              href={"/authentication/employer-registration"}
            >
              Register Now
            </Link>
          </div>
        </div>

        <div className="border hover:border-[#FAB616] bg-[#F5F6F7] shadow-lg rounded-xl px-10 py-5 flex flex-col justify-between h-full transition duration-300">
          <h2 className="mb-2 text-[30px] font-semibold text-center border-b border-[#131226] border-dashed">
            Professional
          </h2>
          <div className="h-full mt-2">
            <p>
              <span className="font-semibold">1.</span> Look for better jobs
            </p>
            <p>
              <span className="font-semibold">2.</span> Switch job at ease
            </p>
            <p>
              <span className="font-semibold">3.</span> Profile showcasing
            </p>
            <p>
              <span className="font-semibold">4.</span> Work-Life integration
            </p>
          </div>
          <div className="pt-4">
            <Link
              className="block mt-2 py-2 bg-[#FAB616] border-b-2 border-[#131226] rounded-full text-center text-[14px] font-semibold hover:bg-[#131226] hover:text-white hover:border-[#FAB616] transition duration-300"
              href={"/authentication/professional-registration"}
            >
              Register Now
            </Link>
          </div>
        </div>

        <div className="border hover:border-[#FAB616] bg-[#F5F6F7] shadow-lg rounded-xl px-10 py-5 flex flex-col justify-between h-full transition duration-300">
          <h2 className="mb-2 text-[30px] font-semibold text-center border-b border-[#131226] border-dashed">
            Entrepreneur
          </h2>
          <div className="h-full mt-2">
            <p>
              <span className="font-semibold">1.</span> Vision and Strategy
            </p>
            <p>
              <span className="font-semibold">2.</span> Legal and regulatory
              knowledge
            </p>
            <p>
              <span className="font-semibold">3.</span> Networking and
              relationships
            </p>
            <p>
              <span className="font-semibold">4.</span> Time management and
              productivity
            </p>
            <p>
              <span className="font-semibold">5.</span> Technology and tools
            </p>
          </div>
          <div className="pt-4">
            <Link
              className="block mt-2 py-2 bg-[#FAB616] border-b-2 border-[#131226] rounded-full text-center text-[14px] font-semibold hover:bg-[#131226] hover:text-white hover:border-[#FAB616] transition duration-300"
              href={"/authentication/entrepreneur-registration"}
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
