export const OfficeInfo = () => {
  return (
    <main className="max-w-screen-xl mx-auto px-4 md:py-10 py-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[#131226] mb-2">
          DiptyQuest DOHS Branch
        </h1>
        <p>
          <span className="font-bold">Office Address:</span> Chandra Mollika,
          Plot - 398, Road - 06, Avenue -01, Mirpur DOHS, Level-1
        </p>
        <p>
          <span className="font-bold">Email Address:</span>
          <span className="text-[#131226]"> info@diptyquest.com</span>
        </p>
        <p>
          <span className="font-bold">Contact Number:</span>
          <span className="text-[#131226]"> 09647123456</span>
        </p>
      </div>
      <div className="border hover:border-[#FAB616] transition duration-300 mt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d912.3782150915135!2d90.36604298361532!3d23.835915637228137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDUwJzA5LjUiTiA5MMKwMjEnNTguMCJF!5e0!3m2!1sen!2sbd!4v1734959888337!5m2!1sen!2sbd"
          width="100%"
          height="600"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </main>
  );
};
