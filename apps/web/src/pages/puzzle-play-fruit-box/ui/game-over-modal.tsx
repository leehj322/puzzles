"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/shared/i18n/navigation";
import { Button, buttonClass } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

import { useFruitBoxStore } from "../model/fruit-box-store";

export function FruitBoxGameOverModal() {
  const t = useTranslations("fruitBox");
  const tPlay = useTranslations("puzzlePlay");
  const gameOver = useFruitBoxStore((s) => s.gameOver);
  const score = useFruitBoxStore((s) => s.score);
  const best = useFruitBoxStore((s) => s.best);
  const newGame = useFruitBoxStore((s) => s.newGame);

  if (!gameOver) return null;

  return (
    <div
      role="dialog"
      aria-modal
      aria-labelledby="fruit-box-over-title"
      className="fixed inset-0 z-50 grid place-items-center bg-fg/40 backdrop-blur-sm px-4"
    >
      <Card className="w-full max-w-sm p-6 flex flex-col gap-4 bg-surface">
        <h2 id="fruit-box-over-title" className="font-sans text-h3">
          {t("gameOver")}
        </h2>
        <p className="font-sans text-body text-fg-muted">
          {t("gameOverDesc", { score })}
        </p>
        <p className="font-mono text-small text-fg-muted">
          {t("best")}: {best}
        </p>
        <div className="mt-2 flex gap-2">
          <Button onClick={newGame}>{t("newGame")}</Button>
          <Link href="/browse" className={buttonClass({ variant: "outlined" })}>
            {tPlay("toList")}
          </Link>
        </div>
      </Card>
    </div>
  );
}
