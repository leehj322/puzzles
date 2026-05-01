import { describe, expect, it } from "vitest";

import {
  createEmptyLightsOutBoard,
  generateLightsOutBoard,
  isLightsOutSolved,
  pressLightsOut,
} from "./game";

describe("lights-out", () => {
  it("creates an empty board with the given size", () => {
    const board = createEmptyLightsOutBoard(5);
    expect(board.size).toBe(5);
    expect(board.cells).toHaveLength(25);
    expect(isLightsOutSolved(board)).toBe(true);
  });

  it("rejects invalid sizes", () => {
    expect(() => createEmptyLightsOutBoard(1)).toThrow();
    expect(() => createEmptyLightsOutBoard(2.5)).toThrow();
  });

  it("toggles the pressed cell and its 4 orthogonal neighbors", () => {
    const board = createEmptyLightsOutBoard(3);
    const next = pressLightsOut(board, 1, 1);
    const expected = [
      false, true, false,
      true, true, true,
      false, true, false,
    ];
    expect(next.cells).toEqual(expected);
  });

  it("ignores neighbors outside the board (corners)", () => {
    const board = createEmptyLightsOutBoard(3);
    const next = pressLightsOut(board, 0, 0);
    const expected = [
      true, true, false,
      true, false, false,
      false, false, false,
    ];
    expect(next.cells).toEqual(expected);
  });

  it("pressing the same cell twice is a no-op", () => {
    const board = createEmptyLightsOutBoard(4);
    const once = pressLightsOut(board, 2, 1);
    const twice = pressLightsOut(once, 2, 1);
    expect(twice.cells).toEqual(board.cells);
  });

  it("does not mutate the input board", () => {
    const board = createEmptyLightsOutBoard(3);
    const before = [...board.cells];
    pressLightsOut(board, 1, 1);
    expect(board.cells).toEqual(before);
  });

  it("rejects out-of-bounds presses", () => {
    const board = createEmptyLightsOutBoard(3);
    expect(() => pressLightsOut(board, -1, 0)).toThrow();
    expect(() => pressLightsOut(board, 0, 3)).toThrow();
  });

  it("isLightsOutSolved is true only when all lights are off", () => {
    const empty = createEmptyLightsOutBoard(3);
    expect(isLightsOutSolved(empty)).toBe(true);
    expect(isLightsOutSolved(pressLightsOut(empty, 0, 0))).toBe(false);
  });

  it("generated boards are solvable by replaying the same presses", () => {
    // Deterministic random: cycles through a fixed sequence so the test is
    // reproducible and we can replay the exact same picks.
    const seq = [0.1, 0.42, 0.73, 0.05, 0.91, 0.28, 0.55, 0.6];
    let i = 0;
    const rng = () => {
      const v = seq[i % seq.length]!;
      i += 1;
      return v;
    };

    const size = 5;
    const presses = 5;
    const board = generateLightsOutBoard(size, presses, rng);
    expect(board.size).toBe(size);
    expect(board.cells).toHaveLength(size * size);

    // Replay the same presses on a fresh empty board — should match the
    // generated state, since press is its own inverse and order doesn't
    // matter for parity of toggles per cell.
    let replay = createEmptyLightsOutBoard(size);
    let j = 0;
    const rngReplay = () => {
      const v = seq[j % seq.length]!;
      j += 1;
      return v;
    };
    const total = size * size;
    const used = new Set<number>();
    for (let k = 0; k < Math.min(presses, total); k++) {
      let idx = Math.floor(rngReplay() * total);
      for (let attempt = 0; attempt < 8 && used.has(idx); attempt++) {
        idx = Math.floor(rngReplay() * total);
      }
      used.add(idx);
      replay = pressLightsOut(replay, Math.floor(idx / size), idx % size);
    }
    // Generator may add a defensive extra press only if `replay` is solved;
    // for our seq+presses=5 it's not.
    expect(isLightsOutSolved(replay)).toBe(false);
    expect(board.cells).toEqual(replay.cells);

    // Pressing the same cells again should fully solve the board.
    let solver = board;
    let s = 0;
    const rngSolve = () => {
      const v = seq[s % seq.length]!;
      s += 1;
      return v;
    };
    const usedSolve = new Set<number>();
    for (let k = 0; k < Math.min(presses, total); k++) {
      let idx = Math.floor(rngSolve() * total);
      for (let attempt = 0; attempt < 8 && usedSolve.has(idx); attempt++) {
        idx = Math.floor(rngSolve() * total);
      }
      usedSolve.add(idx);
      solver = pressLightsOut(solver, Math.floor(idx / size), idx % size);
    }
    expect(isLightsOutSolved(solver)).toBe(true);
  });

  it("guarantees a non-solved board even when presses is 0", () => {
    const board = generateLightsOutBoard(4, 0);
    expect(isLightsOutSolved(board)).toBe(false);
  });
});
