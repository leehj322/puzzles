"use client";

import { motion } from "framer-motion";

export function SudokuIllustration() {
  const cells = [
    { x: 10, y: 10, n: "5" },
    { x: 40, y: 10, n: "" },
    { x: 70, y: 10, n: "1" },
    { x: 10, y: 40, n: "" },
    { x: 40, y: 40, n: "7" },
    { x: 70, y: 40, n: "" },
    { x: 10, y: 70, n: "9" },
    { x: 40, y: 70, n: "" },
    { x: 70, y: 70, n: "4" },
  ];
  const fillTargets = [
    { idx: 1, n: "3", delay: 0.3 },
    { idx: 3, n: "8", delay: 1.0 },
    { idx: 5, n: "2", delay: 1.7 },
    { idx: 7, n: "6", delay: 2.4 },
  ];

  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden>
      {cells.map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y={c.y}
          width="20"
          height="20"
          rx="4"
          fill="#fff"
          opacity="0.95"
        />
      ))}
      {cells.map((c, i) =>
        c.n ? (
          <text
            key={`s-${i}`}
            x={c.x + 10}
            y={c.y + 14}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#3a2a3d"
          >
            {c.n}
          </text>
        ) : null,
      )}
      {fillTargets.map((f) => {
        const c = cells[f.idx];
        return (
          <motion.text
            key={`f-${f.idx}`}
            x={c.x + 10}
            y={c.y + 14}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#ff5600"
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{
              duration: 3.6,
              times: [0, 0.1, 0.3, 0.85, 1],
              repeat: Infinity,
              delay: f.delay,
              ease: "easeInOut",
            }}
          >
            {f.n}
          </motion.text>
        );
      })}
    </svg>
  );
}
