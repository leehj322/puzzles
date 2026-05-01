"use client";

import { useTranslations } from "next-intl";

import { formatTime } from "@puzzles/core";

import { Button } from "@/shared/ui/button";

import { useNonogramTimer } from "../lib/use-timer";
import { useNonogramStore } from "../model/nonogram-store";

export function NonogramHud({
  difficulty,
  rows,
  cols,
}: {
  difficulty: string;
  rows: number;
  cols: number;
}) {
  const t = useTranslations("puzzlePlay");
  const tCommon = useTranslations("common");
  const tNono = useTranslations("nonogram");
  const reset = useNonogramStore((s) => s.reset);
  const elapsed = useNonogramTimer();

  return (
    <div className="w-full max-w-[min(96vw,640px)] flex items-end justify-between gap-4">
      <div className="flex gap-6">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-mono uppercase text-fg-muted">
            {tNono("difficultyLabel")}
          </span>
          <span className="font-display text-h4">
            {tNono(`difficulty.${difficulty}`)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-mono uppercase text-fg-muted">
            {tNono("sizeLabel")}
          </span>
          <span className="font-display text-h4 tabular-nums">
            {cols}×{rows}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-mono uppercase text-fg-muted">
            {t("time")}
          </span>
          <span className="font-mono text-h4 tabular-nums">
            {formatTime(elapsed)}
          </span>
        </div>
      </div>
      <Button variant="outlined" size="sm" onClick={reset}>
        {tCommon("reset")}
      </Button>
    </div>
  );
}
