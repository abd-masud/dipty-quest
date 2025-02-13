import Image from "next/image";
import { PiQuotesFill } from "react-icons/pi";
import dummy from "../../../../public/images/dummy.webp";

export const AboutQuotes = () => {
  return (
    <main className="bg-about_quotes_bg bg-cover bg-center px-4 py-20">
      <div className="max-w-screen-xl mx-auto lg:grid grid-cols-3 gap-6 bg-white p-8 lg:p-16">
        <div className="flex flex-col justify-center items-center mb-10">
          <Image
            className="rounded-full h-[225px] w-[225px] mb-5"
            src={dummy}
            height={225}
            width={255}
            alt={"Quotes"}
            priority
          />
          <h2 className="text-[30px] font-bold text-[#131226]">Fahima Akter</h2>
          <p>Founder of DiptyQuest</p>
        </div>
        <div className="col-span-2 flex flex-col gap-5 text-[#131226]">
          <PiQuotesFill className="text-[40px]" />
          <p className="text-[18px] text-justify">
            As the founder of DiptyQuest, I believe people are so much more than
            what’s written on their CV. Every individual carries a story, a
            journey shaped by their past, fueled by their dreams, and driven by
            their goals. When we truly embrace the essence of a person, we don’t
            just achieve results—we create meaningful impact in their lives.
          </p>
          <p className="text-[18px] text-justify">
            At DiptyQuest, we’re convinced that everyone is more than just
            skilled—they are a talent. It’s our purpose to uncover and nurture
            that talent in each of our team members, especially our temporary
            workers, so they can unlock their fullest potential.
          </p>
          <p className="text-[18px] text-justify">
            And finally, work should be more than just a means to an end. For
            us, it’s about joy, growth, and inclusion. Work provides
            opportunities to move forward in life, to feel a sense of
            accomplishment, and to belong. At DiptyQuest, we prioritize creating
            an environment where job satisfaction and personal fulfillment
            aren’t just goals—they’re the foundation of everything we do.
          </p>
        </div>
      </div>
    </main>
  );
};
