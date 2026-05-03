export type PuzzleTypeId =
  | "sliding"
  | "sudoku"
  | "2048"
  | "nonogram"
  | "minesweeper"
  | "fruit-box"
  | "memory"
  | "lights-out";

export type PuzzleType = {
  id: PuzzleTypeId;
  nameKey: string;
  descKey: string;
  available: boolean;
  /**
   * Whether this puzzle type has per-entry pages under
   * `/browse/[type]/[id]` and `/play/[type]/[id]`.
   * `false` for single-instance games like 2048 that route directly to
   * `/play/[type]`.
   */
  hasEntries: boolean;
};

export const PUZZLE_TYPES: readonly PuzzleType[] = [
  {
    id: "sliding",
    nameKey: "puzzleTypes.sliding.name",
    descKey: "puzzleTypes.sliding.desc",
    available: true,
    hasEntries: true,
  },
  {
    id: "sudoku",
    nameKey: "puzzleTypes.sudoku.name",
    descKey: "puzzleTypes.sudoku.desc",
    available: true,
    hasEntries: true,
  },
  {
    id: "2048",
    nameKey: "puzzleTypes.2048.name",
    descKey: "puzzleTypes.2048.desc",
    available: true,
    hasEntries: false,
  },
  {
    id: "nonogram",
    nameKey: "puzzleTypes.nonogram.name",
    descKey: "puzzleTypes.nonogram.desc",
    available: true,
    hasEntries: true,
  },
  {
    id: "minesweeper",
    nameKey: "puzzleTypes.minesweeper.name",
    descKey: "puzzleTypes.minesweeper.desc",
    available: false,
    hasEntries: true,
  },
  {
    id: "fruit-box",
    nameKey: "puzzleTypes.fruit-box.name",
    descKey: "puzzleTypes.fruit-box.desc",
    available: true,
    hasEntries: false,
  },
  {
    id: "memory",
    nameKey: "puzzleTypes.memory.name",
    descKey: "puzzleTypes.memory.desc",
    available: false,
    hasEntries: true,
  },
  {
    id: "lights-out",
    nameKey: "puzzleTypes.lights-out.name",
    descKey: "puzzleTypes.lights-out.desc",
    available: true,
    hasEntries: false,
  },
] as const;

const PUZZLE_TYPE_MAP: Record<PuzzleTypeId, PuzzleType> = Object.fromEntries(
  PUZZLE_TYPES.map((t) => [t.id, t]),
) as Record<PuzzleTypeId, PuzzleType>;

export const isPuzzleTypeId = (id: string): id is PuzzleTypeId =>
  id in PUZZLE_TYPE_MAP;

/**
 * Returns the puzzle type meta if the id is known AND publicly available.
 * Returns `null` for unknown ids or types flagged `available: false`, so
 * route guards can treat both cases as 404.
 */
export const getPuzzleType = (id: string): PuzzleType | null => {
  if (!isPuzzleTypeId(id)) return null;
  const type = PUZZLE_TYPE_MAP[id];
  return type.available ? type : null;
};
