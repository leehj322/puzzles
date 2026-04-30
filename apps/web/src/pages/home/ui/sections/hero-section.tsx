"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Link } from "@/shared/i18n/navigation";
import { fadeUp, stagger } from "@/shared/lib/motion";
import { buttonClass } from "@/shared/ui/button";

const FLOATING_TILES = [
  { className: "right-[6%] top-[14%] bg-butter", size: 72, delay: 0 },
  { className: "right-[22%] top-[36%] bg-mint", size: 48, delay: 0.6 },
  { className: "right-[10%] bottom-[18%] bg-sky", size: 64, delay: 1.2 },
  { className: "right-[32%] bottom-[10%] bg-rose", size: 40, delay: 0.4 },
  { className: "right-[44%] top-[22%] bg-peach", size: 36, delay: 0.9 },
];

export function HeroSection() {
  const t = useTranslations("home");
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
      {!reduce && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
        >
          {FLOATING_TILES.map((tile, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-tile opacity-55 ${tile.className}`}
              style={{ width: tile.size, height: tile.size }}
              animate={{
                y: [0, -14, 0],
                rotate: [0, 6, 0],
              }}
              transition={{
                duration: 6 + i * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: tile.delay,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="relative z-10 mx-auto flex max-w-4xl flex-col gap-10"
        variants={stagger(0.12)}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          className="font-sans text-small font-semibold uppercase tracking-wide text-accent-strong"
        >
          {t("eyebrow")}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="max-w-4xl font-display text-h2 font-semibold sm:text-h1 lg:text-display"
        >
          {t("title")}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="max-w-xl font-sans text-body text-fg-muted sm:text-lead"
        >
          {t("subtitle")}
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link href="/puzzles" className={buttonClass()}>
            {t("cta")}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
