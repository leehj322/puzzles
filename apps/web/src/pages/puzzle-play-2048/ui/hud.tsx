"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/shared/ui/button";

import { useGame2048Store } from "../model/game-2048-store";

export function Game2048Hud() {
  const t = useTranslations("game2048");
  const score = useGame2048Store((s) => s.state.score);
  const reset = useGame2048Store((s) => s.reset);

  return (
    <div className="flex w-full max-w-[min(90vw,480px)] items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        <span className="font-mono text-mono uppercase text-fg-muted">
          {t("score")}
        </span>
        <span className="font-mono text-h4 tabular-nums">{score}</span>
      </div>
      <Button variant="outlined" size="sm" onClick={reset}>
        {t("restart")}
      </Button>
    </div>
  );
}
