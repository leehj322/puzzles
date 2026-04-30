"use client";

import { motion } from "framer-motion";

import type { PuzzleTypeId } from "@puzzles/core";

export function SlidingIllustration() {
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden>
      <rect x="10" y="10" width="36" height="36" rx="6" fill="#fff" opacity="0.95" />
      <motion.rect
        x="54"
        y="10"
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
      <rect x="54" y="54" width="36" height="36" rx="6" fill="#fff" opacity="0.95" />
    </svg>
  );
}

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

export function NonogramIllustration() {
  const GRID_SIZE = 5;
  const CELL = 12;
  const ORIGIN_X = 32;
  const ORIGIN_Y = 32;

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

export const PUZZLE_TYPE_ACCENT: Record<PuzzleTypeId, string> = {
  "sliding-15": "bg-mint",
  sudoku: "bg-sky",
  nonogram: "bg-peach",
  minesweeper: "bg-butter",
};

const ILLUSTRATIONS: Record<PuzzleTypeId, () => React.ReactElement> = {
  "sliding-15": SlidingIllustration,
  sudoku: SudokuIllustration,
  nonogram: NonogramIllustration,
  minesweeper: MinesweeperIllustration,
};

export function PuzzleIllustration({ typeId }: { typeId: PuzzleTypeId }) {
  const Component = ILLUSTRATIONS[typeId];
  return <Component />;
}
