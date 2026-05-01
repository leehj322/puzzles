"use client";

import { motion } from "framer-motion";

export function MinesweeperIllustration() {
  const GRID_SIZE = 4;
  const CELL = 16;
  const ORIGIN = 18;

  const closed: Array<{ row: number; col: number }> = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      closed.push({ row: r, col: c });
    }
  }

  const reveals: Array<{
    row: number;
    col: number;
    label?: string;
    flag?: boolean;
    delay: number;
  }> = [
    { row: 1, col: 1, label: "1", delay: 0.2 },
    { row: 1, col: 2, label: "2", delay: 0.6 },
    { row: 2, col: 1, label: "1", delay: 1.0 },
    { row: 2, col: 2, label: "3", delay: 1.4 },
    { row: 0, col: 3, flag: true, delay: 1.8 },
    { row: 3, col: 0, label: "1", delay: 2.2 },
  ];

  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden>
      {closed.map((c, i) => (
        <rect
          key={i}
          x={ORIGIN + c.col * CELL}
          y={ORIGIN + c.row * CELL}
          width={CELL - 2}
          height={CELL - 2}
          rx="3"
          fill="#fff"
          opacity="0.95"
        />
      ))}
      {reveals.map((r, i) => (
        <motion.g
          key={`rev-${i}`}
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{
            duration: 4.0,
            times: [0, 0.05, 0.2, 0.85, 1],
            repeat: Infinity,
            delay: r.delay,
            ease: "easeInOut",
          }}
        >
          <rect
            x={ORIGIN + r.col * CELL}
            y={ORIGIN + r.row * CELL}
            width={CELL - 2}
            height={CELL - 2}
            rx="3"
            fill="#fff8f3"
          />
          {r.label && (
            <text
              x={ORIGIN + r.col * CELL + (CELL - 2) / 2}
              y={ORIGIN + r.row * CELL + (CELL - 2) / 2 + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#ff5600"
            >
              {r.label}
            </text>
          )}
          {r.flag && (
            <path
              d={`M ${ORIGIN + r.col * CELL + 4} ${ORIGIN + r.row * CELL + 3}
                  L ${ORIGIN + r.col * CELL + 4} ${ORIGIN + r.row * CELL + CELL - 5}
                  M ${ORIGIN + r.col * CELL + 4} ${ORIGIN + r.row * CELL + 3}
                  L ${ORIGIN + r.col * CELL + CELL - 5} ${ORIGIN + r.row * CELL + 6}
                  L ${ORIGIN + r.col * CELL + 4} ${ORIGIN + r.row * CELL + 9} Z`}
              fill="#ff5600"
              stroke="#3a2a3d"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
          )}
        </motion.g>
      ))}
    </svg>
  );
}
