export type PuzzleTypeId = "sliding-15" | "sudoku" | "nonogram" | "minesweeper";

export type PuzzleType = {
  id: PuzzleTypeId;
  nameKey: string;
  descKey: string;
  available: boolean;
};

export const PUZZLE_TYPES: readonly PuzzleType[] = [
  {
    id: "sliding-15",
    nameKey: "puzzleTypes.sliding15.name",
    descKey: "puzzleTypes.sliding15.desc",
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
