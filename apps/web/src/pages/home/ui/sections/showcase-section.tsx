"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeUp, stagger, VIEWPORT_ONCE } from "../../lib/motion";

function SlidingDemo() {
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24">
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

function JigsawDemo() {
  const path =
    "M20 30 H40 a6 6 0 0 0 12 0 H72 V50 a6 6 0 0 1 0 12 V74 H20 Z";
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24">
      <path d={path} fill="#fff" opacity="0.45" />
      <motion.path
        d={path}
        fill="#fff"
        animate={{
          x: [-26, -26, 0, 0],
          y: [-18, -18, 0, 0],
          opacity: [0, 0, 1, 1],
          scale: [1.12, 1.12, 1, 1],
        }}
        transition={{
          duration: 3.2,
          times: [0, 0.3, 0.55, 1],
          repeat: Infinity,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      />
    </svg>
  );
}

function SudokuDemo() {
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
    <svg viewBox="0 0 100 100" className="h-24 w-24">
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

function MemoryDemo() {
  const cards = [
    { x: 10, y: 10, flips: true },
    { x: 54, y: 10, flips: false },
    { x: 10, y: 54, flips: false },
    { x: 54, y: 54, flips: true },
  ];

  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24">
      {cards.map((c, i) => (
        <motion.g
          key={i}
          animate={
            c.flips
              ? { scaleX: [1, -1, -1, 1] }
              : { scaleX: [1, 1, 1, 1] }
          }
          style={{ transformOrigin: `${c.x + 18}px ${c.y + 18}px` }}
          transition={{
            duration: 3.2,
            times: [0, 0.35, 0.7, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <rect
            x={c.x}
            y={c.y}
            width="36"
            height="36"
            rx="6"
            fill="#fff"
            opacity="0.95"
          />
          {c.flips && (
            <text
              x={c.x + 18}
              y={c.y + 25}
              textAnchor="middle"
              fontSize="22"
              fontWeight="700"
              fill="#ff5600"
            >
              ★
            </text>
          )}
        </motion.g>
      ))}
    </svg>
  );
}

const KINDS = [
  { key: "sliding" as const, accent: "bg-mint", Demo: SlidingDemo },
  { key: "jigsaw" as const, accent: "bg-peach", Demo: JigsawDemo },
  { key: "sudoku" as const, accent: "bg-sky", Demo: SudokuDemo },
  { key: "memory" as const, accent: "bg-butter", Demo: MemoryDemo },
];

export function ShowcaseSection() {
  const t = useTranslations("home.showcase");

  return (
    <section className="px-6 py-24 sm:py-32">
      <motion.div
        className="mx-auto flex max-w-4xl flex-col gap-14"
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        <div className="flex flex-col gap-4">
          <motion.p
            variants={fadeUp}
            className="font-sans text-small font-semibold uppercase tracking-wide text-accent-strong"
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="max-w-2xl font-display text-h3 font-semibold sm:text-h2"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="max-w-xl font-sans text-body text-fg-muted sm:text-lead"
          >
            {t("desc")}
          </motion.p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {KINDS.map(({ key, accent, Demo }) => (
            <motion.div
              key={key}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="flex flex-col gap-4 rounded-card border border-border bg-surface p-5 shadow-sm"
            >
              <div
                className={`flex h-32 items-center justify-center overflow-hidden rounded-media ${accent}`}
              >
                <Demo />
              </div>
              <p className="font-display text-h4 font-semibold">
                {t(`kinds.${key}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
