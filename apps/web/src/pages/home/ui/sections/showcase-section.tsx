"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeUp, stagger, VIEWPORT_ONCE } from "@/shared/lib/motion";
import {
  MinesweeperIllustration,
  NonogramIllustration,
  SlidingIllustration,
  SudokuIllustration,
} from "@/shared/ui/puzzle-illustration";

const KINDS = [
  { key: "sliding" as const, accent: "bg-mint", Demo: SlidingIllustration },
  { key: "sudoku" as const, accent: "bg-sky", Demo: SudokuIllustration },
  { key: "nonogram" as const, accent: "bg-peach", Demo: NonogramIllustration },
  { key: "minesweeper" as const, accent: "bg-butter", Demo: MinesweeperIllustration },
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
