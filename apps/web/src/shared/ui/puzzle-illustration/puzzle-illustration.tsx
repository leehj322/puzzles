import { FruitBoxIllustration } from "./fruit-box";
import { Game2048Illustration } from "./game-2048";
import { LightsOutIllustration } from "./lights-out";
import { MemoryIllustration } from "./memory";
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
  "fruit-box": "bg-lilac",
  memory: "bg-accent-soft",
  "lights-out": "bg-fg/10",
};

const ILLUSTRATIONS: Record<PuzzleTypeId, () => React.ReactElement> = {
  sliding: SlidingIllustration,
  sudoku: SudokuIllustration,
  "2048": Game2048Illustration,
  nonogram: NonogramIllustration,
  minesweeper: MinesweeperIllustration,
  "fruit-box": FruitBoxIllustration,
  memory: MemoryIllustration,
  "lights-out": LightsOutIllustration,
};

export function PuzzleIllustration({ typeId }: { typeId: PuzzleTypeId }) {
  const Component = ILLUSTRATIONS[typeId];
  return <Component />;
}
