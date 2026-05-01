"use client";

import { motion } from "framer-motion";

export function Game2048Illustration() {
  const CELL = 16;
  const ORIGIN = 18;
  const GRID = 4;

  const tiles: Array<{ row: number; col: number; n: number }> = [
    { row: 0, col: 0, n: 4 },
    { row: 0, col: 2, n: 8 },
    { row: 1, col: 1, n: 2 },
    { row: 2, col: 3, n: 16 },
    { row: 3, col: 0, n: 2 },
  ];

  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden>
      {Array.from({ length: GRID * GRID }, (_, i) => {
        const row = Math.floor(i / GRID);
        const col = i % GRID;
        return (
          <rect
            key={`bg-${i}`}
            x={ORIGIN + col * CELL}
            y={ORIGIN + row * CELL}
            width={CELL - 2}
            height={CELL - 2}
            rx="3"
            fill="#fff"
            opacity="0.55"
          />
        );
      })}
      {tiles.map((t) => (
        <g key={`t-${t.row}-${t.col}`}>
          <rect
            x={ORIGIN + t.col * CELL}
            y={ORIGIN + t.row * CELL}
            width={CELL - 2}
            height={CELL - 2}
            rx="3"
            fill="#fff"
            opacity="0.98"
          />
          <text
            x={ORIGIN + t.col * CELL + (CELL - 2) / 2}
            y={ORIGIN + t.row * CELL + (CELL - 2) / 2 + 3}
            textAnchor="middle"
            fontSize={t.n >= 16 ? "8" : "9"}
            fontWeight="700"
            fill="#3a2a3d"
          >
            {t.n}
          </text>
        </g>
      ))}
      <motion.g
        animate={{ x: [0, CELL, CELL], opacity: [1, 1, 0] }}
        transition={{
          duration: 2.4,
          times: [0, 0.55, 0.7],
          repeat: Infinity,
          repeatDelay: 0.6,
          ease: "easeInOut",
        }}
      >
        <rect
          x={ORIGIN + 1 * CELL}
          y={ORIGIN + 3 * CELL}
          width={CELL - 2}
          height={CELL - 2}
          rx="3"
          fill="#fff"
          opacity="0.98"
        />
        <text
          x={ORIGIN + 1 * CELL + (CELL - 2) / 2}
          y={ORIGIN + 3 * CELL + (CELL - 2) / 2 + 3}
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#3a2a3d"
        >
          2
        </text>
      </motion.g>
      <motion.g
        animate={{ scale: [1, 1, 1.22, 1, 1] }}
        style={{
          transformOrigin: `${ORIGIN + 2 * CELL + (CELL - 2) / 2}px ${ORIGIN + 3 * CELL + (CELL - 2) / 2}px`,
        }}
        transition={{
          duration: 2.4,
          times: [0, 0.6, 0.7, 0.85, 1],
          repeat: Infinity,
          repeatDelay: 0.6,
          ease: "easeInOut",
        }}
      >
        <motion.rect
          x={ORIGIN + 2 * CELL}
          y={ORIGIN + 3 * CELL}
          width={CELL - 2}
          height={CELL - 2}
          rx="3"
          animate={{ fill: ["#fff", "#fff", "#ffb39c", "#fff", "#fff"] }}
          transition={{
            duration: 2.4,
            times: [0, 0.6, 0.7, 0.9, 1],
            repeat: Infinity,
            repeatDelay: 0.6,
            ease: "easeInOut",
          }}
          opacity="0.98"
        />
        <motion.text
          x={ORIGIN + 2 * CELL + (CELL - 2) / 2}
          y={ORIGIN + 3 * CELL + (CELL - 2) / 2 + 3}
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#3a2a3d"
          animate={{ opacity: [1, 1, 0, 0, 1] }}
          transition={{
            duration: 2.4,
            times: [0, 0.65, 0.7, 0.95, 1],
            repeat: Infinity,
            repeatDelay: 0.6,
            ease: "easeInOut",
          }}
        >
          2
        </motion.text>
        <motion.text
          x={ORIGIN + 2 * CELL + (CELL - 2) / 2}
          y={ORIGIN + 3 * CELL + (CELL - 2) / 2 + 3}
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#3a2a3d"
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{
            duration: 2.4,
            times: [0, 0.65, 0.7, 0.95, 1],
            repeat: Infinity,
            repeatDelay: 0.6,
            ease: "easeInOut",
          }}
        >
          4
        </motion.text>
      </motion.g>
    </svg>
  );
}
