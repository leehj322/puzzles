"use client";

import { motion } from "framer-motion";

export function NonogramIllustration() {
  const GRID_SIZE = 5;
  const CELL = 12;
  const ORIGIN_X = 22;
  const ORIGIN_Y = 24;

  const colHints = ["2", "1", "3", "1", "2"];
  const rowHints = ["1,1", "3", "1", "3", "1,1"];

  const filled: Array<{ row: number; col: number; delay: number }> = [
    { row: 0, col: 0, delay: 0.0 },
    { row: 0, col: 4, delay: 0.2 },
    { row: 1, col: 1, delay: 0.4 },
    { row: 1, col: 2, delay: 0.6 },
    { row: 1, col: 3, delay: 0.8 },
    { row: 2, col: 2, delay: 1.0 },
    { row: 3, col: 1, delay: 1.2 },
    { row: 3, col: 2, delay: 1.4 },
    { row: 3, col: 3, delay: 1.6 },
    { row: 4, col: 0, delay: 1.8 },
    { row: 4, col: 4, delay: 2.0 },
  ];

  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden>
      {colHints.map((h, i) => (
        <text
          key={`ch-${i}`}
          x={ORIGIN_X + i * CELL + CELL / 2}
          y={ORIGIN_Y - 4}
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          fill="#3a2a3d"
          opacity="0.7"
        >
          {h}
        </text>
      ))}
      {rowHints.map((h, i) => (
        <text
          key={`rh-${i}`}
          x={ORIGIN_X - 4}
          y={ORIGIN_Y + i * CELL + CELL / 2 + 3}
          textAnchor="end"
          fontSize="7"
          fontWeight="700"
          fill="#3a2a3d"
          opacity="0.7"
        >
          {h}
        </text>
      ))}
      {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
        const row = Math.floor(i / GRID_SIZE);
        const col = i % GRID_SIZE;
        return (
          <rect
            key={i}
            x={ORIGIN_X + col * CELL}
            y={ORIGIN_Y + row * CELL}
            width={CELL - 1}
            height={CELL - 1}
            rx="2"
            fill="#fff"
            opacity="0.95"
          />
        );
      })}
      {filled.map((f, i) => (
        <motion.rect
          key={`fill-${i}`}
          x={ORIGIN_X + f.col * CELL}
          y={ORIGIN_Y + f.row * CELL}
          width={CELL - 1}
          height={CELL - 1}
          rx="2"
          fill="#3a2a3d"
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{
            duration: 4.0,
            times: [0, 0.05, 0.2, 0.85, 1],
            repeat: Infinity,
            delay: f.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}
