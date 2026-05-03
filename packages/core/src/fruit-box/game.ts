/*
 * Fruit Box (사과게임) pure logic.
 *
 * The board is a fixed `rows × cols` grid of apples, each holding a value
 * 1..9. The player drags a rectangle; if the sum of the still-present
 * apples inside the rectangle is exactly `TARGET_SUM` (10), those apples
 * are cleared and the score increases by the count cleared. The goal is
 * to clear as many apples as possible within the time limit.
 *
 * Cells are stored as a flat row-major array. `value === 0` means the
 * cell has been cleared (so it contributes nothing to future sums).
 */

export const FRUIT_BOX_ROWS = 10;
export const FRUIT_BOX_COLS = 17;
export const FRUIT_BOX_DURATION_MS = 120_000;
export const TARGET_SUM = 10;

export type FruitBoxBoard = {
  readonly cells: readonly number[];
  readonly rows: number;
  readonly cols: number;
};

export type FruitBoxRect = {
  readonly r1: number;
  readonly c1: number;
  readonly r2: number;
  readonly c2: number;
};

const indexOf = (row: number, col: number, cols: number): number =>
  row * cols + col;

const inBounds = (
  row: number,
  col: number,
  rows: number,
  cols: number,
): boolean => row >= 0 && row < rows && col >= 0 && col < cols;

/** Normalize a rectangle so r1 ≤ r2 and c1 ≤ c2. */
export const normalizeRect = (rect: FruitBoxRect): FruitBoxRect => ({
  r1: Math.min(rect.r1, rect.r2),
  r2: Math.max(rect.r1, rect.r2),
  c1: Math.min(rect.c1, rect.c2),
  c2: Math.max(rect.c1, rect.c2),
});

export const createEmptyFruitBoxBoard = (
  rows: number = FRUIT_BOX_ROWS,
  cols: number = FRUIT_BOX_COLS,
): FruitBoxBoard => {
  if (!Number.isInteger(rows) || rows < 1) {
    throw new Error(`invalid fruit-box rows: ${rows}`);
  }
  if (!Number.isInteger(cols) || cols < 1) {
    throw new Error(`invalid fruit-box cols: ${cols}`);
  }
  return { cells: new Array<number>(rows * cols).fill(0), rows, cols };
};

/**
 * Generates a board of values in 1..9. The original game does not
 * guarantee a fully clearable board; random distribution is what makes
 * each run fresh.
 */
export const createFruitBoxBoard = (
  rows: number = FRUIT_BOX_ROWS,
  cols: number = FRUIT_BOX_COLS,
  random: () => number = Math.random,
): FruitBoxBoard => {
  if (!Number.isInteger(rows) || rows < 1) {
    throw new Error(`invalid fruit-box rows: ${rows}`);
  }
  if (!Number.isInteger(cols) || cols < 1) {
    throw new Error(`invalid fruit-box cols: ${cols}`);
  }
  const cells = new Array<number>(rows * cols);
  for (let i = 0; i < cells.length; i++) {
    cells[i] = 1 + Math.floor(random() * 9);
  }
  return { cells, rows, cols };
};

/** Sum of non-cleared apples inside the rectangle. */
export const sumRect = (board: FruitBoxBoard, rect: FruitBoxRect): number => {
  const { rows, cols, cells } = board;
  const { r1, r2, c1, c2 } = normalizeRect(rect);
  if (!inBounds(r1, c1, rows, cols) || !inBounds(r2, c2, rows, cols)) {
    return 0;
  }
  let sum = 0;
  for (let r = r1; r <= r2; r++) {
    for (let c = c1; c <= c2; c++) {
      sum += cells[indexOf(r, c, cols)]!;
    }
  }
  return sum;
};

/** Count of non-cleared apples inside the rectangle. */
export const countRect = (
  board: FruitBoxBoard,
  rect: FruitBoxRect,
): number => {
  const { rows, cols, cells } = board;
  const { r1, r2, c1, c2 } = normalizeRect(rect);
  if (!inBounds(r1, c1, rows, cols) || !inBounds(r2, c2, rows, cols)) {
    return 0;
  }
  let n = 0;
  for (let r = r1; r <= r2; r++) {
    for (let c = c1; c <= c2; c++) {
      if (cells[indexOf(r, c, cols)]! > 0) n += 1;
    }
  }
  return n;
};

/**
 * If the rectangle's sum equals `TARGET_SUM`, returns a new board with
 * those apples cleared and the gained count. Otherwise returns the same
 * board with `gained: 0`.
 */
export const applySelection = (
  board: FruitBoxBoard,
  rect: FruitBoxRect,
): { board: FruitBoxBoard; gained: number } => {
  if (sumRect(board, rect) !== TARGET_SUM) {
    return { board, gained: 0 };
  }

  const { rows, cols, cells } = board;
  const { r1, r2, c1, c2 } = normalizeRect(rect);
  const next = cells.slice();
  let gained = 0;
  for (let r = r1; r <= r2; r++) {
    for (let c = c1; c <= c2; c++) {
      const i = indexOf(r, c, cols);
      if (next[i]! > 0) {
        next[i] = 0;
        gained += 1;
      }
    }
  }
  return { board: { cells: next, rows, cols }, gained };
};
