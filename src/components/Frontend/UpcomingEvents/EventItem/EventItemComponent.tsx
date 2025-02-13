"use client";

import { useEffect, useState } from "react";
import { Footer } from "../../Footer/Footer";
import { Media } from "../../Home/Media";
import { Breadcrumbs } from "./Breadcrumbs";
import { Navigation } from "../../Navigation/Navigation";
import { FaRegClock } from "react-icons/fa";
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
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isEmailRegisteredModalVisible, setIsEmailRegisteredModalVisible] =
    useState(false);
  const [pendingSubmit, setPendingSubmit] = useState<(() => void) | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
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
    } catch {
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

    setPendingSubmit(() => submitForm);
    setIsWarningModalVisible(true);
  };

  const submitForm = async () => {
    const data = {
      event_id: eventId,
      event_name: eventData?.event,
      name: formData.name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
    };

    try {
      const response = await fetch("/api/event-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 409) {
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
  };

  const handleErrorModalClose = () => {
    setIsErrorModalVisible(false);
  };

  const handleEmailRegisteredModalClose = () => {
    setIsEmailRegisteredModalVisible(false);
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
            <p className="text-center font-bold text-[20px] mb-5">
              Hey {formData.name}!
            </p>
            <p className="text-center">
              You are about to register for this event. Are you sure?
            </p>
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
      </div>
      <Footer />
    </main>
  );
};
