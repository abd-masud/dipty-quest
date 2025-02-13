"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiArrowUpDoubleFill } from "react-icons/ri";

const ScrollProgress = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = Math.min((scrollTop / scrollHeight) * 100, 100);

      setScrollPercentage(progress);
      setIsVisible(scrollTop > 500);
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollPercentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-10 right-10 z-50 cursor-pointer flex items-center justify-center"
    >
      <svg
        className="md:w-12 w-10 md:h-12 h-10 transform -rotate-90 absolute bg-white rounded-full"
        viewBox="0 0 80 80"
      >
        <circle
          cx="40"
          cy="40"
          r={radius}
          strokeWidth="6"
          className="stroke-gray-300"
          fill="transparent"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          strokeWidth="6"
          strokeLinecap="round"
          className="stroke-[#FAB616]"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ willChange: "stroke-dashoffset" }}
        />
      </svg>

      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleScrollToTop}
        className="absolute md:w-12 w-10 md:h-12 h-10 text-white rounded-full flex items-center justify-center shadow-lg"
      >
        <RiArrowUpDoubleFill className="md:w-5 w-4 md:h-5 h-4 fill-[#131226]" />
      </motion.button>
    </motion.div>
  );
};

export default ScrollProgress;
