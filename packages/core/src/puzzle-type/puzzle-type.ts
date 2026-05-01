export type PuzzleTypeId =
  | "sliding"
  | "sudoku"
  | "2048"
  | "nonogram"
  | "minesweeper";

export type PuzzleType = {
  id: PuzzleTypeId;
  nameKey: string;
  descKey: string;
  available: boolean;
};

export const PUZZLE_TYPES: readonly PuzzleType[] = [
  {
    id: "sliding",
    nameKey: "puzzleTypes.sliding.name",
    descKey: "puzzleTypes.sliding.desc",
    available: true,
  },
  {
    id: "sudoku",
    nameKey: "puzzleTypes.sudoku.name",
    descKey: "puzzleTypes.sudoku.desc",
    available: true,
  },
  {
    id: "2048",
    nameKey: "puzzleTypes.2048.name",
    descKey: "puzzleTypes.2048.desc",
    available: true,
  },
  {
    id: "nonogram",
    nameKey: "puzzleTypes.nonogram.name",
    descKey: "puzzleTypes.nonogram.desc",
    available: true,
  },
  {
    id: "minesweeper",
    nameKey: "puzzleTypes.minesweeper.name",
    descKey: "puzzleTypes.minesweeper.desc",
    available: false,
  },
] as const;
