"use client";

import { useEffect } from "react";

import { type SudokuPuzzle } from "@puzzles/core";

import { useSudokuKeyboard } from "../lib/use-keyboard";
import { useSudokuStore } from "../model/sudoku-store";

import { SudokuBoard } from "./board";
import { SudokuHud } from "./hud";
import { SudokuPad } from "./pad";
import { SudokuWinModal } from "./win-modal";

export function SudokuPlayView({ puzzle }: { puzzle: SudokuPuzzle }) {
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
