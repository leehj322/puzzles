"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeUp, stagger, VIEWPORT_ONCE } from "@/shared/lib/motion";

const DISCORD_URL = "https://discord.gg/your-invite";
const CONTACT_EMAIL = "leemiro2344@gmail.com";

export function FooterSection() {
  const t = useTranslations("home.footer");
  const tHeader = useTranslations("header");

  return (
    <footer className="border-t border-border bg-surface-warm px-6 py-16">
      <motion.div
        className="mx-auto flex max-w-4xl flex-col gap-12"
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        <div className="grid gap-10 md:grid-cols-3">
          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <p className="font-display text-h4 font-semibold">
              {tHeader("title")}
            </p>
            <p className="max-w-xs font-sans text-small text-fg-muted">
              {t("tagline")}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <p className="font-sans text-small font-semibold uppercase tracking-wide text-fg-subtle">
              {t("communityTitle")}
            </p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-sans text-body text-fg transition-opacity hover:opacity-70"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
                <path d="M19.27 5.33A17.4 17.4 0 0 0 14.85 4l-.18.32a14.05 14.05 0 0 1 4.07 1.3 13.94 13.94 0 0 0-12.49 0c1.27-.57 2.65-1 4.06-1.3L10.13 4a17.6 17.6 0 0 0-4.42 1.33C2.92 9.4 2.16 13.36 2.54 17.27a17.66 17.66 0 0 0 5.36 2.7l.4-.55a11.31 11.31 0 0 1-1.78-.86l.13-.1a12.6 12.6 0 0 0 10.7 0l.13.1c-.55.32-1.14.6-1.78.86l.4.55a17.66 17.66 0 0 0 5.36-2.7c.45-4.51-.71-8.43-2.19-11.94ZM9.07 14.93c-1.04 0-1.9-.95-1.9-2.12 0-1.16.84-2.12 1.9-2.12 1.06 0 1.92.96 1.9 2.12 0 1.17-.84 2.12-1.9 2.12Zm5.86 0c-1.04 0-1.9-.95-1.9-2.12 0-1.16.84-2.12 1.9-2.12 1.06 0 1.92.96 1.9 2.12 0 1.17-.84 2.12-1.9 2.12Z" />
              </svg>
              {t("discord")}
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <p className="font-sans text-small font-semibold uppercase tracking-wide text-fg-subtle">
              {t("contactTitle")}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-sans text-body text-fg transition-opacity hover:opacity-70"
            >
              {t("contact")}
            </a>
            <p className="font-sans text-small text-fg-subtle">{CONTACT_EMAIL}</p>
          </motion.div>
        </div>

        <motion.p
          variants={fadeUp}
          className="border-t border-border pt-8 font-sans text-small text-fg-subtle"
        >
          {t("rights")}
        </motion.p>
      </motion.div>
    </footer>
  );
}
