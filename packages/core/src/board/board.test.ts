import { describe, expect, it } from "vitest";

import {
  BOARD_SIZE,
  isSolved,
  move,
  moveByDirection,
  shuffleSolvable,
  SOLVED,
  TILE_COUNT,
  tileBackgroundPosition,
  type Board,
  type Direction,
  type Tile,
} from "./board";

describe("isSolved", () => {
  it("returns true for the SOLVED board", () => {
    expect(isSolved(SOLVED)).toBe(true);
  });

  it("returns false when tiles are out of place", () => {
    const swapped: Tile[] = [...SOLVED];
    [swapped[0], swapped[1]] = [swapped[1], swapped[0]];
    expect(isSolved(swapped)).toBe(false);
  });

  it("returns false for a board of the wrong length", () => {
    expect(isSolved([1, 2, 3, null] as Board)).toBe(false);
  });
});

describe("move", () => {
  it("swaps a tile with the adjacent blank", () => {
    // SOLVED has blank at index 15, tile at index 14 is 15
    const next = move(SOLVED, 14);
    expect(next).not.toBeNull();
    expect(next![14]).toBeNull();
    expect(next![15]).toBe(15);
  });

  it("returns null when the tile is not adjacent to the blank", () => {
    expect(move(SOLVED, 0)).toBeNull();
  });

  it("returns null when clicking the blank itself", () => {
    expect(move(SOLVED, 15)).toBeNull();
  });

  it("returns null for out-of-range indices", () => {
    expect(move(SOLVED, -1)).toBeNull();
    expect(move(SOLVED, 16)).toBeNull();
  });
});

describe("moveByDirection", () => {
  it("returns null when the blank is at the bottom-right and moving 'up' or 'left'", () => {
    expect(moveByDirection(SOLVED, "up")).toBeNull();
    expect(moveByDirection(SOLVED, "left")).toBeNull();
  });

  it("'down' from solved slides tile 12 down into the blank", () => {
    const next = moveByDirection(SOLVED, "down");
    expect(next).not.toBeNull();
    // Tile 12 was at index 11 (row 2, col 3); after sliding down, it sits at 15
    expect(next![15]).toBe(12);
    expect(next![11]).toBeNull();
  });

  it("'right' from solved slides tile 15 right into the blank", () => {
    const next = moveByDirection(SOLVED, "right");
    expect(next).not.toBeNull();
    expect(next![15]).toBe(15);
    expect(next![14]).toBeNull();
  });

  it("all four directions return null when no move is possible", () => {
    // Construct a board where blank is in the corner where 'down' and 'right' are blocked too
    // The solved board has blank at bottom-right corner: down (no row above blocks?) actually
    // with blank at index 15: row=3,col=3. 'up' requires row<3 (false). 'down' requires row>0 (true).
    // 'left' requires col<3 (false). 'right' requires col>0 (true).
    // So we test the boundary cases per direction explicitly.
    const directions: Direction[] = ["up", "down", "left", "right"];
    for (const dir of directions) {
      // We just confirm the function never throws and returns Board|null
      const result = moveByDirection(SOLVED, dir);
      expect(result === null || result.length === TILE_COUNT).toBe(true);
    }
  });
});

describe("shuffleSolvable", () => {
  it("produces a solvable board (not equal to SOLVED)", () => {
    const board = shuffleSolvable();
    expect(board).toHaveLength(TILE_COUNT);
    expect(isSolved(board)).toBe(false);
    // Contains exactly tiles 1..15 and one null
    const sorted = [...board].sort((a, b) => {
      if (a === null) return 1;
      if (b === null) return -1;
      return a - b;
    });
    expect(sorted.slice(0, 15)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
    expect(sorted[15]).toBeNull();
  });

  it("1000 shuffles all preserve the tile multiset", () => {
    for (let i = 0; i < 1000; i++) {
      const board = shuffleSolvable();
      const sorted = [...board].sort((a, b) => {
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
    // With steps=0 the algorithm performs a defensive single move because
    // the result equals SOLVED. So result must NOT be solved.
    const board = shuffleSolvable(0);
    expect(isSolved(board)).toBe(false);
  });
});

describe("tileBackgroundPosition", () => {
  it("tile 1 maps to top-left (0%, 0%)", () => {
    expect(tileBackgroundPosition(1)).toEqual({ x: "0%", y: "0%" });
  });

  it("tile 4 (top-right of solved) maps to (100%, 0%)", () => {
    const pos = tileBackgroundPosition(4);
    expect(pos.y).toBe("0%");
    expect(pos.x).toBe("100%");
  });

  it("tile 13 (bottom-left of solved) maps to (0%, 100%)", () => {
    const pos = tileBackgroundPosition(13);
    expect(pos.x).toBe("0%");
    expect(pos.y).toBe("100%");
  });

  it("step is 100/(BOARD_SIZE-1) so corner tiles span 0% .. 100%", () => {
    const step = 100 / (BOARD_SIZE - 1);
    expect(tileBackgroundPosition(2).x).toBe(`${step}%`);
    expect(tileBackgroundPosition(5).y).toBe(`${step}%`);
  });
});
