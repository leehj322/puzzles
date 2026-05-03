"use client";

import { create } from "zustand";

import {
  FRUIT_BOX_DURATION_MS,
  applySelection,
  createEmptyFruitBoxBoard,
  createFruitBoxBoard,
  type FruitBoxBoard,
  type FruitBoxRect,
} from "@puzzles/core";

const BEST_SCORE_KEY = "puzzles:fruit-box:best";

const readBest = (): number => {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(BEST_SCORE_KEY);
    if (!raw) return 0;
    const n = Number.parseInt(raw, 10);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  } catch {
    return 0;
  }
};

const writeBest = (value: number): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(BEST_SCORE_KEY, String(value));
  } catch {
    // ignore quota / privacy mode failures
  }
};

interface FruitBoxStoreState {
  board: FruitBoxBoard;
  score: number;
  best: number;
  /** Wall-clock ms when the current run started, or null before first move. */
  startedAt: number | null;
  /** Wall-clock ms when the current run ended (timer expired), or null. */
  endedAt: number | null;
  gameOver: boolean;
  hydrated: boolean;
  newGame: () => void;
  /** Player started dragging — start the timer if it hasn't started yet. */
  startTimer: () => void;
  applyRect: (rect: FruitBoxRect) => number;
  endGame: () => void;
}

const PLACEHOLDER_BOARD: FruitBoxBoard = createEmptyFruitBoxBoard();

export const useFruitBoxStore = create<FruitBoxStoreState>((set, get) => ({
  board: PLACEHOLDER_BOARD,
  score: 0,
  best: 0,
  startedAt: null,
  endedAt: null,
  gameOver: false,
  hydrated: false,

  newGame: () => {
    set({
      board: createFruitBoxBoard(),
      score: 0,
      best: readBest(),
      startedAt: null,
      endedAt: null,
      gameOver: false,
      hydrated: true,
    });
  },

  startTimer: () => {
    const { startedAt, gameOver } = get();
    if (startedAt || gameOver) return;
    set({ startedAt: Date.now() });
  },

  applyRect: (rect) => {
    const { board, score, gameOver } = get();
    if (gameOver) return 0;
    const { board: next, gained } = applySelection(board, rect);
    if (gained === 0) return 0;
    set({ board: next, score: score + gained });
    return gained;
  },

  endGame: () => {
    const { gameOver, score, best } = get();
    if (gameOver) return;
    const nextBest = Math.max(best, score);
    if (nextBest > best) writeBest(nextBest);
    set({ gameOver: true, endedAt: Date.now(), best: nextBest });
  },
}));

export { FRUIT_BOX_DURATION_MS };
