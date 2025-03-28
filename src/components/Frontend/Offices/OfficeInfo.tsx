import Image from "next/image";
import logo from "../../../../public/images/logo.webp";

export const OfficeInfo = () => {
  return (
    <main className="max-w-screen-xl mx-auto px-4 md:py-12 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-[#131226] p-4 md:p-8">
          <div className="flex items-center gap-5">
            <Image height={100} width={100} src={logo} alt={"Logo"} />
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-white">
                DiptyQuest DOHS Branch
              </h1>
              <p className="text-blue-100 mt-2">
                Your trusted service provider
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#FAB616] p-3 rounded-lg border-b-2 border-[#131226]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Office Address
                </h2>
                <p className="text-gray-600">
                  Chandra Mollika, Plot - 398, Road - 06, Avenue -01, Mirpur
                  DOHS, Level-1
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#FAB616] p-3 rounded-lg border-b-2 border-[#131226]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Email Address
                </h2>
                <p className="text-gray-600">info@diptyquest.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#FAB616] p-3 rounded-lg border-b-2 border-[#131226]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Contact Number
                </h2>
                <p className="text-gray-600">09647 123456</p>
              </div>
            </div>
          </div>

          <div className="">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Business Hours
            </h2>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="font-medium">10:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="font-medium">10:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Monday</span>
                <span className="font-medium">10:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Tuesday</span>
                <span className="font-medium">10:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Wednesday</span>
                <span className="font-medium">10:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Thursday</span>
                <span className="font-medium">10:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Friday</span>
                <span className="font-medium text-red-500">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-6 md:px-8 md:pb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Our Location
          </h2>
          <div className="border-2 border-gray-200 hover:border-[#FAB616] rounded-xl overflow-hidden transition duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d912.3782150915135!2d90.36604298361532!3d23.835915637228137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDUwJzA5LjUiTiA5MMKwMjEnNTguMCJF!5e0!3m2!1sen!2sbd!4v1734959888337!5m2!1sen!2sbd"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
};
