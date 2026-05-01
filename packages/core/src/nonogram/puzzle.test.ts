import { describe, expect, it } from "vitest";

import {
  computeNonogramHints,
  getNonogramPuzzles,
  isNonogramSolved,
} from "./puzzle";

describe("nonogram puzzles", () => {
  const puzzles = getNonogramPuzzles();

  it("provides exactly 16 puzzles", () => {
    expect(puzzles).toHaveLength(16);
  });

  it("has unique ids", () => {
    const ids = new Set(puzzles.map((p) => p.id));
    expect(ids.size).toBe(puzzles.length);
  });

  it("each puzzle is rectangular and matches declared rows/cols", () => {
    for (const p of puzzles) {
      expect(p.solution).toHaveLength(p.rows);
      for (const row of p.solution) {
        expect(row).toHaveLength(p.cols);
      }
    }
  });

  it("isNonogramSolved accepts the canonical solution", () => {
    for (const p of puzzles) {
      const hints = computeNonogramHints(p.solution);
      expect(isNonogramSolved(p.solution, hints), p.id).toBe(true);
    }
  });
});
