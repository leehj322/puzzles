"use client";

import { create } from "zustand";

import {
  computeNonogramHints,
  isNonogramSolved,
  type NonogramHints,
  type NonogramPuzzle,
} from "@puzzles/core";

export type NonogramCell = "empty" | "filled" | "marked";
export type NonogramTool = "fill" | "mark";

type Grid = NonogramCell[][];

const emptyGrid = (rows: number, cols: number): Grid =>
  Array.from({ length: rows }, () => Array<NonogramCell>(cols).fill("empty"));

const toBooleanGrid = (grid: Grid): boolean[][] =>
  grid.map((row) => row.map((cell) => cell === "filled"));

interface NonogramState {
  puzzleId: string | null;
  rows: number;
  cols: number;
  cells: Grid;
  hints: NonogramHints;
  tool: NonogramTool;
  startedAt: number | null;
  finishedAt: number | null;

  init: (puzzle: NonogramPuzzle) => void;
  reset: () => void;
  setTool: (tool: NonogramTool) => void;
  toggleCell: (r: number, c: number) => void;
  dismissWin: () => void;
}

const recompute = (
  state: NonogramState,
  cells: Grid,
): Pick<NonogramState, "cells" | "finishedAt"> => {
  const solved = isNonogramSolved(toBooleanGrid(cells), state.hints);
  return {
    cells,
    finishedAt: solved ? state.finishedAt ?? Date.now() : null,
  };
};

export const useNonogramStore = create<NonogramState>((set, get) => ({
  puzzleId: null,
  rows: 0,
  cols: 0,
  cells: [],
  hints: { rows: [], cols: [] },
  tool: "fill",
  startedAt: null,
  finishedAt: null,

  init: (puzzle) => {
    set({
      puzzleId: puzzle.id,
      rows: puzzle.rows,
      cols: puzzle.cols,
      cells: emptyGrid(puzzle.rows, puzzle.cols),
      hints: computeNonogramHints(puzzle.solution),
      tool: "fill",
      startedAt: null,
      finishedAt: null,
    });
  },

  reset: () => {
    const state = get();
    if (!state.puzzleId) return;
    set({
      cells: emptyGrid(state.rows, state.cols),
      tool: "fill",
      startedAt: null,
      finishedAt: null,
    });
  },

  setTool: (tool) => set({ tool }),

  toggleCell: (r, c) => {
    const state = get();
    if (state.finishedAt !== null) return;
    if (r < 0 || r >= state.rows || c < 0 || c >= state.cols) return;

    const current = state.cells[r][c];
    const target: NonogramCell =
      state.tool === "fill"
        ? current === "filled"
          ? "empty"
          : "filled"
        : current === "marked"
          ? "empty"
          : "marked";

    const cells = state.cells.map((row, rr) =>
      rr === r ? row.map((cell, cc) => (cc === c ? target : cell)) : row,
    );
    const startedAt = state.startedAt ?? Date.now();
    set({ ...recompute(state, cells), startedAt });
  },

  dismissWin: () => set({ finishedAt: null }),
}));
