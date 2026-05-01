"use client";

import { useTranslations } from "next-intl";

import { formatTime } from "@puzzles/core";

import { Button } from "@/shared/ui/button";

import { useSudokuTimer } from "../lib/use-timer";
import { useSudokuStore } from "../model/sudoku-store";

export function SudokuHud({ difficulty }: { difficulty: string }) {
  const t = useTranslations("puzzlePlay");
  const tCommon = useTranslations("common");
  const tSudoku = useTranslations("sudoku");
  const reset = useSudokuStore((s) => s.reset);
  const elapsed = useSudokuTimer();

  return (
    <div className="w-full max-w-[min(92vw,480px)] flex items-end justify-between gap-4">
      <div className="flex gap-8">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-mono uppercase text-fg-muted">
            {tSudoku("difficultyLabel")}
          </span>
          <span className="font-display text-h4">
            {tSudoku(`difficulty.${difficulty}`)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-mono uppercase text-fg-muted">
            {t("time")}
          </span>
          <span className="font-mono text-h4 tabular-nums">
            {formatTime(elapsed)}
          </span>
        </div>
      </div>
      <Button variant="outlined" size="sm" onClick={reset}>
        {tCommon("reset")}
      </Button>
    </div>
  );
}
