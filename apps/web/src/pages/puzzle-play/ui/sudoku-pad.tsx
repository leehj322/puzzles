"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { cn } from "@/shared/lib/cn";

import { useSudokuStore } from "../model/sudoku-store";

export function SudokuPad() {
  const t = useTranslations("sudoku.pad");
  const enterDigit = useSudokuStore((s) => s.enterDigit);
  const clearCell = useSudokuStore((s) => s.clearCell);
  const noteMode = useSudokuStore((s) => s.noteMode);
  const toggleNoteMode = useSudokuStore((s) => s.toggleNoteMode);
  const values = useSudokuStore((s) => s.values);

  const remaining = useMemo(() => {
    const counts = new Array(10).fill(0) as number[];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const v = values[r][c];
        if (v) counts[v]++;
      }
    }
    return counts;
  }, [values]);

  return (
    <div className="flex w-full max-w-[min(92vw,480px)] flex-col gap-3">
      <div className="grid grid-cols-9 gap-1.5">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((digit) => {
          const used = remaining[digit] >= 9;
          return (
            <button
              key={digit}
              type="button"
              disabled={used}
              onClick={() => enterDigit(digit)}
              className={cn(
                "aspect-square rounded-tile border-2 border-border bg-surface font-display text-h4 font-semibold",
                "transition-[transform,background-color] duration-150 ease-(--ease-bounce)",
                "hover:bg-accent-soft hover:border-accent active:scale-95",
                "disabled:opacity-30 disabled:pointer-events-none",
              )}
            >
              {digit}
            </button>
          );
        })}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          aria-pressed={noteMode}
          onClick={toggleNoteMode}
          className={cn(
            "flex-1 h-11 rounded-button border-2 font-sans font-semibold transition-colors",
            noteMode
              ? "bg-accent text-accent-fg border-accent"
              : "bg-surface text-fg border-border hover:border-accent",
          )}
        >
          {t("notes")}
        </button>
        <button
          type="button"
          onClick={clearCell}
          className="flex-1 h-11 rounded-button border-2 border-border bg-surface font-sans font-semibold text-fg hover:border-accent hover:bg-accent-soft transition-colors"
        >
          {t("erase")}
        </button>
      </div>
    </div>
  );
}
