"use client";

import { motion } from "framer-motion";

export function FruitBoxIllustration() {
  // Compact 5×4 preview of the apple grid; numbers are illustrative.
  const CELL = 14;
  const ORIGIN_X = 15;
  const ORIGIN_Y = 22;

  // Highlighted rectangle (rows 1..2, cols 1..2) sums 3+4+1+2 = 10.
  const grid = [
    [5, 7, 2, 8, 1],
    [3, 3, 4, 6, 9],
    [9, 1, 2, 5, 7],
    [4, 8, 1, 3, 6],
  ];
  const highlight = { r1: 1, c1: 1, r2: 2, c2: 2 };

  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden>
      {grid.flatMap((row, r) =>
        row.map((value, c) => {
          const inHighlight =
            r >= highlight.r1 &&
            r <= highlight.r2 &&
            c >= highlight.c1 &&
            c <= highlight.c2;
          const cx = ORIGIN_X + c * CELL + (CELL - 2) / 2;
          const cy = ORIGIN_Y + r * CELL + (CELL - 2) / 2;
          return (
            <g key={`${r}-${c}`}>
              <motion.circle
                cx={cx}
                cy={cy}
                r={(CELL - 2) / 2}
                fill="#fff"
                animate={
                  inHighlight ? { opacity: [1, 1, 0.15, 1, 1] } : undefined
                }
                transition={
                  inHighlight
                    ? {
                        duration: 3,
                        times: [0, 0.55, 0.7, 0.85, 1],
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : undefined
                }
              />
              <motion.text
                x={cx}
                y={cy + 3}
                textAnchor="middle"
                fontSize="8"
                fontWeight="700"
                fill="#3a2a3d"
                animate={
                  inHighlight ? { opacity: [1, 1, 0, 1, 1] } : undefined
                }
                transition={
                  inHighlight
                    ? {
                        duration: 3,
                        times: [0, 0.55, 0.7, 0.85, 1],
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : undefined
                }
              >
                {value}
              </motion.text>
            </g>
          );
        }),
      )}
      <motion.rect
        x={ORIGIN_X + highlight.c1 * CELL - 2}
        y={ORIGIN_Y + highlight.r1 * CELL - 2}
        width={(highlight.c2 - highlight.c1 + 1) * CELL}
        height={(highlight.r2 - highlight.r1 + 1) * CELL}
        rx="3"
        fill="none"
        stroke="#ff5600"
        strokeWidth="2"
        strokeDasharray="3 3"
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{
          duration: 3,
          times: [0, 0.25, 0.5, 0.65, 0.7],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}
