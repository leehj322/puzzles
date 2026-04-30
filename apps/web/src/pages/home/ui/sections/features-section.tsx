"use client";

import { motion } from "framer-motion";
import { LayoutGrid, Trophy, Upload, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { fadeUp, stagger, VIEWPORT_ONCE } from "@/shared/lib/motion";

type FeatureKey = "variety" | "upload" | "ranking";

const FEATURES: ReadonlyArray<{
  key: FeatureKey;
  accent: string;
  Icon: LucideIcon;
}> = [
  { key: "variety", accent: "bg-mint", Icon: LayoutGrid },
  { key: "upload", accent: "bg-butter", Icon: Upload },
  { key: "ranking", accent: "bg-rose", Icon: Trophy },
];

export function FeaturesSection() {
  const t = useTranslations("home.features");

  return (
    <section className="px-6 py-24 sm:py-32">
      <motion.div
        className="mx-auto flex max-w-4xl flex-col gap-14"
        variants={stagger(0.1)}
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
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.key}
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="flex flex-col gap-4 rounded-card border border-border bg-surface p-7 shadow-sm"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-icon text-fg ${feature.accent}`}
              >
                <feature.Icon aria-hidden className="h-7 w-7" />
              </div>
              <h3 className="font-display text-h4 font-semibold">
                {t(`items.${feature.key}.title`)}
              </h3>
              <p className="font-sans text-body text-fg-muted">
                {t(`items.${feature.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
