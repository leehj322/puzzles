"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Link } from "@/shared/i18n/navigation";
import { fadeUp, stagger, VIEWPORT_ONCE } from "@/shared/lib/motion";
import { buttonClass } from "@/shared/ui/button";

export function FinalCtaSection() {
  const t = useTranslations("home.finalCta");

  return (
    <section className="px-6 py-24 sm:py-32">
      <motion.div
        className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 overflow-hidden rounded-card border border-border bg-accent-soft px-6 py-16 text-center sm:py-20"
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-10 top-6 h-24 w-24 rotate-12 rounded-tile bg-mint opacity-60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 bottom-4 h-20 w-20 -rotate-12 rounded-tile bg-butter opacity-60"
        />

        <motion.h2
          variants={fadeUp}
          className="relative font-display text-h3 font-semibold sm:text-h2"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="relative max-w-lg font-sans text-body text-fg-muted sm:text-lead"
        >
          {t("desc")}
        </motion.p>
        <motion.div variants={fadeUp} className="relative">
          <Link href="/browse" className={buttonClass()}>
            {t("button")}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
