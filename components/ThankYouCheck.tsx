"use client";

import { motion } from "framer-motion";

export default function ThankYouCheck() {
  return (
    <motion.span
      className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#e0a458] text-[#e0a458] shadow-[0_0_40px_-8px_rgba(224,164,88,0.6)]"
      initial={{ scale: 0, rotate: -90, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-[#e0a458]"
        initial={{ scale: 1, opacity: 0.7 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 1 }}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-11 w-11"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="m5 12.5 4.5 4.5L19 7.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
        />
      </svg>
    </motion.span>
  );
}
