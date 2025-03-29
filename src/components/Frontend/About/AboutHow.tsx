export const AboutHow = () => {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          How we implement it to completion
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Our organization&apos;s culture is precisely reflected in our dream.
          However, we favor three principles in order to make the goal tangible.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">
            Stay Determined
          </h3>
          <p className="text-gray-600 leading-relaxed">
            The primary element is &apos;stay determined&apos;. For our
            consumers, this is demonstrating real interest in their business and
            listening to their needs and expectations. For our prospects, this
            is going beyond a CV or cover letter, making an effort to get to
            know each individual, and concentrating on their skill rather than
            their experience, like a true job coach would. DiptyQuest treats the
            person like they&apos;re chatting with as if they were a close
            friend.
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
            terrible. We have emerged as industry leaders. We dare to forge new
            roads, as true pioneers.
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
    </main>
  );
};
