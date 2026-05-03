"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/shared/ui/button";

import { useCountdown } from "../lib/use-countdown";
import { useFruitBoxStore } from "../model/fruit-box-store";

const formatCountdown = (ms: number): string => {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
};

export function FruitBoxHud() {
  const t = useTranslations("fruitBox");
  const score = useFruitBoxStore((s) => s.score);
  const best = useFruitBoxStore((s) => s.best);
  const newGame = useFruitBoxStore((s) => s.newGame);
  const remaining = useCountdown();

  return (
    <div className="flex w-full max-w-[min(96vw,820px)] items-end justify-between gap-4">
      <div className="flex gap-6 sm:gap-8">
        <Stat label={t("time")} value={formatCountdown(remaining)} />
        <Stat label={t("score")} value={String(score)} />
        <Stat label={t("best")} value={String(best)} />
      </div>
      <Button variant="outlined" size="sm" onClick={newGame}>
        {t("newGame")}
      </Button>
    </div>
  );
}

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
