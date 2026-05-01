"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/shared/ui/button";

import {
  useLightsOutStore,
  type LightsOutDifficulty,
  type LightsOutSize,
} from "../model/lights-out-store";

const SIZES: readonly LightsOutSize[] = [3, 5, 7];
const DIFFICULTIES: readonly LightsOutDifficulty[] = ["easy", "normal", "hard"];

export function LightsOutHud() {
  const t = useTranslations("lightsOut");
  const tPlay = useTranslations("puzzlePlay");

  const size = useLightsOutStore((s) => s.size);
  const difficulty = useLightsOutStore((s) => s.difficulty);
  const moves = useLightsOutStore((s) => s.moves);
  const setSize = useLightsOutStore((s) => s.setSize);
  const setDifficulty = useLightsOutStore((s) => s.setDifficulty);
  const newGame = useLightsOutStore((s) => s.newGame);

  return (
    <div className="flex w-full max-w-[min(90vw,520px)] flex-col gap-4">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-mono uppercase text-fg-muted">
            {tPlay("moves")}
          </span>
          <span className="font-mono text-h4 tabular-nums">{moves}</span>
        </div>
        <Button variant="outlined" size="sm" onClick={newGame}>
          {t("newGame")}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Selector
          label={t("sizeLabel")}
          value={size}
          options={SIZES.map((s) => ({
            value: s,
            label: `${s}×${s}`,
          }))}
          onChange={setSize}
        />
        <Selector
          label={t("difficultyLabel")}
          value={difficulty}
          options={DIFFICULTIES.map((d) => ({
            value: d,
            label: t(`difficulty.${d}`),
          }))}
          onChange={setDifficulty}
        />
      </div>
    </div>
  );
}

interface SelectorProps<T extends string | number> {
  label: string;
  value: T;
  options: ReadonlyArray<{ value: T; label: string }>;
  onChange: (value: T) => void;
}

function Selector<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: SelectorProps<T>) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-mono uppercase text-fg-muted">
        {label}
      </span>
      <div className="flex rounded-button border-2 border-border bg-surface p-1">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange(opt.value)}
              className={
                active
                  ? "rounded-icon px-3 py-1 text-small font-semibold bg-accent text-accent-fg"
                  : "rounded-icon px-3 py-1 text-small font-semibold text-fg-muted hover:bg-accent-soft hover:text-fg"
              }
              aria-pressed={active}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
