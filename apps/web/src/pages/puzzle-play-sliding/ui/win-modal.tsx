"use client";

import { useTranslations } from "next-intl";

import { formatTime } from "@puzzles/core";

import { Link } from "@/shared/i18n/navigation";
import { Button, buttonClass } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

import { useSlidingStore } from "../model/sliding-store";

export function SlidingWinModal() {
  const t = useTranslations("puzzlePlay");
  const tCommon = useTranslations("common");
  const finishedAt = useSlidingStore((s) => s.finishedAt);
  const startedAt = useSlidingStore((s) => s.startedAt);
  const moves = useSlidingStore((s) => s.moves);
  const reset = useSlidingStore((s) => s.reset);

  if (!finishedAt || !startedAt) return null;

  const duration = finishedAt - startedAt;

  return (
    <div
      role="dialog"
      aria-modal
      aria-labelledby="sliding-win-title"
      className="fixed inset-0 z-50 grid place-items-center bg-fg/40 backdrop-blur-sm px-4"
    >
      <Card className="w-full max-w-sm p-6 flex flex-col gap-4 bg-surface">
        <p className="font-mono text-mono uppercase text-fg-muted">
          WELL DONE
        </p>
        <h2 id="sliding-win-title" className="font-sans text-h3">
          {t("won")}
        </h2>
        <p className="font-sans text-body text-fg-muted">
          {t("wonDesc", { moves, time: formatTime(duration) })}
        </p>
        <div className="flex gap-2 mt-2">
          <Button onClick={reset}>{tCommon("reset")}</Button>
          <Link
            href="/browse/sliding"
            className={buttonClass({ variant: "outlined" })}
          >
            {t("toList")}
          </Link>
        </div>
      </Card>
    </div>
  );
}
