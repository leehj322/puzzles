import { useTranslations } from "next-intl";

import { notFound } from "next/navigation";

import {
  getNonogramPuzzles,
  getPuzzleImages,
  getSudokuPuzzles,
  type PuzzleTypeId,
} from "@puzzles/core";

import { AddPuzzleButton } from "./add-puzzle-button";
import { NonogramPuzzleCard } from "./nonogram-puzzle-card";
import { PuzzleImageCard } from "./puzzle-image-card";
import { SudokuPuzzleCard } from "./sudoku-puzzle-card";

const renderCards = (puzzleType: PuzzleTypeId) => {
  switch (puzzleType) {
    case "sudoku":
      return getSudokuPuzzles().map((puzzle) => (
        <li key={puzzle.id}>
          <SudokuPuzzleCard puzzle={puzzle} />
        </li>
      ));
    case "nonogram":
      return getNonogramPuzzles().map((puzzle) => (
        <li key={puzzle.id}>
          <NonogramPuzzleCard puzzle={puzzle} />
        </li>
      ));
    case "sliding": {
      const images = getPuzzleImages(puzzleType);
      if (!images) notFound();
      return images.map((image) => (
        <li key={image.id}>
          <PuzzleImageCard puzzleType={puzzleType} image={image} />
        </li>
      ));
    }
    case "2048":
    case "lights-out":
    case "minesweeper":
    case "word-search":
    case "memory":
      // Route guards redirect single-instance puzzles (2048, lights-out)
      // and block unavailable types before reaching here.
      notFound();
  }
};

export function PuzzleListView({ puzzleType }: { puzzleType: PuzzleTypeId }) {
  const t = useTranslations("puzzleList");

  return (
    <main className="px-6 pt-6 pb-12 sm:pt-8 sm:pb-16">
      <div className="mx-auto max-w-4xl flex flex-col gap-10">
        <header className="flex items-center justify-between gap-4">
          <h1 className="font-display text-h2 font-semibold">{t("title")}</h1>
          <AddPuzzleButton />
        </header>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {renderCards(puzzleType)}
        </ul>
      </div>
    </main>
  );
}
