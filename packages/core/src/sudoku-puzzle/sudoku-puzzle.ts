export type SudokuDifficulty = "easy" | "medium" | "hard" | "expert";

export type SudokuPuzzle = {
  id: string;
  difficulty: SudokuDifficulty;
  size: 9;
  givens: readonly (readonly number[])[];
};

const BASE: readonly number[][] = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const DIFFICULTY_BLANKS: Record<SudokuDifficulty, number> = {
  easy: 36,
  medium: 46,
  hard: 52,
  expert: 58,
};

const mulberry32 = (seed: number) => {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const buildGivens = (
  difficulty: SudokuDifficulty,
  seed: number,
): readonly (readonly number[])[] => {
  const rand = mulberry32(seed);
  const cells = Array.from({ length: 81 }, (_, i) => i);
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  const blanks = new Set(cells.slice(0, DIFFICULTY_BLANKS[difficulty]));
  return BASE.map((row, r) =>
    row.map((value, c) => (blanks.has(r * 9 + c) ? 0 : value)),
  );
};

const DIFFICULTIES: readonly SudokuDifficulty[] = [
  "easy",
  "medium",
  "hard",
  "expert",
];
const PER_DIFFICULTY = 4;

const buildSudokuPuzzles = (): readonly SudokuPuzzle[] => {
  const out: SudokuPuzzle[] = [];
  let seed = 1;
  for (const difficulty of DIFFICULTIES) {
    for (let i = 1; i <= PER_DIFFICULTY; i++) {
      out.push({
        id: `${difficulty}-${i}`,
        difficulty,
        size: 9,
        givens: buildGivens(difficulty, seed++),
      });
    }
  }
  return out;
};

const SUDOKU_PUZZLES: readonly SudokuPuzzle[] = buildSudokuPuzzles();

export const getSudokuPuzzles = (): readonly SudokuPuzzle[] => SUDOKU_PUZZLES;

export const getSudokuPuzzle = (id: string): SudokuPuzzle | null =>
  SUDOKU_PUZZLES.find((p) => p.id === id) ?? null;

export type SudokuCell = { r: number; c: number };

const boxOf = (r: number, c: number) =>
  Math.floor(r / 3) * 3 + Math.floor(c / 3);

export const findSudokuConflicts = (
  values: readonly (readonly number[])[],
): ReadonlySet<number> => {
  const conflicts = new Set<number>();
  const seen: { row: Map<number, number>[]; col: Map<number, number>[]; box: Map<number, number>[] } = {
    row: Array.from({ length: 9 }, () => new Map()),
    col: Array.from({ length: 9 }, () => new Map()),
    box: Array.from({ length: 9 }, () => new Map()),
  };
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const v = values[r][c];
      if (!v) continue;
      const idx = r * 9 + c;
      const b = boxOf(r, c);
      const groups = [
        { map: seen.row[r], v },
        { map: seen.col[c], v },
        { map: seen.box[b], v },
      ];
      for (const { map, v: val } of groups) {
        const prev = map.get(val);
        if (prev !== undefined) {
          conflicts.add(idx);
          conflicts.add(prev);
        } else {
          map.set(val, idx);
        }
      }
    }
  }
  return conflicts;
};

export const isSudokuComplete = (
  values: readonly (readonly number[])[],
): boolean => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (!values[r][c]) return false;
    }
  }
  return findSudokuConflicts(values).size === 0;
};
