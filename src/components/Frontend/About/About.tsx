import { Footer } from "../Footer/Footer";
import { Media } from "../Home/Media";
import { Navigation } from "../Navigation/Navigation";
import { Breadcrumbs } from "./Breadcrumb";
import Image from "next/image";
import { PiQuotesFill } from "react-icons/pi";
import dummy from "../../../../public/images/dummy.webp";

export const AboutComponent = () => {
  return (
    <main className="bg-gray-50">
      <Media />
      <div className="sticky top-0 z-50 shadow-sm">
        <Navigation />
      </div>
      <Breadcrumbs />
      <section className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our activities
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              DiptyQuest is an organization which finds talent. This
              demonstrates that we serve an essential role in connecting
              companies and talent on the job sector. We act as a job coach for
              job seekers, assisting them in discovering their strengths. We are
              a genuine HR partner for businesses, not just helping them find
              the best candidates for open positions as well as offering
              guidance and assistance to help them keep that talent.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Why we do it
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              The goal of our team is that we recognize every talent and bring
              happiness into their respective lives. We desire to find every
              talent despite their form, shape, or tone, in the appropriate spot
              and maximize their employment pleasure. That is because people who
              are pleased in their work remain with the same employer longer,
              perform better, and contribute to the success of any business. A
              mutually beneficial situation!
            </p>
          </div>
        </div>
      </section>

      <section className="bg-about_quotes_bg bg-cover bg-center px-4 py-20">
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
                  As the founder of DiptyQuest, I believe people are so much
                  more than what&apos;s written on their CV. Every individual
                  carries a story, a journey shaped by their past, fueled by
                  their dreams, and driven by their goals. When we truly embrace
                  the essence of a person, we don&apos;t just achieve results—we
                  create meaningful impact in their lives.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  At DiptyQuest, we&apos;re convinced that everyone is more than
                  just skilled—they are a talent. It&apos;s our purpose to
                  uncover and nurture that talent in each of our team members,
                  especially our temporary workers, so they can unlock their
                  fullest potential.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  And finally, work should be more than just a means to an end.
                  For us, it&apos;s about joy, growth, and inclusion. Work
                  provides opportunities to move forward in life, to feel a
                  sense of accomplishment, and to belong. At DiptyQuest, we
                  prioritize creating an environment where job satisfaction and
                  personal fulfillment aren&apos;t just goals—they&apos;re the
                  foundation of everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How we implement it to completion
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our organization&apos;s culture is precisely reflected in our dream.
            However, we favor three principles in order to make the goal
            tangible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-indigo-600 mb-4">
              Stay Determined
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The primary element is &apos;stay determined&apos;. For our
              consumers, this is demonstrating real interest in their business
              and listening to their needs and expectations. For our prospects,
              this is going beyond a CV or cover letter, making an effort to get
              to know each individual, and concentrating on their skill rather
              than their experience, like a true job coach would. DiptyQuest
              treats the person like they&apos;re chatting with as if they were
              a close friend.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-indigo-600 mb-4">
              Adapt and Shape
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our secondary value is &apos;Give learners the ability to adapt to
              and shape the future&apos;. DiptyQuest gives you the freedom to
              experiment, be creative, take risks, and make mistakes. Being
              courageous has long been ingrained in our DNA. It has led us to
              where we are now. In our early years, we were labeled as an enfant
              terrible. We have emerged as industry leaders. We dare to forge
              new roads, as true pioneers.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-indigo-600 mb-4">
              Lifelong Learning
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The third core principle is &apos;Promote the pursuit of knowledge
              at all stages of life&apos;. We prioritize quality and
              professionalism over quantity, focusing on like-minded clientele
              ready to pay a little extra for all of our additional services. We
              are not about pigeonholing people. We are all about placing
              individuals in the right environment and matching their goals and
              expectations as humans.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
