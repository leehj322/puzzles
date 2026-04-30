import { notFound } from "next/navigation";

import { getPuzzleImage, getSudokuPuzzle } from "@puzzles/core";

import { PuzzlePlayClient } from "./puzzle-play-client";
import { SudokuComingSoon } from "./sudoku-coming-soon";

export function PuzzlePlayView({
  puzzleType,
  imageId,
}: {
  puzzleType: string;
  imageId: string;
}) {
  if (puzzleType === "sudoku") {
    const puzzle = getSudokuPuzzle(imageId);
    if (!puzzle) {
      notFound();
    }
    return <SudokuComingSoon puzzle={puzzle} />;
  }

  const image = getPuzzleImage(puzzleType, imageId);
  if (!image) {
    notFound();
  }

  return <PuzzlePlayClient puzzleType={puzzleType} image={image} />;
}
