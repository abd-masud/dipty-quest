import Image from "next/image";
import Event from "../../../../public/images/upcommin-vid.jpg";
import Link from "next/link";
import { FaArrowRight, FaRegClock, FaPlay } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

export const UpcomingEventsInfo = () => {
  const eventsData = [
    {
      id: 1,
      date: "09",
      monthYear: "Sep-24",
      time: "8:00 am to 5:00 pm",
      location: "University of Dhaka",
      eventName: "Mindfulness and Wellbeing Retreat",
      eventLink: "/join-event/",
    },
    {
      id: 2,
      date: "15",
      monthYear: "Oct-24",
      time: "9:00 am to 3:00 pm",
      location: "National Museum",
      eventName: "Art & Culture Festival",
      eventLink: "/join-event/",
    },
    {
      id: 3,
      date: "23",
      monthYear: "Nov-24",
      time: "10:00 am to 6:00 pm",
      location: "City Sports Center",
      eventName: "Health and Fitness Expo",
      eventLink: "/join-event/",
    },
    {
      id: 4,
      date: "09",
      monthYear: "Sep-24",
      time: "8:00 am to 5:00 pm",
      location: "University of Dhaka",
      eventName: "Mindfulness and Wellbeing Retreat",
      eventLink: "/join-event/",
    },
    {
      id: 5,
      date: "15",
      monthYear: "Oct-24",
      time: "9:00 am to 3:00 pm",
      location: "National Museum",
      eventName: "Art & Culture Festival",
      eventLink: "/join-event/",
    },
    {
      id: 6,
      date: "23",
      monthYear: "Nov-24",
      time: "10:00 am to 6:00 pm",
      location: "City Sports Center",
      eventName: "Health and Fitness Expo",
      eventLink: "/join-event/",
    },
  ];

  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 md:py-[50px] py-10">
        <div className="col-span-2 flex flex-col justify-between md:mb-0 mb-5">
          <div className="mb-10">
            <h2 className="md:text-[56px] text-[35px] text-[#222E48] font-semibold">
              Join Our Upcoming Events
            </h2>
            <p className="text-[#222E48] text-[18px] font-semibold text-justify">
              Join us for a variety of exciting events that cater to your
              interests and learning needs. Our events are designed to inspire
              and educate.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {eventsData.map((event) => (
              <div
                key={event.id}
                className="md:flex block justify-between items-center py-5 md:px-10 px-5 bg-[#F5F6F7] rounded-xl border hover:border-[#FAB616] shadow-lg transition duration-300"
              >
                <div>
                  <p className="text-[#3D3D3D] font-semibold md:block flex items-end">
                    <span className="text-[28px] text-[#0E0C25] block">
                      {event.date}
                    </span>
                    <span className="text-[28px] md:text-[16px] md:ml-0 ml-2">
                      {event.monthYear}
                    </span>
                  </p>
                </div>
                <div className="md:w-[70%] text-[#222E48] md:my-auto my-3 md:border-x-[1px] border-x-0 border-y-[1px] md:border-y-0 border-gray-400 border-dashed md:px-10 py-3">
                  <div className="md:flex block items-center md:mb-0 mb-3">
                    <div className="flex items-center mr-10">
                      <FaRegClock className="mr-3" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <IoLocationOutline className="mr-2 mt-1" />
                      {event.location}
                    </div>
                  </div>
                  <p className="text-[23px] font-semibold">{event.eventName}</p>
                </div>
                <div>
                  <Link
                    className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#FAB616] transition-colors duration-300 flex items-center justify-center group"
                    href={event.eventLink}
                  >
                    <span>Join Now</span>
                    <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
