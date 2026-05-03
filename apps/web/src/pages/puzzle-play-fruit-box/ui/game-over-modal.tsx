"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Link } from "@/shared/i18n/navigation";
import { Button, buttonClass } from "@/shared/ui/button";
import { Modal } from "@/shared/ui/modal";

import { useFruitBoxStore } from "../model/fruit-box-store";

export function FruitBoxGameOverModal() {
  const t = useTranslations("fruitBox");
  const tPlay = useTranslations("puzzlePlay");
  const tCommon = useTranslations("common");
  const gameOver = useFruitBoxStore((s) => s.gameOver);
  const score = useFruitBoxStore((s) => s.score);
  const best = useFruitBoxStore((s) => s.best);
  const newGame = useFruitBoxStore((s) => s.newGame);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!gameOver) setDismissed(false);
  }, [gameOver]);

  return (
    <Modal
      open={gameOver && !dismissed}
      onClose={() => setDismissed(true)}
      labelledBy="fruit-box-over-title"
      closeLabel={tCommon("close")}
    >
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
    </Modal>
  );
}
