import Link from "next/link";

export const CreateAccountInfo = () => {
  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 py-10">
        {/* Student Card */}
        <div className="border border-[#131226] rounded-xl px-10 py-5 flex flex-col justify-between h-full">
          <h2 className="mb-2 text-[30px] font-semibold text-center border-b border-[#131226] border-dashed">
            Student
          </h2>
          <div className="description">
            <p>1. Access to educational resources</p>
            <p>2. Enrollment in programs</p>
            <p>3. Certifications</p>
            <p>4. Student discounts</p>
            <p>5. Limited access</p>
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
        <div className="border border-[#131226] rounded-xl px-10 py-5 flex flex-col justify-between h-full">
          <h2 className="mb-2 text-[30px] font-semibold text-center border-b border-[#131226] border-dashed">
            Employer
          </h2>
          <div className="description">
            <p>1. Job posting</p>
            <p>2. Talent search</p>
            <p>3. Management of recruitment</p>
            <p>4. Employer branding</p>
            <p>5. Limited access to education resources</p>
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
        <div className="border border-[#131226] rounded-xl px-10 py-5 flex flex-col justify-between h-full">
          <h2 className="mb-2 text-[30px] font-semibold text-center border-b border-[#131226] border-dashed">
            Professional
          </h2>
          <div className="description">
            <p>1. Profile showcasing skills and experience</p>
            <p>2. Networking</p>
            <p>3. Job searching and applications</p>
            <p>4. Access to resources</p>
            <p>5. Professional development</p>
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
        <div className="border border-[#131226] rounded-xl px-10 py-5 flex flex-col justify-between h-full">
          <h2 className="mb-2 text-[30px] font-semibold text-center border-b border-[#131226] border-dashed">
            Entrepreneur
          </h2>
          <div className="description">
            <p>1. Business development tools</p>
            <p>2. Networking with investors and partners</p>
            <p>3. Resource sharing</p>
            <p>4. Branding and marketing</p>
            <p>5. Access to funding opportunities</p>
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
