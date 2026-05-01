"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { PUZZLE_TYPES } from "@puzzles/core";

import { fadeUp, stagger, VIEWPORT_ONCE } from "@/shared/lib/motion";
import {
  PUZZLE_TYPE_ACCENT,
  PuzzleIllustration,
} from "@/shared/ui/puzzle-illustration";

const TRACK = [...PUZZLE_TYPES, ...PUZZLE_TYPES];

export function ShowcaseSection() {
  const t = useTranslations("home.showcase");
  const tTypes = useTranslations("puzzleTypes");

  return (
    <section className="py-24 sm:py-32">
      <motion.div
        className="flex flex-col gap-14"
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6">
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

        <motion.div
          variants={fadeUp}
          className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <ul className="flex w-max gap-5 pl-5 animate-(--animate-marquee) motion-reduce:animate-none">
            {TRACK.map((type, index) => (
              <li
                key={`${type.id}-${index}`}
                aria-hidden={index >= PUZZLE_TYPES.length}
                className="flex w-52 shrink-0 flex-col gap-4 rounded-card border border-border bg-surface p-5 shadow-sm sm:w-56"
              >
                <div
                  className={`flex h-32 items-center justify-center overflow-hidden rounded-media ${PUZZLE_TYPE_ACCENT[type.id]}`}
                >
                  <PuzzleIllustration typeId={type.id} />
                </div>
                <p className="font-display text-h4 font-semibold">
                  {tTypes(`${type.id}.name`)}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
