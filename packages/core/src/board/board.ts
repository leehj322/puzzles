/*
 * 4x4 sliding puzzle (15-puzzle) pure logic.
 *
 * Board representation: 16-length array. Indices 0..15 map to positions
 * (row, col) where row = floor(idx / 4), col = idx % 4.
 * Each cell holds a tile number (1..15) or null (the blank cell).
 * The solved state has tiles 1..15 in order with the blank at the last
 * position (index 15).
 *
 * Solvability is guaranteed by generating shuffled boards via random legal
 * moves starting from the solved state — this is simpler and more reliable
 * than computing inversion parity.
 */

export type Tile = number | null;
export type Board = readonly Tile[];
export type Direction = "up" | "down" | "left" | "right";

export const BOARD_SIZE = 4;
export const TILE_COUNT = BOARD_SIZE * BOARD_SIZE;

export const SOLVED: Board = Object.freeze([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null,
]);

const DEFAULT_SHUFFLE_STEPS = 200;

const rowOf = (index: number): number => Math.floor(index / BOARD_SIZE);

const colOf = (index: number): number => index % BOARD_SIZE;

const blankIndex = (board: Board): number => {
  const idx = board.indexOf(null);
  if (idx === -1) {
    throw new Error("invariant: board has no blank tile");
  }
  return idx;
};

const areAdjacent = (a: number, b: number): boolean => {
  const ar = rowOf(a);
  const ac = colOf(a);
  const br = rowOf(b);
  const bc = colOf(b);
  return Math.abs(ar - br) + Math.abs(ac - bc) === 1;
};

const swap = (board: Board, i: number, j: number): Board => {
  const next = board.slice();
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

/** Returns true if the board is in the solved configuration. */
export const isSolved = (board: Board): boolean => {
  if (board.length !== TILE_COUNT) return false;
  for (let i = 0; i < TILE_COUNT; i++) {
    if (board[i] !== SOLVED[i]) return false;
  }
  return true;
};

/**
 * Returns a new board with the tile at `tileIndex` swapped with the blank,
 * or `null` if the move is not legal (the tile is not adjacent to the blank).
 */
export const move = (board: Board, tileIndex: number): Board | null => {
  if (tileIndex < 0 || tileIndex >= TILE_COUNT) return null;
  if (board[tileIndex] === null) return null;
  const blank = blankIndex(board);
  if (!areAdjacent(tileIndex, blank)) return null;
  return swap(board, tileIndex, blank);
};

/**
 * Slides one tile into the blank from the given direction.
 * `direction` describes the movement of the *tile* (not the blank).
 * Returns null if the move is not legal (blank is at the edge).
 */
export const moveByDirection = (
  board: Board,
  direction: Direction,
): Board | null => {
  const blank = blankIndex(board);
  const r = rowOf(blank);
  const c = colOf(blank);

  let tileIndex: number;
  switch (direction) {
    case "up":
      if (r === BOARD_SIZE - 1) return null;
      tileIndex = blank + BOARD_SIZE;
      break;
    case "down":
      if (r === 0) return null;
      tileIndex = blank - BOARD_SIZE;
      break;
    case "left":
      if (c === BOARD_SIZE - 1) return null;
      tileIndex = blank + 1;
      break;
    case "right":
      if (c === 0) return null;
      tileIndex = blank - 1;
      break;
  }
  return swap(board, tileIndex, blank);
};

const neighborsOf = (index: number): number[] => {
  const r = rowOf(index);
  const c = colOf(index);
  const out: number[] = [];
  if (r > 0) out.push(index - BOARD_SIZE);
  if (r < BOARD_SIZE - 1) out.push(index + BOARD_SIZE);
  if (c > 0) out.push(index - 1);
  if (c < BOARD_SIZE - 1) out.push(index + 1);
  return out;
};

/**
 * Returns a board produced by performing `steps` random legal moves from
 * the solved state. The result is always solvable. Avoids immediately
 * undoing the previous move so the board doesn't trivially return near
 * solved.
 */
export const shuffleSolvable = (
  steps: number = DEFAULT_SHUFFLE_STEPS,
): Board => {
  let board: Board = SOLVED.slice();
  let blank = blankIndex(board);
  let prevBlank = -1;

  for (let i = 0; i < steps; i++) {
    const candidates = neighborsOf(blank).filter((n) => n !== prevBlank);
    const tileIndex = candidates[Math.floor(Math.random() * candidates.length)];
    board = swap(board, blank, tileIndex);
    prevBlank = blank;
    blank = tileIndex;
  }

  // Defensive: extremely unlikely, but if random walk lands back on solved,
  // do one more step to ensure the player has something to solve.
  if (isSolved(board)) {
    const candidates = neighborsOf(blank).filter((n) => n !== prevBlank);
    const tileIndex = candidates[0];
    board = swap(board, blank, tileIndex);
  }

  return board;
};

/**
 * Returns the CSS background-position for the given tile number, assuming
 * the tile renders the original image with `background-size: 400% 400%`.
 * Tile numbers are 1..15. Tile N occupies the (row, col) the solved board
 * places it at, so the image slice matches.
 */
export const tileBackgroundPosition = (
  tileNumber: number,
): { x: string; y: string } => {
  const solvedIndex = tileNumber - 1;
  const row = rowOf(solvedIndex);
  const col = colOf(solvedIndex);
  // With 4 cells per axis, each step is 100/3 = 33.333...%
  const step = 100 / (BOARD_SIZE - 1);
  return {
    x: `${col * step}%`,
    y: `${row * step}%`,
  };
};
