"use client";

import { create } from "zustand";

import {
  addRandomTile,
  commitMerges,
  createInitialState,
  isGameOver,
  moveState,
  type Game2048Direction,
  type Game2048State,
} from "@puzzles/core";

const SLIDE_DURATION_MS = 160;

interface Game2048StoreState {
  state: Game2048State;
  gameOver: boolean;
  /** When true, ignore further input until the current slide animation ends. */
  animating: boolean;
  init: () => void;
  reset: () => void;
  moveDirection: (dir: Game2048Direction) => void;
}

export const useGame2048Store = create<Game2048StoreState>((set, get) => ({
  state: { tiles: [], score: 0, nextId: 0 },
  gameOver: false,
  animating: false,

  init: () => {
    const state = createInitialState();
    set({
      state,
      gameOver: isGameOver(state),
      animating: false,
    });
  },

  reset: () => {
    get().init();
  },

  moveDirection: (dir) => {
    const current = get();
    if (current.gameOver || current.animating) return;

    const result = moveState(current.state, dir);
    if (!result.moved) return;

    // Step 1: show the transient state with both survivors and absorbed
    // tiles so the UI can animate them sliding to the merge cell.
    set({ state: result.state, animating: true });

    // Step 2: after the slide finishes, drop absorbed tiles, spawn a new
    // random tile, and check for game over.
    setTimeout(() => {
      const after = get();
      // Guard against reset during the animation window.
      if (after.state !== result.state) return;
      const committed = commitMerges(after.state);
      const withRandom = addRandomTile(committed);
      set({
        state: withRandom,
        gameOver: isGameOver(withRandom),
        animating: false,
      });
    }, SLIDE_DURATION_MS);
  },
}));

export const GAME_2048_SLIDE_MS = SLIDE_DURATION_MS;
