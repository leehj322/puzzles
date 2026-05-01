"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/shared/i18n/navigation";
import { Button, buttonClass } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

import { useLightsOutStore } from "../model/lights-out-store";

export function LightsOutWinModal() {
  const t = useTranslations("lightsOut");
  const tPlay = useTranslations("puzzlePlay");
  const solved = useLightsOutStore((s) => s.solved);
  const moves = useLightsOutStore((s) => s.moves);
  const newGame = useLightsOutStore((s) => s.newGame);

  if (!solved) return null;

  return (
    <div
      role="dialog"
      aria-modal
      aria-labelledby="lights-out-win-title"
      className="fixed inset-0 z-50 grid place-items-center bg-fg/40 backdrop-blur-sm px-4"
    >
      <Card className="w-full max-w-sm p-6 flex flex-col gap-4 bg-surface">
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
      </Card>
    </div>
  );
}
