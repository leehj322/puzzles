"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { PUZZLE_TYPES } from "@puzzles/core";

import { fadeUp, stagger } from "@/shared/lib/motion";

import { PuzzleTypeCard } from "./puzzle-type-card";

export function PuzzleTypesView() {
  const t = useTranslations("puzzleTypes");

  return (
    <main className="px-6 py-12 sm:py-16">
      <motion.div
        className="mx-auto flex max-w-4xl flex-col gap-10"
        variants={stagger(0.1)}
        initial="hidden"
        animate="visible"
      >
        <motion.header variants={fadeUp} className="flex flex-col gap-3">
          <h1 className="font-display text-h2 font-semibold sm:text-h1">
            {t("title")}
          </h1>
          <p className="max-w-xl font-sans text-body text-fg-muted sm:text-lead">
            {t("subtitle")}
          </p>
        </motion.header>
        <ul className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PUZZLE_TYPES.map((type) => (
            <li key={type.id} className="h-full">
              <PuzzleTypeCard type={type} />
            </li>
          ))}
        </ul>
      </motion.div>
    </main>
  );
}
