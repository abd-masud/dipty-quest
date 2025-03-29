"use client";

import { useEffect, useState } from "react";
import { Footer } from "../../Footer/Footer";
import { Media } from "../../Home/Media";
import { Breadcrumbs } from "./Breadcrumbs";
import { Navigation } from "../../Navigation/Navigation";
import { FaCalendarAlt, FaCalendarDay, FaRegClock } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import Warning from "../../../../../public/images/warning.webp";
import Success from "../../../../../public/images/success.webp";
import Image from "next/image";
import Loader from "@/components/Loader";

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
  id: number;
  name: string;
}

interface EventsItemProps {
  eventId: string;
}

export const EventItemComponent = ({ eventId }: EventsItemProps) => {
  const [eventData, setEventData] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<JwtPayload>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isEmailRegisteredModalVisible, setIsEmailRegisteredModalVisible] =
    useState(false);
  const [pendingSubmit, setPendingSubmit] = useState<(() => void) | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        setFormData({
          id: decodedPayload?.id,
          name: decodedPayload?.name,
        });
      } catch {}
    }
  }, []);

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

    setPendingSubmit(() => submitForm);
    setIsWarningModalVisible(true);
  };

  const submitForm = async () => {
    const data = {
      user_id: formData.id,
      event_id: eventId,
    };

    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (!token) {
      router.push("/authentication/login");
    } else {
      try {
        const response = await fetch("/api/event-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.status == 409) {
          setIsEmailRegisteredModalVisible(true);
        } else if (!response.ok) {
          throw new Error("Failed to submit form");
        } else {
          setIsSuccessModalVisible(true);
        }
      } catch {
        setError("Failed to submit form.");
        setIsErrorModalVisible(true);
      } finally {
        setIsWarningModalVisible(false);
      }
    }
  };

  const handleWarningModalCancel = () => {
    setIsWarningModalVisible(false);
    setPendingSubmit(null);
  };

  const handleWarningModalConfirm = () => {
    if (pendingSubmit) {
      pendingSubmit();
    }
    setIsWarningModalVisible(false);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
    router.push("/upcoming-events");
  };

  const handleErrorModalClose = () => {
    setIsErrorModalVisible(false);
  };

  const handleEmailRegisteredModalClose = () => {
    setIsEmailRegisteredModalVisible(false);
    router.push("/upcoming-events");
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
        <div className="flex justify-center items-center h-[calc(100vh-300px)]">
          <div className="overflow-hidden">
            <div className="-mt-52 -mb-52">
              <Loader />
            </div>
          </div>
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
        <div className="mb-8">
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            {eventData.event}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            {eventData.description}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-12 shadow-sm">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            <div className="flex items-start">
              <div className="bg-[#FAB616] border-b-2 border-[#131226] p-2 rounded-lg mr-4">
                <FaCalendarAlt className="text-white text-[28px]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="font-semibold">{formatDate(eventData.date)}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#FAB616] border-b-2 border-[#131226] p-2 rounded-lg mr-4">
                <FaCalendarDay className="text-white text-[28px]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Duration</p>
                <p className="font-semibold">
                  {eventData.duration} {eventData.duration > 1 ? "Days" : "Day"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#FAB616] border-b-2 border-[#131226] p-2 rounded-lg mr-4">
                <FaRegClock className="text-white text-[28px]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Time</p>
                <p className="font-semibold">
                  {formatTime(eventData.time_begin)} -{" "}
                  {formatTime(eventData.time_end)}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#FAB616] border-b-2 border-[#131226] p-2 rounded-lg mr-4">
                <IoLocationOutline className="text-white text-[28px]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="font-semibold">{eventData.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center pb-20">
        <form onSubmit={handleSubmit}>
          <input
            className="text-[14px] font-[500] bg-[#FAB616] hover:bg-[#131226] border-b-2 border-[#131226] hover:border-[#FAB616] sm:w-80 w-40 py-2 rounded text-[#131226] hover:text-white cursor-pointer transition-all duration-300"
            type="submit"
            value="Register Now!"
          />

          {error && (
            <div className="mt-4 text-red-500 text-center text-sm">{error}</div>
          )}
        </form>

        <Modal
          open={isWarningModalVisible}
          onCancel={handleWarningModalCancel}
          onOk={handleWarningModalConfirm}
          title="Warning!"
          centered
          okText="Yes"
          cancelText="No"
          okButtonProps={{
            style: {
              borderBottom: "2px solid #131226",
              backgroundColor: "#FAB616",
              color: "#131226",
              transition: "all 0.3s ease",
            },
            onMouseOver: (e: React.MouseEvent) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.backgroundColor = "#131226";
              target.style.color = "white";
              target.style.borderBottomColor = "#FAB616";
            },
            onMouseOut: (e: React.MouseEvent) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.backgroundColor = "#FAB616";
              target.style.color = "#131226";
              target.style.borderBottomColor = "#131226";
            },
          }}
          cancelButtonProps={{
            style: {
              borderBottom: "2px solid #FAB616",
              backgroundColor: "#131226",
              color: "white",
              transition: "all 0.3s ease",
            },
            onMouseOver: (e: React.MouseEvent) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.backgroundColor = "#FAB616";
              target.style.color = "#131226";
              target.style.borderBottomColor = "#131226";
            },
            onMouseOut: (e: React.MouseEvent) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.backgroundColor = "#131226";
              target.style.color = "white";
              target.style.borderBottomColor = "#FAB616";
            },
          }}
        >
          <div className="flex justify-center items-center text-center">
            <Image src={Warning} alt="Warning" width={120} height={120} />
          </div>
          {formData.name ? (
            <div>
              <p className="text-center font-bold text-[20px] mb-5">
                Hey {formData.name}!
              </p>
              <p className="text-center">
                You are about to register for this event. Are you sure?
              </p>
            </div>
          ) : (
            <p className="text-center font-bold text-[20px] mb-5">
              You are not logged in. Do you want to log in?
            </p>
          )}
        </Modal>

        <Modal
          open={isSuccessModalVisible && !isEmailRegisteredModalVisible}
          onCancel={handleSuccessModalClose}
          title="Success!"
          centered
          okText="Yes"
          cancelText="Okay"
          okButtonProps={{
            style: {
              display: "none",
            },
          }}
          cancelButtonProps={{
            style: {
              borderBottom: "2px solid #FAB616",
              backgroundColor: "#131226",
              color: "white",
              transition: "all 0.3s ease",
            },
            onMouseOver: (e: React.MouseEvent) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.backgroundColor = "#131226";
              target.style.color = "white";
              target.style.borderBottomColor = "#FAB616";
            },
            onMouseOut: (e: React.MouseEvent) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.backgroundColor = "#FAB616";
              target.style.color = "#131226";
              target.style.borderBottomColor = "#131226";
            },
          }}
        >
          <div className="flex justify-center items-center text-center">
            <Image src={Success} height={120} width={120} alt={"Success"} />
          </div>
          <p className="text-center font-bold text-[20px] mb-5">
            Hey {formData.name}!
          </p>
          <p className="text-center">Registration successful!</p>
        </Modal>

        <Modal
          open={isErrorModalVisible}
          onCancel={handleErrorModalClose}
          title="Error"
          centered
          okText="Yes"
          cancelText="No"
          okButtonProps={{
            style: {
              borderBottom: "2px solid #131226",
              backgroundColor: "#FAB616",
              color: "#131226",
              transition: "all 0.3s ease",
            },
            onMouseOver: (e: React.MouseEvent) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.backgroundColor = "#131226";
              target.style.color = "white";
              target.style.borderBottomColor = "#FAB616";
            },
            onMouseOut: (e: React.MouseEvent) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.backgroundColor = "#FAB616";
              target.style.color = "#131226";
              target.style.borderBottomColor = "#131226";
            },
          }}
          cancelButtonProps={{
            style: {
              borderBottom: "2px solid #FAB616",
              backgroundColor: "#131226",
              color: "white",
              transition: "all 0.3s ease",
            },
            onMouseOver: (e: React.MouseEvent) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.backgroundColor = "#FAB616";
              target.style.color = "#131226";
              target.style.borderBottomColor = "#131226";
            },
            onMouseOut: (e: React.MouseEvent) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.backgroundColor = "#131226";
              target.style.color = "white";
              target.style.borderBottomColor = "#FAB616";
            },
          }}
        >
          <p className="text-center font-bold text-[20px] mb-5">
            Hey {formData.name}!
          </p>
          <p>There was an error with your registration.</p>
        </Modal>

        <Modal
          open={isEmailRegisteredModalVisible}
          onCancel={handleEmailRegisteredModalClose}
          title="You're Already Registered!"
          centered
          okText="Yes"
          cancelText="Okay"
          okButtonProps={{
            style: {
              display: "none",
            },
          }}
          cancelButtonProps={{
            style: {
              borderBottom: "2px solid #FAB616",
              backgroundColor: "#131226",
              color: "white",
              transition: "all 0.3s ease",
            },
            onMouseOver: (e: React.MouseEvent) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.backgroundColor = "#131226";
              target.style.color = "white";
              target.style.borderBottomColor = "#FAB616";
            },
            onMouseOut: (e: React.MouseEvent) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.backgroundColor = "#FAB616";
              target.style.color = "#131226";
              target.style.borderBottomColor = "#131226";
            },
          }}
        >
          <div className="flex justify-center items-center text-center">
            <Image src={Warning} alt="Warning" width={120} height={120} />
          </div>
          <p className="text-center font-bold text-[20px] mb-5">
            Hey {formData.name}!
          </p>
          <p className="text-center">
            You&apos;re already registered for this event.
          </p>
        </Modal>
      </div>
      <Footer />
    </main>
  );
};
