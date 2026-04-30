export type PuzzleTypeId = "sliding-15" | "jigsaw" | "sudoku" | "memory";

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
    id: "jigsaw",
    nameKey: "puzzleTypes.jigsaw.name",
    descKey: "puzzleTypes.jigsaw.desc",
    available: false,
  },
  {
    id: "sudoku",
    nameKey: "puzzleTypes.sudoku.name",
    descKey: "puzzleTypes.sudoku.desc",
    available: false,
  },
  {
    id: "memory",
    nameKey: "puzzleTypes.memory.name",
    descKey: "puzzleTypes.memory.desc",
    available: false,
  },
] as const;
