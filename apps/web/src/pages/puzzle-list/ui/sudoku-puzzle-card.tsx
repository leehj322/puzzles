import { useTranslations } from "next-intl";

import { type SudokuPuzzle } from "@puzzles/core";

import { Link } from "@/shared/i18n/navigation";
import { Badge, type BadgeProps } from "@/shared/ui/badge";

const DIFFICULTY_TONE: Record<SudokuPuzzle["difficulty"], BadgeProps["tone"]> =
  {
    easy: "mint",
    medium: "sky",
    hard: "peach",
    expert: "rose",
  };

export function SudokuPuzzleCard({ puzzle }: { puzzle: SudokuPuzzle }) {
  const t = useTranslations("sudoku");

  return (
    <Link
      href={`/play/sudoku/${puzzle.id}`}
      className="group block focus-visible:outline-none"
    >
      <div className="bg-surface border border-border rounded-card shadow-sm overflow-hidden transition-[transform,box-shadow] duration-200 ease-(--ease-bounce) motion-reduce:transition-none group-hover:scale-[1.02] group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:border-border-strong motion-reduce:group-hover:scale-100 motion-reduce:group-hover:translate-y-0">
        <div className="relative aspect-square bg-surface-warm p-4">
          <SudokuMiniBoard givens={puzzle.givens} />
          <span className="absolute right-3 top-3">
            <Badge tone={DIFFICULTY_TONE[puzzle.difficulty]}>
              {t(`difficulty.${puzzle.difficulty}`)}
            </Badge>
          </span>
        </div>
      </div>
    </Link>
  );
}

function SudokuMiniBoard({
  givens,
}: {
  givens: readonly (readonly number[])[];
}) {
  return (
    <div className="grid h-full w-full grid-cols-9 grid-rows-9 overflow-hidden rounded-tile border-2 border-border-strong bg-bg">
      {givens.flatMap((row, r) =>
        row.map((value, c) => {
          const thickRight = c === 2 || c === 5;
          const thickBottom = r === 2 || r === 5;
          return (
            <div
              key={`${r}-${c}`}
              className={[
                "flex items-center justify-center font-sans text-tag font-semibold leading-none",
                "border-r border-b border-border",
                thickRight ? "border-r-2 border-r-border-strong" : "",
                thickBottom ? "border-b-2 border-b-border-strong" : "",
                c === 8 ? "border-r-0" : "",
                r === 8 ? "border-b-0" : "",
              ].join(" ")}
            >
              {value === 0 ? "" : value}
            </div>
          );
        }),
      )}
    </div>
  );
}
