"use client";

import { motion } from "framer-motion";

export function WordSearchIllustration() {
  const GRID = 5;
  const CELL = 14;
  const ORIGIN = 15;

  const letters = [
    "P", "U", "Z", "A", "B",
    "L", "R", "C", "O", "S",
    "A", "I", "X", "Z", "O",
    "Y", "D", "E", "Y", "T",
    "M", "N", "H", "O", "P",
  ];

  // Diagonal "PLAY" from (0,0) → (3,3)
  const highlight = [
    { r: 0, c: 0 },
    { r: 1, c: 1 },
    { r: 2, c: 2 },
    { r: 3, c: 3 },
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
      {letters.map((ch, i) => {
        const r = Math.floor(i / GRID);
        const c = i % GRID;
        return (
          <text
            key={`l-${i}`}
            x={ORIGIN + c * CELL + (CELL - 2) / 2}
            y={ORIGIN + r * CELL + (CELL - 2) / 2 + 3}
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="#3a2a3d"
          >
            {ch}
          </text>
        );
      })}
      <motion.g
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{
          duration: 3.6,
          times: [0, 0.15, 0.35, 0.85, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {highlight.map((h, i) => (
          <circle
            key={`h-${i}`}
            cx={ORIGIN + h.c * CELL + (CELL - 2) / 2}
            cy={ORIGIN + h.r * CELL + (CELL - 2) / 2}
            r={(CELL - 2) / 2 + 1}
            fill="none"
            stroke="#ff5600"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        ))}
      </motion.g>
    </svg>
  );
}
