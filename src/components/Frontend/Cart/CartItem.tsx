"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { Modal } from "antd";
import Warning from "../../../../public/images/warning.webp";
import Success from "../../../../public/images/success.webp";
import empty_cart from "../../../../public/images/empty-cart.webp";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

interface JwtPayload {
  id: number;
  name: string;
}

export const CartItem = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [formData, setFormData] = useState<Partial<JwtPayload>>({});
  const [error, setError] = useState<string | null>(null);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isEmailRegisteredModalVisible, setIsEmailRegisteredModalVisible] =
    useState(false);
  const [pendingSubmit, setPendingSubmit] = useState<(() => void) | null>(null);
  const [coupon, setCoupon] = useState("");
  const [buttonText, setButtonText] = useState("Apply Coupon");
  const [purchasedGigs, setPurchasedGigs] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");
    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        setFormData({
          id: decodedPayload.id,
          name: decodedPayload.name,
        });
      } catch {}
    }
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(
      localStorage.getItem("gigEnrollment") || "[]"
    );
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    const fetchPurchasedGigs = async () => {
      try {
        const response = await fetch("/api/gigs-cart");
        if (response.ok) {
          const data = await response.json();
          setPurchasedGigs(data);
        } else {
        }
      } catch {}
    };

    fetchPurchasedGigs();
  }, []);

  const isPurchased = (gigId: string) => {
    if (!formData.id) return false;

    return purchasedGigs.some(
      (purchasedGig) =>
        purchasedGig.gig_id == gigId && purchasedGig.user_id == formData.id
    );
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("DQ_USER_JWT_TOKEN");

    if (!token) {
      router.push("/authentication/login");
    } else {
      try {
        const base64Payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        setFormData({
          id: decodedPayload.id,
          name: decodedPayload?.name,
        });
        setPendingSubmit(() => () => submitForm());
        setIsWarningModalVisible(true);
      } catch {
        setIsErrorModalVisible(true);
      }
    }
  };

  const handleApplyCoupon = () => {
    if (!coupon.trim()) {
      setError("Apply coupon first");
      return;
    }
    setButtonText("Applying...");
    setError("");
    setTimeout(() => {
      setButtonText("Apply Coupon");
      setError("Invalid coupon code.");
    }, 1000);
  };

  const filteredCartItems = cartItems.filter((item) => !isPurchased(item.id));

  const submitForm = async () => {
    try {
      const requests = cartItems.map((item) => {
        const data = {
          gig_id: item.id,
          user_id: formData.id,
        };

        return fetch("/api/gigs-cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      });

      const responses = await Promise.all(requests);

      const hasError = responses.some((response) => !response.ok);
      if (hasError) {
        setIsErrorModalVisible(true);
        throw new Error("Some requests failed");
      }

      setIsSuccessModalVisible(true);
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
    localStorage.removeItem("gigEnrollment");
    router.push("/gigs");
  };

  const handleErrorModalClose = () => {
    setIsErrorModalVisible(false);
  };

  const handleEmailRegisteredModalClose = () => {
    setIsEmailRegisteredModalVisible(false);
  };

  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("gigEnrollment", JSON.stringify(updatedCart));
  };

  if (cartItems.length == 0) {
    return (
      <main className="bg-[#F5F6F7] py-20 flex flex-col items-center justify-center">
        <Image
          height={100}
          width={100}
          src={empty_cart}
          alt={"empty_cart"}
        ></Image>
        <p className="text-gray-500">Your cart is empty.</p>
        <Link
          href={"/gigs"}
          className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[12px] text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#FAB616] transition-colors duration-300 flex items-center justify-center group mt-5"
        >
          Add to Cart
          <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-[#F5F6F7] py-10 flex items-center justify-center">
      <div className="max-w-screen-xl w-full px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white sm:px-6 px-4 py-6 rounded-lg shadow-md">
          <div className="flex justify-between pb-3 border-b md:px-20 px-0">
            <span className="font-semibold text-lg">Course</span>
            <span className="font-semibold text-lg md:block hidden">Price</span>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-4 border-b"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt="Course Thumbnail"
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div className="flex flex-col">
                  <p className="text-[#131226] font-medium sm:text-[16px] text-[12px]">
                    {item.title}
                  </p>
                  {isPurchased(item.id) && (
                    <p className="text-green-500 text-[10px]">
                      Already Purchased
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-20">
                <span className="text-gray-600 font-medium md:block hidden">
                  {item.price}&nbsp;৳
                </span>
                <button
                  className="text-red-500 text-[20px]"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <IoClose />
                </button>
              </div>
            </div>
          ))}
          <div className="flex mt-4 gap-2 pt-4">
            <input
              type="text"
              placeholder="Coupon code"
              className="border p-2 rounded-md outline-none w-[130px] sm:w-[180px] text-[12px]"
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button
              onClick={handleApplyCoupon}
              className="font-semibold bg-[#FAB616] px-5 py-2 rounded-full text-[12px] text-[#0E0C25] hover:bg-[#0E0C25] hover:text-white border-b-2 border-[#0E0C25] hover:border-[#FAB616] transition-colors duration-300 flex items-center justify-center group"
              disabled={buttonText == "Applying..."}
            >
              <span className="sm:block hidden">{buttonText}</span>
              <FaArrowRight className="ml-1 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-sm" />
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>

        <div>
          <div className="bg-white py-6 sm:px-6 px-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold border-b pb-2">CART TOTALS</h2>
            <div className="mt-4 divide-y-[1px]">
              <div className="flex justify-between text-gray-600 pb-3">
                <p>Total Items</p>
                <span>{filteredCartItems.length}</span>
              </div>
              <div className="flex justify-between text-gray-600 py-3">
                <p>Discount</p>
                <span>0.00 ৳</span>
              </div>
              <div className="flex justify-between font-semibold text-lg py-3 pb-5">
                <p>Total</p>
                <span>
                  {filteredCartItems
                    .reduce((total, item) => {
                      const priceWithoutSymbol = String(item.price).replace(
                        "৳",
                        ""
                      );
                      const parsedPrice = parseFloat(priceWithoutSymbol);
                      return total + (isNaN(parsedPrice) ? 0 : parsedPrice);
                    }, 0)
                    .toFixed(2)}{" "}
                  ৳
                </span>
              </div>
              <button
                onClick={(e) => handleApply(e)}
                disabled={filteredCartItems.length == 0}
                className={`font-semibold px-5 py-2 rounded-full text-[12px] text-[#0E0C25] border-b-2 border-[#0E0C25]
                  ${
                    filteredCartItems.length == 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#FAB616] hover:bg-[#0E0C25] hover:text-white  hover:border-[#FAB616]"
                  } 
                  transition-colors duration-300 flex items-center justify-center w-full group`}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
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
          You are about to purchase gigs. Do you want to proceed?
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
        <p className="text-center">Purchase successful!</p>
      </Modal>

      <Modal
        open={isErrorModalVisible}
        onCancel={handleErrorModalClose}
        title="Error"
        centered
        okText={null}
        cancelText="Okay"
        okButtonProps={{ style: { display: "none" } }}
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
        <p>There is an error with the following action!</p>
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
        <p className="text-center">You&apos;re already purchased those gigs.</p>
      </Modal>
    </main>
  );
};
