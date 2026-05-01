import { describe, expect, it } from "vitest";

import {
  isSolved,
  move,
  moveByDirection,
  shuffleSolvable,
  solvedBoard,
  tileBackgroundPosition,
  type Board,
  type Direction,
  type Tile,
} from "./board";

const expectedTiles = (size: number): Tile[] => {
  const count = size * size;
  const out: Tile[] = new Array(count);
  for (let i = 0; i < count - 1; i++) out[i] = i + 1;
  out[count - 1] = null;
  return out;
};

describe("solvedBoard", () => {
  it.each([3, 4, 5, 6])("produces a solved board of size %i", (size) => {
    const board = solvedBoard(size);
    expect(board.size).toBe(size);
    expect(board.tiles).toEqual(expectedTiles(size));
  });

  it("rejects invalid sizes", () => {
    expect(() => solvedBoard(1)).toThrow();
    expect(() => solvedBoard(0)).toThrow();
    expect(() => solvedBoard(-1)).toThrow();
    expect(() => solvedBoard(2.5)).toThrow();
  });
});

describe("isSolved", () => {
  it.each([3, 4, 5, 6])("returns true for the solved board (size %i)", (size) => {
    expect(isSolved(solvedBoard(size))).toBe(true);
  });

  it("returns false when tiles are out of place", () => {
    const solved = solvedBoard(4);
    const tiles: Tile[] = [...solved.tiles];
    [tiles[0], tiles[1]] = [tiles[1], tiles[0]];
    expect(isSolved({ tiles, size: 4 })).toBe(false);
  });

  it("returns false for tiles array of the wrong length", () => {
    const board: Board = { tiles: [1, 2, 3, null], size: 4 };
    expect(isSolved(board)).toBe(false);
  });
});

describe("move", () => {
  it("swaps a tile with the adjacent blank (size 4)", () => {
    const solved = solvedBoard(4);
    const next = move(solved, 14);
    expect(next).not.toBeNull();
    expect(next!.tiles[14]).toBeNull();
    expect(next!.tiles[15]).toBe(15);
  });

  it("works on a 3x3 board", () => {
    const solved = solvedBoard(3);
    const next = move(solved, 7);
    expect(next).not.toBeNull();
    expect(next!.tiles[7]).toBeNull();
    expect(next!.tiles[8]).toBe(8);
  });

  it("returns null when the tile is not adjacent to the blank", () => {
    expect(move(solvedBoard(4), 0)).toBeNull();
  });

  it("returns null when clicking the blank itself", () => {
    expect(move(solvedBoard(4), 15)).toBeNull();
  });

  it("returns null for out-of-range indices", () => {
    expect(move(solvedBoard(4), -1)).toBeNull();
    expect(move(solvedBoard(4), 16)).toBeNull();
  });
});

describe("moveByDirection", () => {
  it("returns null when the blank is at the bottom-right and moving 'up' or 'left'", () => {
    const solved = solvedBoard(4);
    expect(moveByDirection(solved, "up")).toBeNull();
    expect(moveByDirection(solved, "left")).toBeNull();
  });

  it("'down' from solved slides the tile above the blank down (size 4)", () => {
    const next = moveByDirection(solvedBoard(4), "down");
    expect(next).not.toBeNull();
    expect(next!.tiles[15]).toBe(12);
    expect(next!.tiles[11]).toBeNull();
  });

  it("'right' from solved slides the tile left of the blank right (size 4)", () => {
    const next = moveByDirection(solvedBoard(4), "right");
    expect(next).not.toBeNull();
    expect(next!.tiles[15]).toBe(15);
    expect(next!.tiles[14]).toBeNull();
  });

  it("works on size 3 — 'down' slides tile from index 5 to index 8", () => {
    const next = moveByDirection(solvedBoard(3), "down");
    expect(next).not.toBeNull();
    expect(next!.tiles[8]).toBe(6);
    expect(next!.tiles[5]).toBeNull();
  });

  it("never throws for any direction on the solved board (size 5)", () => {
    const directions: Direction[] = ["up", "down", "left", "right"];
    const solved = solvedBoard(5);
    for (const dir of directions) {
      const result = moveByDirection(solved, dir);
      expect(result === null || result.tiles.length === 25).toBe(true);
    }
  });
});

describe("shuffleSolvable", () => {
  it.each([3, 4, 5, 6])("produces a non-solved board (size %i)", (size) => {
    const board = shuffleSolvable(size);
    expect(board.size).toBe(size);
    expect(board.tiles).toHaveLength(size * size);
    expect(isSolved(board)).toBe(false);
  });

  it("preserves the tile multiset across many shuffles (size 4)", () => {
    for (let i = 0; i < 1000; i++) {
      const board = shuffleSolvable(4);
      const sorted = [...board.tiles].sort((a, b) => {
        if (a === null) return 1;
        if (b === null) return -1;
        return a - b;
      });
      expect(sorted[15]).toBeNull();
      for (let n = 0; n < 15; n++) {
        expect(sorted[n]).toBe(n + 1);
      }
    }
  });

  it("respects the steps parameter (steps=0 with defensive bump still differs)", () => {
    const board = shuffleSolvable(4, 0);
    expect(isSolved(board)).toBe(false);
  });
});

describe("tileBackgroundPosition", () => {
  it("tile 1 maps to top-left (0%, 0%) for any size", () => {
    expect(tileBackgroundPosition(1, 3)).toEqual({ x: "0%", y: "0%" });
    expect(tileBackgroundPosition(1, 4)).toEqual({ x: "0%", y: "0%" });
    expect(tileBackgroundPosition(1, 6)).toEqual({ x: "0%", y: "0%" });
  });

  it("the top-right tile maps to (100%, 0%)", () => {
    expect(tileBackgroundPosition(4, 4)).toEqual({ x: "100%", y: "0%" });
    expect(tileBackgroundPosition(6, 6)).toEqual({ x: "100%", y: "0%" });
  });

  it("the bottom-left tile maps to (0%, 100%)", () => {
    expect(tileBackgroundPosition(13, 4)).toEqual({ x: "0%", y: "100%" });
    expect(tileBackgroundPosition(7, 3)).toEqual({ x: "0%", y: "100%" });
  });

  it("step is 100/(size-1) so adjacent tiles span one step", () => {
    const step4 = 100 / 3;
    expect(tileBackgroundPosition(2, 4).x).toBe(`${step4}%`);
    expect(tileBackgroundPosition(5, 4).y).toBe(`${step4}%`);
    const step6 = 100 / 5;
    expect(tileBackgroundPosition(2, 6).x).toBe(`${step6}%`);
  });
});
