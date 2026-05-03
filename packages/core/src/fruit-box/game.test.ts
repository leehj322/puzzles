import { describe, expect, it } from "vitest";

import {
  FRUIT_BOX_COLS,
  FRUIT_BOX_ROWS,
  applySelection,
  countRect,
  createEmptyFruitBoxBoard,
  createFruitBoxBoard,
  normalizeRect,
  sumRect,
  type FruitBoxBoard,
} from "./game";

const boardOf = (cells: number[][]): FruitBoxBoard => {
  const rows = cells.length;
  const cols = cells[0]?.length ?? 0;
  const flat: number[] = [];
  for (const row of cells) {
    if (row.length !== cols) throw new Error("ragged test board");
    flat.push(...row);
  }
  return { cells: flat, rows, cols };
};

describe("createFruitBoxBoard", () => {
  it("uses default dimensions of 10 × 17", () => {
    const board = createFruitBoxBoard(undefined, undefined, () => 0);
    expect(board.rows).toBe(FRUIT_BOX_ROWS);
    expect(board.cols).toBe(FRUIT_BOX_COLS);
    expect(board.cells).toHaveLength(FRUIT_BOX_ROWS * FRUIT_BOX_COLS);
  });

  it("fills every cell with a value 1..9", () => {
    const board = createFruitBoxBoard(3, 4, Math.random);
    for (const v of board.cells) {
      expect(v).toBeGreaterThanOrEqual(1);
      expect(v).toBeLessThanOrEqual(9);
    }
  });

  it("is deterministic given a deterministic random", () => {
    const seq = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
    let i = 0;
    const a = createFruitBoxBoard(2, 3, () => seq[i++ % seq.length]!);
    i = 0;
    const b = createFruitBoxBoard(2, 3, () => seq[i++ % seq.length]!);
    expect(a.cells).toEqual(b.cells);
  });

  it("rejects invalid dimensions", () => {
    expect(() => createFruitBoxBoard(0, 4)).toThrow();
    expect(() => createFruitBoxBoard(4, 0)).toThrow();
  });
});

describe("sumRect", () => {
  const board = boardOf([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);

  it("sums a single cell", () => {
    expect(sumRect(board, { r1: 1, c1: 1, r2: 1, c2: 1 })).toBe(5);
  });

  it("sums a row", () => {
    expect(sumRect(board, { r1: 0, c1: 0, r2: 0, c2: 2 })).toBe(6);
  });

  it("normalizes reversed rectangles", () => {
    expect(sumRect(board, { r1: 2, c1: 2, r2: 0, c2: 0 })).toBe(45);
  });

  it("ignores cleared cells (value 0)", () => {
    const cleared = boardOf([
      [1, 0, 3],
      [0, 5, 0],
      [7, 0, 9],
    ]);
    expect(sumRect(cleared, { r1: 0, c1: 0, r2: 2, c2: 2 })).toBe(25);
  });

  it("returns 0 for out-of-bounds rectangles", () => {
    expect(sumRect(board, { r1: 0, c1: 0, r2: 5, c2: 5 })).toBe(0);
  });
});

describe("applySelection", () => {
  it("clears apples when the sum is exactly 10", () => {
    const board = boardOf([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    // top-left 2×2 = 1+2+4+5 = 12 — not 10.
    // top row sums 1+2+3 = 6, bottom row 4+5+6 = 15. Pick 4+6 isn't a rect.
    // (1,2)+(4,5)+? Use rect (r1=0,c1=0,r2=1,c2=1): 1+2+4+5=12.
    // Pick (r1=0,c1=2,r2=1,c2=2): 3+6=9, no. Construct one that's 10.
    // (1,4) horizontal row 0 c0..c1 = 3, c0..c2 = 6. Try (4,6) bottom c0..c1 = 9.
    // Use (3+6+1) cell (0,2)+(1,2)+...
    // Easier: build an explicit 10-rect board.
    const explicit = boardOf([
      [4, 6],
      [3, 2],
    ]);
    const { board: next, gained } = applySelection(explicit, {
      r1: 0,
      c1: 0,
      r2: 0,
      c2: 1,
    });
    expect(gained).toBe(2);
    expect(next.cells.slice(0, 2)).toEqual([0, 0]);
    expect(next.cells.slice(2)).toEqual([3, 2]);
    // input untouched
    expect(board.cells.slice(0, 3)).toEqual([1, 2, 3]);
  });

  it("does nothing when the sum is not 10", () => {
    const board = boardOf([[1, 2, 3]]);
    const { board: next, gained } = applySelection(board, {
      r1: 0,
      c1: 0,
      r2: 0,
      c2: 2,
    });
    expect(gained).toBe(0);
    expect(next).toBe(board);
  });

  it("only counts non-cleared apples", () => {
    const board = boardOf([[5, 0, 5]]);
    const { gained } = applySelection(board, {
      r1: 0,
      c1: 0,
      r2: 0,
      c2: 2,
    });
    expect(gained).toBe(2);
  });
});

describe("countRect", () => {
  it("counts only non-cleared cells", () => {
    const board = boardOf([
      [1, 0, 3],
      [0, 5, 0],
    ]);
    expect(countRect(board, { r1: 0, c1: 0, r2: 1, c2: 2 })).toBe(3);
  });
});

describe("normalizeRect", () => {
  it("orders coordinates", () => {
    expect(normalizeRect({ r1: 3, c1: 5, r2: 1, c2: 2 })).toEqual({
      r1: 1,
      r2: 3,
      c1: 2,
      c2: 5,
    });
  });
});

describe("createEmptyFruitBoxBoard", () => {
  it("creates a zero-filled board", () => {
    const board = createEmptyFruitBoxBoard(2, 3);
    expect(board.cells).toEqual([0, 0, 0, 0, 0, 0]);
  });
});
