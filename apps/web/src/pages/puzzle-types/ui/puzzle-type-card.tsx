"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Link } from "@/shared/i18n/navigation";
import { cn } from "@/shared/lib/cn";
import { fadeUp } from "@/shared/lib/motion";
import { Badge } from "@/shared/ui/badge";
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
      className={cn(
        "flex h-full flex-col gap-4 rounded-card border border-border bg-surface p-5 shadow-sm",
        !type.available && "opacity-80",
      )}
    >
      <div
        className={cn(
          "relative flex h-32 items-center justify-center overflow-hidden rounded-media",
          accent,
          !type.available && "saturate-50",
        )}
      >
        <PuzzleIllustration typeId={type.id} />
        {!type.available && (
          <span className="absolute right-3 top-3">
            <Badge tone="muted">{tCommon("comingSoon")}</Badge>
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="font-display text-h4 font-semibold">{t(type.nameKey)}</h3>
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

  return (
    <Link
      href={`/browse/${type.id}`}
      className="block h-full focus-visible:outline-none"
    >
      {card}
    </Link>
  );
}
