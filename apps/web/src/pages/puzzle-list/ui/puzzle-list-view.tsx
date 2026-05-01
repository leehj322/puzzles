import { useTranslations } from "next-intl";

import { notFound } from "next/navigation";

import {
  getNonogramPuzzles,
  getPuzzleImages,
  getSudokuPuzzles,
} from "@puzzles/core";

import { AddPuzzleButton } from "./add-puzzle-button";
import { NonogramPuzzleCard } from "./nonogram-puzzle-card";
import { PuzzleImageCard } from "./puzzle-image-card";
import { SudokuPuzzleCard } from "./sudoku-puzzle-card";

export function PuzzleListView({ puzzleType }: { puzzleType: string }) {
  const t = useTranslations("puzzleList");

  if (puzzleType === "sudoku") {
    const puzzles = getSudokuPuzzles();
    return (
      <main className="px-6 pt-6 pb-12 sm:pt-8 sm:pb-16">
        <div className="mx-auto max-w-4xl flex flex-col gap-10">
          <header className="flex items-center justify-between gap-4">
            <h1 className="font-display text-h2 font-semibold">{t("title")}</h1>
            <AddPuzzleButton />
          </header>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {puzzles.map((puzzle) => (
              <li key={puzzle.id}>
                <SudokuPuzzleCard puzzle={puzzle} />
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
  }

  if (puzzleType === "nonogram") {
    const puzzles = getNonogramPuzzles();
    return (
      <main className="px-6 pt-6 pb-12 sm:pt-8 sm:pb-16">
        <div className="mx-auto max-w-4xl flex flex-col gap-10">
          <header className="flex items-center justify-between gap-4">
            <h1 className="font-display text-h2 font-semibold">{t("title")}</h1>
            <AddPuzzleButton />
          </header>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {puzzles.map((puzzle) => (
              <li key={puzzle.id}>
                <NonogramPuzzleCard puzzle={puzzle} />
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
  }

  const images = getPuzzleImages(puzzleType);
  if (!images) {
    notFound();
  }

  return (
    <main className="px-6 pt-6 pb-12 sm:pt-8 sm:pb-16">
      <div className="mx-auto max-w-4xl flex flex-col gap-10">
        <header className="flex items-center justify-between gap-4">
          <h1 className="font-display text-h2 font-semibold">{t("title")}</h1>
          <AddPuzzleButton />
        </header>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <li key={image.id}>
              <PuzzleImageCard puzzleType={puzzleType} image={image} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
