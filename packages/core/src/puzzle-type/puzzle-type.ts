export type PuzzleTypeId = "sliding" | "sudoku" | "nonogram" | "minesweeper";

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
    available: false,
  },
  {
    id: "nonogram",
    nameKey: "puzzleTypes.nonogram.name",
    descKey: "puzzleTypes.nonogram.desc",
    available: false,
  },
  {
    id: "minesweeper",
    nameKey: "puzzleTypes.minesweeper.name",
    descKey: "puzzleTypes.minesweeper.desc",
    available: false,
  },
] as const;
