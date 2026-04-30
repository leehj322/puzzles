"use client";

import { cn } from "@/shared/lib/cn";

import { useSudokuStore } from "../model/sudoku-store";

export function SudokuBoard() {
  const values = useSudokuStore((s) => s.values);
  const notes = useSudokuStore((s) => s.notes);
  const given = useSudokuStore((s) => s.given);
  const selected = useSudokuStore((s) => s.selected);
  const conflicts = useSudokuStore((s) => s.conflicts);
  const select = useSudokuStore((s) => s.select);

  const selectedValue =
    selected && values[selected.r][selected.c] !== 0
      ? values[selected.r][selected.c]
      : null;

  return (
    <div
      role="grid"
      aria-label="Sudoku board"
      className="grid w-full max-w-[min(92vw,480px)] aspect-square grid-cols-9 grid-rows-9 overflow-hidden rounded-card border-2 border-fg/70 bg-bg select-none"
    >
      {values.flatMap((row, r) =>
        row.map((value, c) => {
          const idx = r * 9 + c;
          const isGiven = given[r][c];
          const isSelected = selected?.r === r && selected?.c === c;
          const inSameLine =
            selected !== null && (selected.r === r || selected.c === c);
          const inSameBox =
            selected !== null &&
            Math.floor(selected.r / 3) === Math.floor(r / 3) &&
            Math.floor(selected.c / 3) === Math.floor(c / 3);
          const sameValue =
            selectedValue !== null &&
            value !== 0 &&
            value === selectedValue &&
            !isSelected;
          const isConflict = conflicts.has(idx);

          const thickRight = c === 2 || c === 5;
          const thickBottom = r === 2 || r === 5;

          return (
            <button
              key={idx}
              type="button"
              role="gridcell"
              aria-selected={isSelected}
              aria-label={`R${r + 1}C${c + 1}${value ? ` ${value}` : ""}`}
              onClick={() => select(r, c)}
              className={cn(
                "relative flex items-center justify-center font-display font-semibold leading-none",
                "border-r border-b border-border text-[clamp(16px,3.6vw,24px)]",
                "transition-colors duration-100",
                "focus:outline-none",
                thickRight && "border-r-2 border-r-fg/70",
                thickBottom && "border-b-2 border-b-fg/70",
                c === 8 && "border-r-0",
                r === 8 && "border-b-0",
                !isSelected && inSameLine && "bg-surface-warm",
                !isSelected && inSameBox && !inSameLine && "bg-surface-warm/60",
                sameValue && "bg-accent-soft",
                isSelected && "bg-accent/30",
                isGiven ? "text-fg" : "text-accent-strong",
                isConflict && "text-danger",
              )}
            >
              {value !== 0 ? (
                value
              ) : (
                <CellNotes notes={notes[r][c]} />
              )}
            </button>
          );
        }),
      )}
    </div>
  );
}

function CellNotes({ notes }: { notes: ReadonlySet<number> }) {
  if (notes.size === 0) return null;
  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-3 p-0.5 text-[clamp(7px,1.2vw,10px)] font-sans font-medium text-fg-muted">
      {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
        <span key={n} className="flex items-center justify-center leading-none">
          {notes.has(n) ? n : ""}
        </span>
      ))}
    </div>
  );
}
