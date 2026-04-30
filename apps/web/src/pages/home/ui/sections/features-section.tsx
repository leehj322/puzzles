"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeUp, stagger, VIEWPORT_ONCE } from "@/shared/lib/motion";

type FeatureKey = "variety" | "upload" | "ranking";

const FEATURES: ReadonlyArray<{
  key: FeatureKey;
  accent: string;
  icon: React.ReactNode;
}> = [
  {
    key: "variety",
    accent: "bg-mint",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden>
        <rect x="6" y="6" width="14" height="14" rx="4" fill="currentColor" />
        <rect x="28" y="6" width="14" height="14" rx="4" fill="currentColor" opacity="0.6" />
        <rect x="6" y="28" width="14" height="14" rx="4" fill="currentColor" opacity="0.6" />
        <rect x="28" y="28" width="14" height="14" rx="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "upload",
    accent: "bg-butter",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden>
        <rect x="8" y="10" width="32" height="28" rx="5" fill="currentColor" opacity="0.3" />
        <path
          d="M24 16v14M18 22l6-6 6 6"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    key: "ranking",
    accent: "bg-rose",
    icon: (
      <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden>
        <rect x="8" y="22" width="9" height="18" rx="2" fill="currentColor" opacity="0.5" />
        <rect x="19.5" y="12" width="9" height="28" rx="2" fill="currentColor" />
        <rect x="31" y="28" width="9" height="12" rx="2" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
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
                {feature.icon}
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
