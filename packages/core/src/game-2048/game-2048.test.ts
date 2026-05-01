import { describe, expect, it } from "vitest";

import {
  GAME_2048_SIZE,
  addRandomTile,
  boardFromState,
  commitMerges,
  createInitialState,
  isGameOver,
  moveState,
  type Game2048State,
  type Game2048Tile,
} from "./game-2048";

const tile = (
  id: number,
  value: number,
  row: number,
  col: number,
): Game2048Tile => ({ id, value, row, col, mergedFrom: null });

const stateOf = (tiles: Game2048Tile[]): Game2048State => ({
  tiles,
  score: 0,
  nextId: tiles.reduce((max, t) => Math.max(max, t.id), -1) + 1,
});

describe("moveState", () => {
  it("slides tiles to the left and merges equal pairs", () => {
    const state = stateOf([tile(0, 2, 0, 1), tile(1, 2, 0, 3)]);
    const result = moveState(state, "left");
    expect(result.gainedScore).toBe(4);
    expect(result.moved).toBe(true);

    const committed = commitMerges(result.state);
    const board = boardFromState(committed);
    expect(board[0]).toEqual([4, 0, 0, 0]);
    expect(committed.tiles).toHaveLength(1);
    expect(committed.tiles[0]!.value).toBe(4);
  });

  it("merges each tile only once per move", () => {
    const state = stateOf([
      tile(0, 2, 0, 0),
      tile(1, 2, 0, 1),
      tile(2, 2, 0, 2),
      tile(3, 2, 0, 3),
    ]);
    const result = moveState(state, "left");
    expect(result.gainedScore).toBe(8);
    const committed = commitMerges(result.state);
    expect(boardFromState(committed)[0]).toEqual([4, 4, 0, 0]);
  });

  it("reports moved=false when nothing changes", () => {
    // 2,4,2,4 row — no merges, all already packed left.
    const state = stateOf([
      tile(0, 2, 0, 0),
      tile(1, 4, 0, 1),
      tile(2, 2, 0, 2),
      tile(3, 4, 0, 3),
    ]);
    const result = moveState(state, "left");
    expect(result.moved).toBe(false);
    expect(result.gainedScore).toBe(0);
  });

  it("supports up direction", () => {
    const state = stateOf([tile(0, 2, 0, 0), tile(1, 2, 1, 0)]);
    const result = moveState(state, "up");
    const committed = commitMerges(result.state);
    expect(committed.tiles[0]!.value).toBe(4);
    expect(committed.tiles[0]!.row).toBe(0);
    expect(committed.tiles[0]!.col).toBe(0);
  });

  it("preserves tile identity for tiles that just slide", () => {
    const state = stateOf([tile(7, 2, 0, 3)]);
    const result = moveState(state, "left");
    const moved = result.state.tiles.find((t) => t.id === 7);
    expect(moved).toBeDefined();
    expect(moved!.col).toBe(0);
    expect(moved!.row).toBe(0);
    expect(moved!.mergedFrom).toBeNull();
  });

  it("marks the surviving merged tile with mergedFrom", () => {
    const state = stateOf([tile(0, 2, 0, 0), tile(1, 2, 0, 1)]);
    const result = moveState(state, "left");
    const survivor = result.state.tiles.find((t) => t.value === 4);
    expect(survivor).toBeDefined();
    expect(survivor!.mergedFrom).toBe(2);
  });

  it("places absorbed tile at the same cell as the survivor before commit", () => {
    const state = stateOf([tile(0, 2, 0, 0), tile(1, 2, 0, 1)]);
    const result = moveState(state, "left");
    expect(result.state.tiles).toHaveLength(2);
    const [a, b] = result.state.tiles;
    expect(a!.row).toBe(b!.row);
    expect(a!.col).toBe(b!.col);
  });
});

describe("commitMerges", () => {
  it("drops the absorbed tile after a merge", () => {
    const state = stateOf([tile(0, 2, 0, 0), tile(1, 2, 0, 1)]);
    const after = commitMerges(moveState(state, "left").state);
    expect(after.tiles).toHaveLength(1);
    expect(after.tiles[0]!.value).toBe(4);
    expect(after.tiles[0]!.mergedFrom).toBeNull();
  });
});

describe("isGameOver", () => {
  it("returns false when an empty cell exists", () => {
    expect(isGameOver(stateOf([]))).toBe(false);
  });

  it("returns false when an adjacent merge is possible", () => {
    const tiles: Game2048Tile[] = [];
    let id = 0;
    const grid = [
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 4],
    ];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        tiles.push(tile(id++, grid[r]![c]!, r, c));
      }
    }
    expect(isGameOver(stateOf(tiles))).toBe(false);
  });

  it("returns true when no moves remain", () => {
    const tiles: Game2048Tile[] = [];
    let id = 0;
    const grid = [
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 2],
    ];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        tiles.push(tile(id++, grid[r]![c]!, r, c));
      }
    }
    expect(isGameOver(stateOf(tiles))).toBe(true);
  });
});

describe("addRandomTile", () => {
  it("adds exactly one tile with a fresh id", () => {
    const state: Game2048State = { tiles: [], score: 0, nextId: 5 };
    const after = addRandomTile(state, () => 0);
    expect(after.tiles).toHaveLength(1);
    expect(after.tiles[0]!.id).toBe(5);
    expect(after.nextId).toBe(6);
    expect([2, 4]).toContain(after.tiles[0]!.value);
  });

  it("does not mutate the input", () => {
    const state: Game2048State = { tiles: [], score: 0, nextId: 0 };
    addRandomTile(state, () => 0);
    expect(state.tiles).toHaveLength(0);
  });

  it("returns same state if board is full", () => {
    const tiles: Game2048Tile[] = [];
    let id = 0;
    for (let r = 0; r < GAME_2048_SIZE; r++) {
      for (let c = 0; c < GAME_2048_SIZE; c++) {
        tiles.push(tile(id++, 2, r, c));
      }
    }
    const state = stateOf(tiles);
    const after = addRandomTile(state);
    expect(after).toBe(state);
  });
});

describe("createInitialState", () => {
  it("starts with two random tiles", () => {
    const state = createInitialState();
    expect(state.tiles).toHaveLength(2);
    expect(state.tiles[0]!.id).not.toBe(state.tiles[1]!.id);
    expect(state.score).toBe(0);
  });
});
