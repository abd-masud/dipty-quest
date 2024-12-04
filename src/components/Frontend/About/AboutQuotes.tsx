import Image from "next/image";
import { PiQuotesFill } from "react-icons/pi";
import dummy from "../../../../public/images/dummy.jpg";

export const AboutQuotes = () => {
  return (
    <main className="bg-about_quotes_bg bg-cover bg-center px-4 py-20">
      <div className="max-w-screen-xl mx-auto lg:grid grid-cols-3 gap-6 bg-white py-16 lg:px-16 px-8">
        <div className="flex flex-col justify-center items-center mb-10">
          <Image
            className="rounded-full h-[225px] w-[225px] mb-5"
            src={dummy}
            height={225}
            width={255}
            alt={"Quotes"}
            priority
          />
          <h2 className="text-[30px] font-bold text-[#131226]">Fahima Dipty</h2>
          <p>Founder of DiptyQuest</p>
        </div>
        <div className="col-span-2 flex flex-col gap-5 text-[#131226]">
          <PiQuotesFill className="text-[40px]" />
          <p className="text-[18px]">
            We believe that people are so much more than their CV. People have
            stories, a past, desires, goals, dreams. When we truly embrace them,
            we can achieve so much more and make a far greater difference to
            them.
          </p>
          <p className="text-[18px]">
            What&apos;s more, we are convinced that everyone genuinely does have
            a talent or, to put it more strongly, everyone is a talent. We see
            it as our job to discover the talent in all our temporary agency
            workers.
          </p>
          <p className="text-[18px]">
            The third component of our dream is all about fun. Work ensures that
            you can get ahead in life. It offers you the chance to grow, the
            chance of satisfaction, the chance of inclusion. Job satisfaction is
            therefore something to which we attach particular importance.
          </p>
        </div>
      </div>
    </main>
  );
};
