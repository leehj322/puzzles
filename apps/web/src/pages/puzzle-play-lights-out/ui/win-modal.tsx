"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Link } from "@/shared/i18n/navigation";
import { Button, buttonClass } from "@/shared/ui/button";
import { Modal } from "@/shared/ui/modal";

import { useLightsOutStore } from "../model/lights-out-store";

export function LightsOutWinModal() {
  const t = useTranslations("lightsOut");
  const tPlay = useTranslations("puzzlePlay");
  const tCommon = useTranslations("common");
  const solved = useLightsOutStore((s) => s.solved);
  const moves = useLightsOutStore((s) => s.moves);
  const newGame = useLightsOutStore((s) => s.newGame);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!solved) setDismissed(false);
  }, [solved]);

  return (
    <Modal
      open={solved && !dismissed}
      onClose={() => setDismissed(true)}
      labelledBy="lights-out-win-title"
      closeLabel={tCommon("close")}
    >
      <h2 id="lights-out-win-title" className="font-sans text-h3">
        {tPlay("won")}
      </h2>
      <p className="font-sans text-body text-fg-muted">
        {t("wonDesc", { moves })}
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
