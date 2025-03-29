import Image from "next/image";
import { PiQuotesFill } from "react-icons/pi";
import dummy from "../../../../public/images/dummy.webp";

export const AboutQuotes = () => {
  return (
    <main className="bg-about_quotes_bg bg-cover bg-center px-4 py-20">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="lg:flex">
          <div className="lg:w-1/3 p-12 flex flex-col items-center justify-center bg-gray-50">
            <div className="relative h-64 w-64 mb-6">
              <Image
                className="rounded-full object-cover"
                src={dummy}
                layout="fill"
                alt="Fahima Akter"
                priority
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Fahima Akter</h2>
            <p className="text-gray-600">Founder of DiptyQuest</p>
          </div>

          <div className="lg:w-2/3 p-12">
            <div className="space-y-6">
              <PiQuotesFill className="text-5xl text-indigo-500 opacity-30" />
              <p className="text-gray-700 text-lg leading-relaxed">
                As the founder of DiptyQuest, I believe people are so much more
                than what&apos;s written on their CV. Every individual carries a
                story, a journey shaped by their past, fueled by their dreams,
                and driven by their goals. When we truly embrace the essence of
                a person, we don&apos;t just achieve results—we create
                meaningful impact in their lives.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                At DiptyQuest, we&apos;re convinced that everyone is more than
                just skilled—they are a talent. It&apos;s our purpose to uncover
                and nurture that talent in each of our team members, especially
                our temporary workers, so they can unlock their fullest
                potential.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                And finally, work should be more than just a means to an end.
                For us, it&apos;s about joy, growth, and inclusion. Work
                provides opportunities to move forward in life, to feel a sense
                of accomplishment, and to belong. At DiptyQuest, we prioritize
                creating an environment where job satisfaction and personal
                fulfillment aren&apos;t just goals—they&apos;re the foundation
                of everything we do.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
