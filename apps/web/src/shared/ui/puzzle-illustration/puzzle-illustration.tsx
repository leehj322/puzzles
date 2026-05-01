import { Game2048Illustration } from "./game-2048";
import { MinesweeperIllustration } from "./minesweeper";
import { NonogramIllustration } from "./nonogram";
import { SlidingIllustration } from "./sliding";
import { SudokuIllustration } from "./sudoku";

import type { PuzzleTypeId } from "@puzzles/core";

export const PUZZLE_TYPE_ACCENT: Record<PuzzleTypeId, string> = {
  sliding: "bg-mint",
  sudoku: "bg-sky",
  "2048": "bg-rose",
  nonogram: "bg-peach",
  minesweeper: "bg-butter",
};

const ILLUSTRATIONS: Record<PuzzleTypeId, () => React.ReactElement> = {
  sliding: SlidingIllustration,
  sudoku: SudokuIllustration,
  "2048": Game2048Illustration,
  nonogram: NonogramIllustration,
  minesweeper: MinesweeperIllustration,
};

export function PuzzleIllustration({ typeId }: { typeId: PuzzleTypeId }) {
  const Component = ILLUSTRATIONS[typeId];
  return <Component />;
}
