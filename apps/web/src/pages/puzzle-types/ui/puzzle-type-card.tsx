"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Link } from "@/shared/i18n/navigation";
import { cn } from "@/shared/lib/cn";
import { fadeUp } from "@/shared/lib/motion";
import {
  PUZZLE_TYPE_ACCENT,
  PuzzleIllustration,
} from "@/shared/ui/puzzle-illustration";

import type { PuzzleType } from "@puzzles/core";

export function PuzzleTypeCard({ type }: { type: PuzzleType }) {
  const t = useTranslations();
  const tCommon = useTranslations("common");

  const accent = PUZZLE_TYPE_ACCENT[type.id];

  const card = (
    <motion.article
      variants={fadeUp}
      whileHover={type.available ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative flex h-full flex-col gap-4 overflow-hidden rounded-card border border-border bg-surface p-5 shadow-sm"
    >
      {!type.available && (
        <span
          aria-label={tCommon("comingSoon")}
          className="pointer-events-none absolute -right-10 top-5 z-10 w-36 rotate-45 bg-butter py-1 text-center font-sans text-tag font-semibold text-fg shadow-sm"
        >
          {tCommon("soon")}
        </span>
      )}
      <div
        className={cn(
          "relative flex h-32 items-center justify-center overflow-hidden rounded-media",
          accent,
          !type.available && "saturate-50",
        )}
      >
        <PuzzleIllustration typeId={type.id} />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="font-display text-h4 font-semibold">
          {t(type.nameKey)}
        </h3>
        <p className="font-sans text-small text-fg-muted">{t(type.descKey)}</p>
      </div>
    </motion.article>
  );

  if (!type.available) {
    return (
      <div aria-disabled className="block h-full">
        {card}
      </div>
    );
  }

  const href = type.hasEntries ? `/browse/${type.id}` : `/play/${type.id}`;

  return (
    <Link href={href} className="block h-full focus-visible:outline-none">
      {card}
    </Link>
  );
}
