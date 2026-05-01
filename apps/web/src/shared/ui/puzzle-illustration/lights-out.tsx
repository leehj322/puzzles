"use client";

import { motion } from "framer-motion";

export function LightsOutIllustration() {
  const GRID = 4;
  const CELL = 16;
  const ORIGIN = 18;

  // Lit cells that gradually turn off as the puzzle is solved.
  const lit: Array<{ r: number; c: number; delay: number }> = [
    { r: 0, c: 1, delay: 0.0 },
    { r: 0, c: 2, delay: 0.0 },
    { r: 1, c: 0, delay: 0.0 },
    { r: 1, c: 2, delay: 0.0 },
    { r: 2, c: 1, delay: 0.0 },
    { r: 2, c: 3, delay: 0.0 },
    { r: 3, c: 2, delay: 0.0 },
  ];

  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden>
      {Array.from({ length: GRID * GRID }, (_, i) => {
        const r = Math.floor(i / GRID);
        const c = i % GRID;
        return (
          <rect
            key={i}
            x={ORIGIN + c * CELL}
            y={ORIGIN + r * CELL}
            width={CELL - 2}
            height={CELL - 2}
            rx="3"
            fill="#fff"
            opacity="0.95"
          />
        );
      })}
      {lit.map((l, i) => (
        <motion.rect
          key={`lit-${i}`}
          x={ORIGIN + l.c * CELL}
          y={ORIGIN + l.r * CELL}
          width={CELL - 2}
          height={CELL - 2}
          rx="3"
          fill="#ff5600"
          animate={{ opacity: [1, 1, 0, 0, 1] }}
          transition={{
            duration: 4.2,
            times: [0, 0.25 + i * 0.08, 0.4 + i * 0.08, 0.9, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}
