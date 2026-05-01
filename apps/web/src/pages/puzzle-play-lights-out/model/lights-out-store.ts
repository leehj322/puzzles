"use client";

import { create } from "zustand";

import {
  generateLightsOutBoard,
  isLightsOutSolved,
  pressLightsOut,
  type LightsOutBoard,
} from "@puzzles/core";

export type LightsOutSize = 3 | 5 | 7;
export type LightsOutDifficulty = "easy" | "normal" | "hard";

/**
 * Number of random presses applied when generating a board.
 * Roughly scales with size² so larger boards get a similar density of lights.
 * Tuned by hand for a fun-feeling spread of difficulty.
 */
const PRESS_COUNT: Record<LightsOutSize, Record<LightsOutDifficulty, number>> = {
  3: { easy: 2, normal: 3, hard: 5 },
  5: { easy: 4, normal: 7, hard: 12 },
  7: { easy: 6, normal: 12, hard: 20 },
};

interface LightsOutStoreState {
  size: LightsOutSize;
  difficulty: LightsOutDifficulty;
  board: LightsOutBoard;
  moves: number;
  solved: boolean;
  /** True only on the very first render before the client-side board is generated. */
  hydrated: boolean;
  setSize: (size: LightsOutSize) => void;
  setDifficulty: (difficulty: LightsOutDifficulty) => void;
  press: (row: number, col: number) => void;
  newGame: () => void;
}

const DEFAULT_SIZE: LightsOutSize = 5;
const DEFAULT_DIFFICULTY: LightsOutDifficulty = "normal";

const generate = (
  size: LightsOutSize,
  difficulty: LightsOutDifficulty,
): LightsOutBoard =>
  generateLightsOutBoard(size, PRESS_COUNT[size][difficulty]);

export const useLightsOutStore = create<LightsOutStoreState>((set, get) => ({
  size: DEFAULT_SIZE,
  difficulty: DEFAULT_DIFFICULTY,
  // Placeholder empty board for SSR; replaced by `newGame` on mount so the
  // Math.random call only runs on the client and we avoid hydration mismatch.
  board: { cells: new Array(DEFAULT_SIZE * DEFAULT_SIZE).fill(false), size: DEFAULT_SIZE },
  moves: 0,
  solved: false,
  hydrated: false,

  setSize: (size) => {
    set({
      size,
      board: generate(size, get().difficulty),
      moves: 0,
      solved: false,
      hydrated: true,
    });
  },

  setDifficulty: (difficulty) => {
    set({
      difficulty,
      board: generate(get().size, difficulty),
      moves: 0,
      solved: false,
      hydrated: true,
    });
  },

  press: (row, col) => {
    const { board, solved, moves } = get();
    if (solved) return;
    const next = pressLightsOut(board, row, col);
    set({
      board: next,
      moves: moves + 1,
      solved: isLightsOutSolved(next),
    });
  },

  newGame: () => {
    const { size, difficulty } = get();
    set({
      board: generate(size, difficulty),
      moves: 0,
      solved: false,
      hydrated: true,
    });
  },
}));
