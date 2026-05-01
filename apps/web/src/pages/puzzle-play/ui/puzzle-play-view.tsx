import { notFound } from "next/navigation";

import {
  getNonogramPuzzle,
  getPuzzleImage,
  getSudokuPuzzle,
} from "@puzzles/core";

import { Game2048PlayClient } from "./game-2048-play-client";
import { NonogramPlayClient } from "./nonogram-play-client";
import { PuzzlePlayClient } from "./puzzle-play-client";
import { SudokuPlayClient } from "./sudoku-play-client";

export function PuzzlePlayView({
  puzzleType,
  imageId,
}: {
  puzzleType: string;
  imageId?: string;
}) {
  if (puzzleType === "2048") {
    return <Game2048PlayClient />;
  }

  if (!imageId) {
    notFound();
  }

  if (puzzleType === "sudoku") {
    const puzzle = getSudokuPuzzle(imageId);
    if (!puzzle) {
      notFound();
    }
    return <SudokuPlayClient puzzle={puzzle} />;
  }

  if (puzzleType === "nonogram") {
    const puzzle = getNonogramPuzzle(imageId);
    if (!puzzle) {
      notFound();
    }
    return <NonogramPlayClient puzzle={puzzle} />;
  }

  const image = getPuzzleImage(puzzleType, imageId);
  if (!image) {
    notFound();
  }

  return <PuzzlePlayClient puzzleType={puzzleType} image={image} />;
}
