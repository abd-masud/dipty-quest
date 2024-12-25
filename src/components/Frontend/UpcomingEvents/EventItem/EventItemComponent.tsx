"use client";

import { useEffect, useState } from "react";
import { Footer } from "../../Footer/Footer";
import { Media } from "../../Home/Media";
import { Breadcrumbs } from "./Breadcrumbs";
import { Navigation } from "../../Navigation/Navigation";
import { FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

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

interface JwtPayload {
  name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface EventsItemProps {
  eventId: string;
}

export const EventItemComponent = ({ eventId }: EventsItemProps) => {
  const [eventData, setEventData] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<JwtPayload>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/authentication/login");
      return;
    }

    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      setFormData({
        name: decodedPayload?.name,
        last_name: decodedPayload?.last_name,
        email: decodedPayload?.email,
        phone: decodedPayload?.phone,
      });
    } catch (err) {
      console.error("Failed to decode JWT token:", err);
      router.push("/authentication/login");
    }
  }, [router]);

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

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill out all required fields.");
      return false;
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone || "")) {
      setError("Invalid phone number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = {
      event_id: eventId,
      event_name: eventData?.event || "",
      name: formData.name || "",
      last_name: formData.last_name || "",
      email: formData.email || "",
      phone: formData.phone || "",
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
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || "Failed to submit form");
      }

      setFormData({});
      router.push(`/upcoming-events/${eventId}`);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError((err as Error).message || "An unexpected error occurred.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
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
        <div className="flex justify-center items-center h-screen">
          <p className="text-center font-bold">Loading...</p>
        </div>
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
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <p className="font-bold text-red-500">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Retry
            </button>
          </div>
        </div>
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
        <div className="flex justify-center items-center h-screen">
          <p className="text-center font-bold">No event data available.</p>
        </div>
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
          <p>{formatDate(eventData.date)}</p>
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
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full bg-white hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  placeholder="Enter first name"
                  id="name"
                  disabled
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]">Last Name</label>
                <input
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full bg-white hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  placeholder="Enter last name"
                  id="last_name"
                  disabled
                  value={formData.last_name || ""}
                  onChange={handleInputChange}
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
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full bg-white hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  placeholder="Enter email address"
                  id="email"
                  type="email"
                  disabled
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="text-[14px] text-[#131226]" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  placeholder="Enter phone number"
                  className="border text-[14px] text-[#131226] py-3 px-[10px] w-full bg-white hover:border-[#FAB616] focus:outline-none focus:border-[#FAB616] rounded-md transition-all duration-300 mt-2"
                  type="text"
                  id="phone"
                  disabled
                  value={formData.phone || ""}
                  onChange={handleInputChange}
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
        </div>
      </div>
      <Footer />
    </main>
  );
};
