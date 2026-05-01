"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/shared/i18n/navigation";
import { Button, buttonClass } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

import { useGame2048Store } from "../model/game-2048-store";

export function Game2048OverModal() {
  const t = useTranslations("game2048");
  const tPlay = useTranslations("puzzlePlay");
  const gameOver = useGame2048Store((s) => s.gameOver);
  const score = useGame2048Store((s) => s.state.score);
  const reset = useGame2048Store((s) => s.reset);

  if (!gameOver) return null;

  return (
    <div
      role="dialog"
      aria-modal
      aria-labelledby="game-2048-over-title"
      className="fixed inset-0 z-50 grid place-items-center bg-fg/40 backdrop-blur-sm px-4"
    >
      <Card className="w-full max-w-sm p-6 flex flex-col gap-4 bg-surface">
        <h2 id="game-2048-over-title" className="font-sans text-h3">
          {t("gameOver")}
        </h2>
        <p className="font-sans text-body text-fg-muted">
          {t("gameOverDesc", { score })}
        </p>
        <div className="mt-2 flex gap-2">
          <Button onClick={reset}>{t("restart")}</Button>
          <Link href="/browse" className={buttonClass({ variant: "outlined" })}>
            {tPlay("toList")}
          </Link>
        </div>
      </Card>
    </div>
  );
}
