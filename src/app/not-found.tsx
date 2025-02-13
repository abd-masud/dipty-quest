"use client";

import { Footer } from "@/components/Frontend/Footer/Footer";
import { Media } from "@/components/Frontend/Home/Media";
import { Navigation } from "@/components/Frontend/Navigation/Navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  const handleRedirect = () => {
    setRedirecting(true);
    router.push("/");
  };

  return (
    <main>
      <Media />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <div className="flex flex-col justify-center items-center py-40">
        <h1 className="md:text-[36px] text-[24px] font-bold mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-center">
          {redirecting
            ? "Redirecting to the homepage..."
            : "Click the button to go back to the homepage."}
        </p>
        {!redirecting && (
          <button
            onClick={handleRedirect}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
          >
            Go to Homepage
          </button>
        )}
      </div>
      <Footer />
    </main>
  );
}
