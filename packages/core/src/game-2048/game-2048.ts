export type Game2048Direction = "up" | "down" | "left" | "right";

export type Game2048Board = number[][];

export type Game2048Tile = {
  /** Stable identity across moves. New tiles get fresh ids. */
  id: number;
  value: number;
  row: number;
  col: number;
  /**
   * If this tile was just created by merging two tiles, the value it had
   * BEFORE the merge (e.g. 2 if two 2s merged into a 4). Used by the UI to
   * decide whether to play a merge effect. `null` for tiles that simply slid
   * or did not move.
   */
  mergedFrom: number | null;
};

export type Game2048State = {
  tiles: Game2048Tile[];
  score: number;
  /** Monotonic id counter used to mint new tile ids. */
  nextId: number;
};

export type Game2048MoveResult = {
  state: Game2048State;
  gainedScore: number;
  moved: boolean;
};

export const GAME_2048_SIZE = 4;

const range = (n: number): number[] => Array.from({ length: n }, (_, i) => i);

export const createEmptyBoard = (): Game2048Board =>
  range(GAME_2048_SIZE).map(() => range(GAME_2048_SIZE).map(() => 0));

const tilesToBoard = (tiles: Game2048Tile[]): Game2048Board => {
  const board = createEmptyBoard();
  for (const t of tiles) {
    board[t.row]![t.col] = t.value;
  }
  return board;
};

export const boardFromState = (state: Game2048State): Game2048Board =>
  tilesToBoard(state.tiles);

const findEmptyCells = (board: Game2048Board): Array<[number, number]> => {
  const cells: Array<[number, number]> = [];
  for (let r = 0; r < GAME_2048_SIZE; r++) {
    for (let c = 0; c < GAME_2048_SIZE; c++) {
      if (board[r]![c] === 0) cells.push([r, c]);
    }
  }
  return cells;
};

/**
 * Adds one random tile (90% chance of 2, 10% chance of 4) to a random empty
 * cell. Returns the new state with a freshly minted tile id. If the board is
 * full, returns the same state.
 */
export const addRandomTile = (
  state: Game2048State,
  random: () => number = Math.random,
): Game2048State => {
  const board = boardFromState(state);
  const empties = findEmptyCells(board);
  if (empties.length === 0) return state;
  const pick = empties[Math.floor(random() * empties.length)]!;
  const value = random() < 0.9 ? 2 : 4;
  const newTile: Game2048Tile = {
    id: state.nextId,
    value,
    row: pick[0],
    col: pick[1],
    mergedFrom: null,
  };
  return {
    tiles: [...state.tiles, newTile],
    score: state.score,
    nextId: state.nextId + 1,
  };
};

export const createInitialState = (
  random: () => number = Math.random,
): Game2048State => {
  const empty: Game2048State = { tiles: [], score: 0, nextId: 0 };
  return addRandomTile(addRandomTile(empty, random), random);
};

/**
 * For one row of tiles (left-to-right, with empty cells represented by null
 * placeholders), slide everything to index 0 and merge adjacent equals once
 * each. Returns the resulting tiles with their new column indices, plus
 * gained score.
 *
 * Each input tile is preserved by id. When two tiles merge, both inputs map
 * to the same output column; the caller decides which tile becomes the
 * "absorbed" one (we keep the FIRST in slide order as the survivor with a
 * new doubled value, the SECOND is dropped from the output but its position
 * is updated to the merge target so the UI can animate it sliding in).
 */
type RowTile = Game2048Tile;

const slideRowLeft = (
  rowTiles: RowTile[],
): { survivors: RowTile[]; absorbed: RowTile[]; gained: number } => {
  // rowTiles is given in left-to-right order, no empties.
  const survivors: RowTile[] = [];
  const absorbed: RowTile[] = [];
  let gained = 0;
  let writeCol = 0;
  let i = 0;
  while (i < rowTiles.length) {
    const a = rowTiles[i]!;
    const b = i + 1 < rowTiles.length ? rowTiles[i + 1]! : null;
    if (b && b.value === a.value) {
      const sum = a.value * 2;
      survivors.push({
        ...a,
        col: writeCol,
        value: sum,
        mergedFrom: a.value,
      });
      absorbed.push({ ...b, col: writeCol });
      gained += sum;
      i += 2;
    } else {
      survivors.push({ ...a, col: writeCol, mergedFrom: null });
      i += 1;
    }
    writeCol += 1;
  }
  return { survivors, absorbed, gained };
};

const transformInto = (
  tile: Game2048Tile,
  direction: Game2048Direction,
): { axis: number; index: number } => {
  // Maps a tile to (row-or-equivalent axis, position-along-axis) for the
  // direction-relative left slide. axis = which row in the rotated frame.
  switch (direction) {
    case "left":
      return { axis: tile.row, index: tile.col };
    case "right":
      return { axis: tile.row, index: GAME_2048_SIZE - 1 - tile.col };
    case "up":
      return { axis: tile.col, index: tile.row };
    case "down":
      return { axis: tile.col, index: GAME_2048_SIZE - 1 - tile.row };
  }
};

const transformBack = (
  tile: Game2048Tile,
  axis: number,
  newIndex: number,
  direction: Game2048Direction,
): Game2048Tile => {
  switch (direction) {
    case "left":
      return { ...tile, row: axis, col: newIndex };
    case "right":
      return { ...tile, row: axis, col: GAME_2048_SIZE - 1 - newIndex };
    case "up":
      return { ...tile, row: newIndex, col: axis };
    case "down":
      return { ...tile, row: GAME_2048_SIZE - 1 - newIndex, col: axis };
  }
};

/**
 * Applies a move. Tiles slide as far as they can in the direction; adjacent
 * tiles of equal value merge into one (each tile only merges once per move).
 * Tile identities are preserved across moves so the UI can animate them.
 *
 * After a merge, the result contains BOTH the surviving (doubled) tile and
 * the absorbed tile at the same (row, col) so the UI can animate both
 * sliding into the merge point. Call `commitMerges` once the slide animation
 * finishes to drop the absorbed tiles.
 */
export const moveState = (
  state: Game2048State,
  direction: Game2048Direction,
): Game2048MoveResult => {
  // Group tiles by axis (row in the rotated frame), each entry holds the
  // tile and its position along the slide axis.
  const groups = new Map<number, Array<{ tile: Game2048Tile; index: number }>>();
  for (const t of state.tiles) {
    const { axis, index } = transformInto(t, direction);
    if (!groups.has(axis)) groups.set(axis, []);
    groups.get(axis)!.push({ tile: t, index });
  }

  let totalGained = 0;
  const newTiles: Game2048Tile[] = [];

  for (const [axis, entries] of groups.entries()) {
    entries.sort((a, b) => a.index - b.index);
    const rowTiles = entries.map((e) => e.tile);

    const { survivors, absorbed, gained } = slideRowLeft(rowTiles);
    totalGained += gained;

    for (const s of survivors) {
      newTiles.push(transformBack(s, axis, s.col, direction));
    }
    for (const a of absorbed) {
      newTiles.push(transformBack(a, axis, a.col, direction));
    }
  }

  // Detect "moved" by comparing each input tile's old position to its new.
  const newById = new Map(newTiles.map((t) => [t.id, t]));
  let moved = false;
  for (const old of state.tiles) {
    const next = newById.get(old.id);
    if (!next) {
      moved = true;
      break;
    }
    if (next.row !== old.row || next.col !== old.col) {
      moved = true;
      break;
    }
  }

  return {
    state: {
      tiles: newTiles,
      score: state.score + totalGained,
      nextId: state.nextId,
    },
    gainedScore: totalGained,
    moved,
  };
};

/**
 * Returns true if no moves are possible: board is full AND no two adjacent
 * tiles share a value.
 */
export const isGameOver = (state: Game2048State): boolean => {
  const board = boardFromState(state);
  for (let r = 0; r < GAME_2048_SIZE; r++) {
    for (let c = 0; c < GAME_2048_SIZE; c++) {
      if (board[r]![c] === 0) return false;
      if (c + 1 < GAME_2048_SIZE && board[r]![c] === board[r]![c + 1]) {
        return false;
      }
      if (r + 1 < GAME_2048_SIZE && board[r]![c] === board[r + 1]![c]) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Removes "absorbed" tiles (ones that just merged into another tile). After
 * the slide animation completes, the UI commits this so only survivors and
 * the new random tile remain.
 */
export const commitMerges = (state: Game2048State): Game2048State => {
  // After a slide+merge, two tiles share a (row, col). Keep the one with
  // mergedFrom != null (the survivor with the doubled value); drop the other.
  const byCell = new Map<string, Game2048Tile>();
  for (const t of state.tiles) {
    const key = `${t.row}-${t.col}`;
    const existing = byCell.get(key);
    if (!existing) {
      byCell.set(key, t);
      continue;
    }
    // Both tiles are at the same cell — keep the merged survivor, drop the
    // other (the absorbed one).
    if (t.mergedFrom !== null) {
      byCell.set(key, { ...t, mergedFrom: null });
    } else if (existing.mergedFrom !== null) {
      byCell.set(key, { ...existing, mergedFrom: null });
    }
  }
  return {
    tiles: Array.from(byCell.values()),
    score: state.score,
    nextId: state.nextId,
  };
};
