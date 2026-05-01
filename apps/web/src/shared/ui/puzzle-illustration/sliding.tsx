"use client";

import { motion } from "framer-motion";

export function SlidingIllustration() {
  // 2x2 board: top-left, top-right, bottom-right are filled; bottom-left is
  // the empty slot. The bottom-right tile slides into the empty slot and
  // back (ping-pong) so two tiles never overlap — matching real sliding
  // puzzle rules where pieces only move into the blank.
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden>
      <rect
        x="10"
        y="10"
        width="36"
        height="36"
        rx="6"
        fill="#fff"
        opacity="0.95"
      />
      <rect
        x="54"
        y="10"
        width="36"
        height="36"
        rx="6"
        fill="#fff"
        opacity="0.95"
      />
      <motion.rect
        x="54"
        y="54"
        width="36"
        height="36"
        rx="6"
        fill="#fff"
        opacity="0.95"
        animate={{ x: [0, -44, -44, 0] }}
        transition={{
          duration: 3.2,
          times: [0, 0.4, 0.6, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
