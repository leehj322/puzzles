"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { formatTime } from "@puzzles/core";

import { Link } from "@/shared/i18n/navigation";
import { Button, buttonClass } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

import { saveBest, type BestRecord } from "../lib/best-record";
import { usePuzzleStore } from "../model/puzzle-store";

export function WinModal({ puzzleType }: { puzzleType: string }) {
  const t = useTranslations("puzzlePlay");
  const tCommon = useTranslations("common");
  const finishedAt = usePuzzleStore((s) => s.finishedAt);
  const startedAt = usePuzzleStore((s) => s.startedAt);
  const moves = usePuzzleStore((s) => s.moves);
  const imageId = usePuzzleStore((s) => s.imageId);
  const reset = usePuzzleStore((s) => s.reset);

  const [best, setBest] = useState<BestRecord | null>(null);
  const [isNewBest, setIsNewBest] = useState(false);

  useEffect(() => {
    if (!finishedAt || !startedAt || !imageId) return;
    const result = saveBest(imageId, {
      moves,
      durationMs: finishedAt - startedAt,
    });
    setBest(result.record);
    setIsNewBest(result.isNewBest);
  }, [finishedAt, startedAt, moves, imageId]);

  if (!finishedAt || !startedAt) return null;

  const duration = finishedAt - startedAt;

  return (
    <div
      role="dialog"
      aria-modal
      aria-labelledby="win-modal-title"
      className="fixed inset-0 z-50 grid place-items-center bg-fg/40 backdrop-blur-sm px-4"
    >
      <Card className="w-full max-w-sm p-6 flex flex-col gap-4 bg-surface">
        <p className="font-mono text-mono uppercase text-fg-muted">
          WELL DONE
        </p>
        <h2 id="win-modal-title" className="font-sans text-h3">
          {t("won")}
        </h2>
        <p className="font-sans text-body text-fg-muted">
          {t("wonDesc", { moves, time: formatTime(duration) })}
        </p>
        {best && (
          <p className="font-mono text-mono uppercase text-fg-muted">
            BEST · {best.moves} · {formatTime(best.durationMs)}
            {isNewBest && " · NEW"}
          </p>
        )}
        <div className="flex gap-2 mt-2">
          <Button onClick={reset}>{tCommon("reset")}</Button>
          <Link
            href={`/browse/${puzzleType}`}
            className={buttonClass({ variant: "outlined" })}
          >
            {t("toList")}
          </Link>
        </div>
      </Card>
    </div>
  );
}
