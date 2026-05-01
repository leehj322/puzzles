import { PIXEL_ART, type PixelArtSpec } from "./pixel-art";

export type NonogramDifficulty = "easy" | "medium" | "hard";

export type NonogramPuzzle = {
  id: string;
  difficulty: NonogramDifficulty;
  label: string;
  rows: number;
  cols: number;
  solution: readonly (readonly boolean[])[];
};

export type NonogramHints = {
  rows: readonly (readonly number[])[];
  cols: readonly (readonly number[])[];
};

const parseArt = (art: PixelArtSpec): readonly (readonly boolean[])[] => {
  const lines = art.art.map((line) => line.replace(/\s+/g, ""));
  return lines.map((line) =>
    line.split("").map((ch) => ch === "1" || ch === "#"),
  );
};

const runsOf = (line: readonly boolean[]): readonly number[] => {
  const out: number[] = [];
  let count = 0;
  for (const v of line) {
    if (v) {
      count++;
    } else if (count > 0) {
      out.push(count);
      count = 0;
    }
  }
  if (count > 0) out.push(count);
  return out.length === 0 ? [0] : out;
};

export const computeNonogramHints = (
  solution: readonly (readonly boolean[])[],
): NonogramHints => {
  const rows = solution.length;
  const cols = rows === 0 ? 0 : solution[0].length;
  const rowHints: number[][] = [];
  for (let r = 0; r < rows; r++) {
    rowHints.push([...runsOf(solution[r])]);
  }
  const colHints: number[][] = [];
  for (let c = 0; c < cols; c++) {
    const col: boolean[] = [];
    for (let r = 0; r < rows; r++) col.push(solution[r][c]);
    colHints.push([...runsOf(col)]);
  }
  return { rows: rowHints, cols: colHints };
};

const sameRuns = (a: readonly number[], b: readonly number[]): boolean => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
};

export const isNonogramSolved = (
  filled: readonly (readonly boolean[])[],
  hints: NonogramHints,
): boolean => {
  for (let r = 0; r < filled.length; r++) {
    if (!sameRuns(runsOf(filled[r]), hints.rows[r])) return false;
  }
  const cols = filled[0]?.length ?? 0;
  for (let c = 0; c < cols; c++) {
    const col: boolean[] = [];
    for (let r = 0; r < filled.length; r++) col.push(filled[r][c]);
    if (!sameRuns(runsOf(col), hints.cols[c])) return false;
  }
  return true;
};

const buildNonogramPuzzles = (): readonly NonogramPuzzle[] => {
  const counters: Record<NonogramDifficulty, number> = {
    easy: 0,
    medium: 0,
    hard: 0,
  };
  return PIXEL_ART.map((art) => {
    const solution = parseArt(art);
    const rows = solution.length;
    const cols = solution[0].length;
    counters[art.difficulty]++;
    return {
      id: `${art.difficulty}-${cols}x${rows}-${counters[art.difficulty]}`,
      difficulty: art.difficulty,
      label: art.label,
      rows,
      cols,
      solution,
    };
  });
};

const NONOGRAM_PUZZLES: readonly NonogramPuzzle[] = buildNonogramPuzzles();

export const getNonogramPuzzles = (): readonly NonogramPuzzle[] =>
  NONOGRAM_PUZZLES;

export const getNonogramPuzzle = (id: string): NonogramPuzzle | null =>
  NONOGRAM_PUZZLES.find((p) => p.id === id) ?? null;
