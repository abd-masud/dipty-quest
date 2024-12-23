"use client";

import { useEffect, useState } from "react";
import { Footer } from "../../Footer/Footer";
import { Media } from "../../Home/Media";
import { Breadcrumbs } from "./Breadcrumbs";
import { Navigation } from "../../Navigation/Navigation";
import { FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

interface Event {
  id: number;
  event: string;
  description: string;
  date: string;
  duration: number;
  time_begin: string;
  time_end: string;
  location: string;
}

interface EventsItemProps {
  eventId: string;
}

export const EventItemComponent = ({ eventId }: EventsItemProps) => {
  const [eventData, setEventData] = useState<Event | null>(null);
  const [countryCode, setCountryCode] = useState("+880");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchEventData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/upcoming-events/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Event-Id": eventId,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch event data");
        }
        const data = await response.json();
        setEventData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const lastNameInput = document.getElementById(
      "lastName"
    ) as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const phoneInput = document.getElementById("phone") as HTMLInputElement;

    const data = {
      event_id: eventId,
      event_name: eventData?.event || "",
      name: nameInput.value,
      last_name: lastNameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
    };

    try {
      const response = await fetch("/api/event-form/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      nameInput.value = "";
      lastNameInput.value = "";
      emailInput.value = "";
      phoneInput.value = "";

      // setSuccessModalVisible(true);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const formatTime = (timeString: string) => {
    const [hour, minute] = timeString.split(":").map(Number);
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${
      isPM ? "pm" : "am"
    }`;
  };

  if (loading) {
    return (
      <main>
        <Media />
        <div className="sticky top-0 z-50">
          <Navigation />
        </div>
        <Breadcrumbs />
        <p className="text-center font-bold sm:py-80 py-40">Loading...</p>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <Media />
        <div className="sticky top-0 z-50">
          <Navigation />
        </div>
        <Breadcrumbs />
        <p className="text-center font-bold sm:py-80 py-40">Loading...</p>
        <Footer />
      </main>
    );
  }

  if (!eventData) {
    return (
      <main>
        <Media />
        <div className="sticky top-0 z-50">
          <Navigation />
        </div>
        <Breadcrumbs />
        <p className="text-center font-bold sm:py-80 py-40">Loading...</p>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <Breadcrumbs />
      <div className="max-w-screen-xl mx-auto px-4 mt-10">
        <h1 className="font-bold md:text-[40px] text-[30px] mb-4">
          {eventData.event}
        </h1>
        <p className="text-justify mb-6">{eventData.description}</p>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2">
          <p className="text-[#3D3D3D] font-semibold">
            {formatDate(eventData.date)}
          </p>
          <p>
            <span>Event Duration:</span> {eventData.duration}{" "}
            {eventData.duration > 1 ? "Days" : "Day"}
          </p>
          <div className="flex items-center mr-10">
            <FaRegClock className="mr-3" />
            {formatTime(eventData.time_begin)} to{" "}
            {formatTime(eventData.time_end)}
          </div>
          <div className="flex items-center">
            <IoLocationOutline className="mr-2 mt-1" />
            {eventData.location}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center md:py-20 py-10">
        <div className="w-[700px] sm:px-10 px-8 sm:py-14 py-12 mx-5 border border-[#131226] bg-gray-100 shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-0 md:gap-6">
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">First Name</label>
                <input
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  placeholder="Enter first name"
                  id="name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">Last Name</label>
                <input
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  placeholder="Enter last name"
                  id="lastName"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-0 md:gap-6">
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">
                  Email Address
                </label>
                <input
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  placeholder="Enter email address"
                  id="email"
                  type="email"
                  required
                />
              </div>
              <div className="flex">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="border text-[14px] text-[#131226] py-3 px-[10px] hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-l-md transition-all duration-300 mt-2 appearance-none"
                >
                  <option value="+880">+880</option>
                </select>

                <input
                  placeholder="Enter phone number"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-r-md transition-all duration-300 mt-2"
                  type="text"
                  id="number"
                  maxLength={11}
                  minLength={10}
                  required
                />
              </div>
            </div>

            <input
              className="text-[14px] font-[500] bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] w-full py-2 rounded text-[#131226] hover:text-white cursor-pointer transition-all duration-300"
              type="submit"
              value="Register"
            />

            {error && (
              <div className="mt-4 text-red-500 text-center text-sm">
                {error}
              </div>
            )}
          </form>
          {/* <Modal
            title="Success"
            open={successModalVisible}
            onOk={() => setSuccessModalVisible(false)}
            onCancel={() => setSuccessModalVisible(false)}
            okText="Close"
          >
            <p>Your registration was successful!</p>
          </Modal> */}
        </div>
      </div>
      <Footer />
    </main>
  );
};
