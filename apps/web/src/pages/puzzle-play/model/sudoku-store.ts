"use client";

import { create } from "zustand";

import {
  findSudokuConflicts,
  isSudokuComplete,
  type SudokuPuzzle,
} from "@puzzles/core";

type Grid = number[][];
type NotesGrid = ReadonlySet<number>[][];

const cloneGrid = (grid: readonly (readonly number[])[]): Grid =>
  grid.map((row) => row.slice());

const emptyNotes = (): NotesGrid =>
  Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => new Set<number>()),
  );

const buildGivenMask = (
  givens: readonly (readonly number[])[],
): boolean[][] =>
  givens.map((row) => row.map((v) => v !== 0));

interface SudokuState {
  puzzleId: string | null;
  values: Grid;
  notes: NotesGrid;
  given: boolean[][];
  selected: { r: number; c: number } | null;
  noteMode: boolean;
  conflicts: ReadonlySet<number>;
  startedAt: number | null;
  finishedAt: number | null;

  init: (puzzle: SudokuPuzzle) => void;
  reset: () => void;
  select: (r: number, c: number) => void;
  moveSelection: (dr: number, dc: number) => void;
  setNoteMode: (on: boolean) => void;
  toggleNoteMode: () => void;
  enterDigit: (digit: number) => void;
  clearCell: () => void;
  dismissWin: () => void;
}

const recompute = (
  state: SudokuState,
  next: Partial<SudokuState>,
): Partial<SudokuState> => {
  const values = next.values ?? state.values;
  const conflicts = findSudokuConflicts(values);
  const finishedAt =
    conflicts.size === 0 && isSudokuComplete(values)
      ? state.finishedAt ?? Date.now()
      : null;
  return { ...next, conflicts, finishedAt };
};

export const useSudokuStore = create<SudokuState>((set, get) => ({
  puzzleId: null,
  values: Array.from({ length: 9 }, () => Array(9).fill(0)),
  notes: emptyNotes(),
  given: Array.from({ length: 9 }, () => Array(9).fill(false)),
  selected: null,
  noteMode: false,
  conflicts: new Set(),
  startedAt: null,
  finishedAt: null,

  init: (puzzle) => {
    const values = cloneGrid(puzzle.givens);
    set({
      puzzleId: puzzle.id,
      values,
      notes: emptyNotes(),
      given: buildGivenMask(puzzle.givens),
      selected: null,
      noteMode: false,
      conflicts: findSudokuConflicts(values),
      startedAt: null,
      finishedAt: null,
    });
  },

  reset: () => {
    const state = get();
    if (!state.puzzleId) return;
    const givenValues: Grid = state.given.map((row, r) =>
      row.map((isGiven, c) => (isGiven ? state.values[r][c] || 0 : 0)),
    );
    set({
      values: givenValues,
      notes: emptyNotes(),
      selected: null,
      noteMode: false,
      conflicts: findSudokuConflicts(givenValues),
      startedAt: null,
      finishedAt: null,
    });
  },

  select: (r, c) => set({ selected: { r, c } }),

  moveSelection: (dr, dc) => {
    const { selected } = get();
    const base = selected ?? { r: 0, c: 0 };
    const r = Math.max(0, Math.min(8, base.r + dr));
    const c = Math.max(0, Math.min(8, base.c + dc));
    set({ selected: { r, c } });
  },

  setNoteMode: (on) => set({ noteMode: on }),
  toggleNoteMode: () => set((s) => ({ noteMode: !s.noteMode })),

  enterDigit: (digit) => {
    if (digit < 1 || digit > 9) return;
    const state = get();
    if (state.finishedAt !== null) return;
    if (!state.selected) return;
    const { r, c } = state.selected;
    if (state.given[r][c]) return;

    const startedAt = state.startedAt ?? Date.now();

    if (state.noteMode) {
      const notes = state.notes.map((row, rr) =>
        row.map((cell, cc) => {
          if (rr !== r || cc !== c) return cell;
          const next = new Set(cell);
          if (next.has(digit)) next.delete(digit);
          else next.add(digit);
          return next;
        }),
      );
      set({ notes, startedAt });
      return;
    }

    const values = state.values.map((row) => row.slice());
    values[r][c] = values[r][c] === digit ? 0 : digit;

    const notes = state.notes.map((row, rr) =>
      row.map((cell, cc) => (rr === r && cc === c ? new Set<number>() : cell)),
    );

    set(recompute(state, { values, notes, startedAt }));
  },

  clearCell: () => {
    const state = get();
    if (state.finishedAt !== null) return;
    if (!state.selected) return;
    const { r, c } = state.selected;
    if (state.given[r][c]) return;

    const values = state.values.map((row) => row.slice());
    values[r][c] = 0;
    const notes = state.notes.map((row, rr) =>
      row.map((cell, cc) => (rr === r && cc === c ? new Set<number>() : cell)),
    );
    set(recompute(state, { values, notes }));
  },

  dismissWin: () => set({ finishedAt: null }),
}));
