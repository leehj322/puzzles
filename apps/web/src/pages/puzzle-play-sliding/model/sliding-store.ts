"use client";

import { create } from "zustand";

import {
  isSolved,
  move,
  moveByDirection,
  shuffleSolvable,
  solvedBoard,
  type Board,
  type Direction,
} from "@puzzles/core";

const DEFAULT_SIZE = 4;

interface SlidingState {
  imageId: string | null;
  board: Board;
  moves: number;
  startedAt: number | null;
  finishedAt: number | null;
  init: (imageId: string, size: number) => void;
  reset: () => void;
  moveTile: (index: number) => void;
  moveDirection: (dir: Direction) => void;
  dismissWin: () => void;
}

const applyNext = (
  state: SlidingState,
  next: Board | null,
): Partial<SlidingState> | null => {
  if (!next) return null;
  const finishedAt = isSolved(next) ? Date.now() : null;
  return {
    board: next,
    moves: state.moves + 1,
    startedAt: state.startedAt ?? Date.now(),
    finishedAt,
  };
};

export const useSlidingStore = create<SlidingState>((set, get) => ({
  imageId: null,
  board: solvedBoard(DEFAULT_SIZE),
  moves: 0,
  startedAt: null,
  finishedAt: null,

  init: (imageId, size) => {
    set({
      imageId,
      board: shuffleSolvable(size),
      moves: 0,
      startedAt: null,
      finishedAt: null,
    });
  },

  reset: () => {
    const size = get().board.size;
    set({
      board: shuffleSolvable(size),
      moves: 0,
      startedAt: null,
      finishedAt: null,
    });
  },

  moveTile: (index) => {
    const state = get();
    if (state.finishedAt !== null) return;
    const update = applyNext(state, move(state.board, index));
    if (update) set(update);
  },

  moveDirection: (dir) => {
    const state = get();
    if (state.finishedAt !== null) return;
    const update = applyNext(state, moveByDirection(state.board, dir));
    if (update) set(update);
  },

  dismissWin: () => {
    set({ finishedAt: null });
  },
}));
