/*
 * Sliding puzzle pure logic, size-agnostic (3x3 .. NxN).
 *
 * Board representation: an immutable record of `tiles` and `size`. The
 * tiles array has length size*size; index i maps to (row, col) where
 * row = floor(i / size) and col = i % size. Each cell holds a tile
 * number (1..size*size - 1) or null (the blank cell). The solved state
 * has tiles in order with the blank at the last position.
 *
 * Solvability is guaranteed by generating shuffled boards via random
 * legal moves starting from the solved state — simpler and more reliable
 * than computing inversion parity.
 */

export type Tile = number | null;
export type Direction = "up" | "down" | "left" | "right";

export type Board = {
  readonly tiles: readonly Tile[];
  readonly size: number;
};

const DEFAULT_SHUFFLE_STEPS = 200;

const rowOf = (index: number, size: number): number => Math.floor(index / size);

const colOf = (index: number, size: number): number => index % size;

const blankIndex = (board: Board): number => {
  const idx = board.tiles.indexOf(null);
  if (idx === -1) {
    throw new Error("invariant: board has no blank tile");
  }
  return idx;
};

const areAdjacent = (a: number, b: number, size: number): boolean => {
  const ar = rowOf(a, size);
  const ac = colOf(a, size);
  const br = rowOf(b, size);
  const bc = colOf(b, size);
  return Math.abs(ar - br) + Math.abs(ac - bc) === 1;
};

const swap = (board: Board, i: number, j: number): Board => {
  const next = board.tiles.slice();
  [next[i], next[j]] = [next[j], next[i]];
  return { tiles: next, size: board.size };
};

/** Returns the solved board for the given size (3..N). */
export const solvedBoard = (size: number): Board => {
  if (!Number.isInteger(size) || size < 2) {
    throw new Error(`invalid board size: ${size}`);
  }
  const count = size * size;
  const tiles: Tile[] = new Array(count);
  for (let i = 0; i < count - 1; i++) tiles[i] = i + 1;
  tiles[count - 1] = null;
  return { tiles, size };
};

/** Returns true if the board is in the solved configuration. */
export const isSolved = (board: Board): boolean => {
  const { tiles, size } = board;
  const count = size * size;
  if (tiles.length !== count) return false;
  for (let i = 0; i < count - 1; i++) {
    if (tiles[i] !== i + 1) return false;
  }
  return tiles[count - 1] === null;
};

/**
 * Returns a new board with the tile at `tileIndex` swapped with the blank,
 * or `null` if the move is not legal (the tile is not adjacent to the blank).
 */
export const move = (board: Board, tileIndex: number): Board | null => {
  const count = board.size * board.size;
  if (tileIndex < 0 || tileIndex >= count) return null;
  if (board.tiles[tileIndex] === null) return null;
  const blank = blankIndex(board);
  if (!areAdjacent(tileIndex, blank, board.size)) return null;
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
  const { size } = board;
  const blank = blankIndex(board);
  const r = rowOf(blank, size);
  const c = colOf(blank, size);

  let tileIndex: number;
  switch (direction) {
    case "up":
      if (r === size - 1) return null;
      tileIndex = blank + size;
      break;
    case "down":
      if (r === 0) return null;
      tileIndex = blank - size;
      break;
    case "left":
      if (c === size - 1) return null;
      tileIndex = blank + 1;
      break;
    case "right":
      if (c === 0) return null;
      tileIndex = blank - 1;
      break;
  }
  return swap(board, tileIndex, blank);
};

const neighborsOf = (index: number, size: number): number[] => {
  const r = rowOf(index, size);
  const c = colOf(index, size);
  const out: number[] = [];
  if (r > 0) out.push(index - size);
  if (r < size - 1) out.push(index + size);
  if (c > 0) out.push(index - 1);
  if (c < size - 1) out.push(index + 1);
  return out;
};

/**
 * Returns a board produced by performing `steps` random legal moves from
 * the solved state. The result is always solvable. Avoids immediately
 * undoing the previous move so the board doesn't trivially return near
 * solved.
 */
export const shuffleSolvable = (
  size: number,
  steps: number = DEFAULT_SHUFFLE_STEPS,
): Board => {
  let board = solvedBoard(size);
  let blank = blankIndex(board);
  let prevBlank = -1;

  for (let i = 0; i < steps; i++) {
    const candidates = neighborsOf(blank, size).filter((n) => n !== prevBlank);
    const tileIndex = candidates[Math.floor(Math.random() * candidates.length)];
    board = swap(board, blank, tileIndex);
    prevBlank = blank;
    blank = tileIndex;
  }

  // Defensive: extremely unlikely, but if random walk lands back on solved,
  // do one more step to ensure the player has something to solve.
  if (isSolved(board)) {
    const candidates = neighborsOf(blank, size).filter((n) => n !== prevBlank);
    const tileIndex = candidates[0];
    board = swap(board, blank, tileIndex);
  }

  return board;
};

/**
 * Returns the CSS background-position for the given tile number on a board
 * of the given size, assuming the tile renders the original image with
 * `background-size: ${size*100}% ${size*100}%`. Tile numbers are
 * 1..size*size - 1. Tile N occupies the (row, col) the solved board places
 * it at, so the image slice matches.
 */
export const tileBackgroundPosition = (
  tileNumber: number,
  size: number,
): { x: string; y: string } => {
  const solvedIndex = tileNumber - 1;
  const row = rowOf(solvedIndex, size);
  const col = colOf(solvedIndex, size);
  // With `size` cells per axis, each step is 100/(size-1)%
  const step = 100 / (size - 1);
  return {
    x: `${col * step}%`,
    y: `${row * step}%`,
  };
};
