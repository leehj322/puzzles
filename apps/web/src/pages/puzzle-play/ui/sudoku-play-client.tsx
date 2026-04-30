"use client";

import { useEffect } from "react";

import { type SudokuPuzzle } from "@puzzles/core";

import { useSudokuKeyboard } from "../lib/use-sudoku-keyboard";
import { useSudokuStore } from "../model/sudoku-store";

import { SudokuBoard } from "./sudoku-board";
import { SudokuHud } from "./sudoku-hud";
import { SudokuPad } from "./sudoku-pad";
import { SudokuWinModal } from "./sudoku-win-modal";

export function SudokuPlayClient({ puzzle }: { puzzle: SudokuPuzzle }) {
  const init = useSudokuStore((s) => s.init);
  useSudokuKeyboard();

  useEffect(() => {
    init(puzzle);
  }, [init, puzzle]);

  return (
    <main className="px-4 pt-4 pb-8 sm:pt-6 sm:pb-12">
      <div className="mx-auto flex flex-col items-center gap-5">
        <SudokuHud difficulty={puzzle.difficulty} />
        <SudokuBoard />
        <SudokuPad />
      </div>
      <SudokuWinModal />
    </main>
  );
}
