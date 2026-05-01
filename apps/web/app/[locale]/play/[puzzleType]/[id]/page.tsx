import { setRequestLocale } from "next-intl/server";

import { notFound } from "next/navigation";

import {
  getNonogramPuzzle,
  getPuzzleImage,
  getPuzzleType,
  getSudokuPuzzle,
  type PuzzleType,
} from "@puzzles/core";

import { NonogramPlayView } from "@/pages/puzzle-play-nonogram";
import { SlidingPlayView } from "@/pages/puzzle-play-sliding";
import { SudokuPlayView } from "@/pages/puzzle-play-sudoku";

const renderEntry = (type: PuzzleType, id: string) => {
  switch (type.id) {
    case "sliding": {
      const image = getPuzzleImage(type.id, id);
      if (!image) notFound();
      return <SlidingPlayView image={image} />;
    }
    case "sudoku": {
      const puzzle = getSudokuPuzzle(id);
      if (!puzzle) notFound();
      return <SudokuPlayView puzzle={puzzle} />;
    }
    case "nonogram": {
      const puzzle = getNonogramPuzzle(id);
      if (!puzzle) notFound();
      return <NonogramPlayView puzzle={puzzle} />;
    }
    case "2048":
    case "minesweeper":
      // hasEntries === false → blocked by the guard above.
      // minesweeper has no entry UI yet. Exhaustive branch for type safety.
      notFound();
  }
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; puzzleType: string; id: string }>;
}) {
  const { locale, puzzleType, id } = await params;
  setRequestLocale(locale);

  const type = getPuzzleType(puzzleType);
  if (!type || !type.hasEntries) notFound();

  return renderEntry(type, id);
}
