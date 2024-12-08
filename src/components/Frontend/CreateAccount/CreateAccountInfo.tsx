import Link from "next/link";

export const CreateAccountInfo = () => {
  return (
    <main className="bg-login_bg bg-cover bg-center">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 py-10">
        {/* Student Card */}
        <div className="border-2 hover:border-[#FAB616] bg-[#F5F6F7] shadow-lg rounded-xl px-10 py-5 flex flex-col justify-between h-full transition duration-300">
          <h2 className="mb-2 text-[30px] font-semibold text-center border-b border-[#131226] border-dashed">
            Student
          </h2>
          <div className="description">
            <p>1.Register in programs</p>
            <p>2.Access to educational resources</p>
            <p>3.Utilize access on educational resources</p>
            <p>4.Career Progression</p>
            <p>5.test your skills</p>
            <p>6.certifications</p>
          </div>
          <div className="pt-4">
            <Link
              className="block mt-2 py-2 bg-[#FAB616] border-b-2 border-[#131226] rounded-full text-center hover:bg-[#131226] hover:text-white hover:border-[#FAB616] transition duration-300"
              href={"/authentication/student-registration"}
            >
              Register Now
            </Link>
          </div>
        </div>

        {/* Employer Card */}
        <div className="border-2 hover:border-[#FAB616] bg-[#F5F6F7] shadow-lg rounded-xl px-10 py-5 flex flex-col justify-between h-full transition duration-300">
          <h2 className="mb-2 text-[30px] font-semibold text-center border-b border-[#131226] border-dashed">
            Employer
          </h2>
          <div className="description">
            <p>1.Find out talents </p>
            <p>2.Post vacancies </p>
            <p>3.Give requirement</p>
            <p>4.Hire people</p>
          </div>
          <div className="pt-4">
            <Link
              className="block mt-2 py-2 bg-[#FAB616] border-b-2 border-[#131226] rounded-full text-center hover:bg-[#131226] hover:text-white hover:border-[#FAB616] transition duration-300"
              href={"/authentication/employer-registration"}
            >
              Register Now
            </Link>
          </div>
        </div>

        {/* Professional Card */}
        <div className="border-2 hover:border-[#FAB616] bg-[#F5F6F7] shadow-lg rounded-xl px-10 py-5 flex flex-col justify-between h-full transition duration-300">
          <h2 className="mb-2 text-[30px] font-semibold text-center border-b border-[#131226] border-dashed">
            Professional
          </h2>
          <div className="description">
            <p>1.Look for better jobs</p>
            <p>2.Switch job at ease</p>
            <p>3.Profile showcasing </p>
            <p>4.Work-Life integration</p>
          </div>
          <div className="pt-4">
            <Link
              className="block mt-2 py-2 bg-[#FAB616] border-b-2 border-[#131226] rounded-full text-center hover:bg-[#131226] hover:text-white hover:border-[#FAB616] transition duration-300"
              href={"/authentication/professional-registration"}
            >
              Register Now
            </Link>
          </div>
        </div>

        {/* Entrepreneur Card */}
        <div className="border-2 hover:border-[#FAB616] bg-[#F5F6F7] shadow-lg rounded-xl px-10 py-5 flex flex-col justify-between h-full transition duration-300">
          <h2 className="mb-2 text-[30px] font-semibold text-center border-b border-[#131226] border-dashed">
            Entrepreneur
          </h2>
          <div className="description">
            <p>1.Vision and Strategy</p>
            <p>2.Legal and regulatory knowledge</p>
            <p>3.Networking and relationships</p>
            <p>4.Time management and productivity</p>
            <p>5.Technology and tools</p>
          </div>
          <div className="pt-4">
            <Link
              className="block mt-2 py-2 bg-[#FAB616] border-b-2 border-[#131226] rounded-full text-center hover:bg-[#131226] hover:text-white hover:border-[#FAB616] transition duration-300"
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
