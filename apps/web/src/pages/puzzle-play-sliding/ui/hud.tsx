"use client";

import { useTranslations } from "next-intl";

import { formatTime } from "@puzzles/core";

import { Button } from "@/shared/ui/button";

import { useTimer } from "../lib/use-timer";
import { useSlidingStore } from "../model/sliding-store";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-mono uppercase text-fg-muted">
        {label}
      </span>
      <span className="font-mono text-h4 tabular-nums">{value}</span>
    </div>
  );
}

export function SlidingHud({
  preview,
  onTogglePreview,
}: {
  preview: boolean;
  onTogglePreview: () => void;
}) {
  const t = useTranslations("puzzlePlay");
  const tCommon = useTranslations("common");
  const moves = useSlidingStore((s) => s.moves);
  const reset = useSlidingStore((s) => s.reset);
  const elapsed = useTimer();

  return (
    <div className="w-full max-w-[min(90vw,480px)] flex items-end justify-between gap-4">
      <div className="flex gap-8">
        <Stat label={t("moves")} value={String(moves)} />
        <Stat label={t("time")} value={formatTime(elapsed)} />
      </div>
      <div className="flex gap-2">
        <Button
          variant="outlined"
          size="sm"
          aria-pressed={preview}
          onClick={onTogglePreview}
        >
          {t("preview")}
        </Button>
        <Button variant="outlined" size="sm" onClick={reset}>
          {tCommon("reset")}
        </Button>
      </div>
    </div>
  );
}
