import { useTranslations } from "next-intl";

import { type SudokuPuzzle } from "@puzzles/core";

import { Badge } from "@/shared/ui/badge";

export function SudokuComingSoon({ puzzle }: { puzzle: SudokuPuzzle }) {
  const t = useTranslations("sudoku");

  return (
    <main className="px-4 pt-8 pb-12 sm:pt-12 sm:pb-16">
      <div className="mx-auto flex max-w-md flex-col items-center gap-5 text-center">
        <Badge tone="accent">{t(`difficulty.${puzzle.difficulty}`)}</Badge>
        <h1 className="font-display text-h2 font-semibold">
          {t("comingSoon.title")}
        </h1>
        <p className="font-sans text-body text-fg-muted">
          {t("comingSoon.desc")}
        </p>
      </div>
    </main>
  );
}
