"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Link } from "@/shared/i18n/navigation";
import { Button, buttonClass } from "@/shared/ui/button";
import { Modal } from "@/shared/ui/modal";

import { useGame2048Store } from "../model/game-2048-store";

export function Game2048OverModal() {
  const t = useTranslations("game2048");
  const tPlay = useTranslations("puzzlePlay");
  const tCommon = useTranslations("common");
  const gameOver = useGame2048Store((s) => s.gameOver);
  const score = useGame2048Store((s) => s.state.score);
  const reset = useGame2048Store((s) => s.reset);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!gameOver) setDismissed(false);
  }, [gameOver]);

  return (
    <Modal
      open={gameOver && !dismissed}
      onClose={() => setDismissed(true)}
      labelledBy="game-2048-over-title"
      closeLabel={tCommon("close")}
    >
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
    </Modal>
  );
}
