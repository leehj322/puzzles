"use client";

import { motion } from "framer-motion";

export function MemoryIllustration() {
  const COLS = 4;
  const ROWS = 3;
  const CELL = 18;
  const ORIGIN_X = 16;
  const ORIGIN_Y = 23;

  // Two matching pairs that flip in sequence.
  const flips: Array<{ r: number; c: number; icon: string; delay: number }> = [
    { r: 0, c: 0, icon: "★", delay: 0.3 },
    { r: 1, c: 3, icon: "★", delay: 0.8 },
    { r: 2, c: 1, icon: "♥", delay: 2.0 },
    { r: 2, c: 2, icon: "♥", delay: 2.5 },
  ];

  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden>
      {Array.from({ length: ROWS * COLS }, (_, i) => {
        const r = Math.floor(i / COLS);
        const c = i % COLS;
        return (
          <rect
            key={i}
            x={ORIGIN_X + c * CELL}
            y={ORIGIN_Y + r * CELL}
            width={CELL - 3}
            height={CELL - 3}
            rx="3"
            fill="#fff"
            opacity="0.95"
          />
        );
      })}
      {flips.map((f, i) => (
        <motion.g
          key={`f-${i}`}
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{
            duration: 4.0,
            times: [0, 0.05, 0.2, 0.85, 1],
            repeat: Infinity,
            delay: f.delay,
            ease: "easeInOut",
          }}
        >
          <rect
            x={ORIGIN_X + f.c * CELL}
            y={ORIGIN_Y + f.r * CELL}
            width={CELL - 3}
            height={CELL - 3}
            rx="3"
            fill="#fff8f3"
          />
          <text
            x={ORIGIN_X + f.c * CELL + (CELL - 3) / 2}
            y={ORIGIN_Y + f.r * CELL + (CELL - 3) / 2 + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#ff5600"
          >
            {f.icon}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
