"use client";

import { useEffect } from "react";

import { useSudokuStore } from "../model/sudoku-store";

export const useSudokuKeyboard = () => {
  const enterDigit = useSudokuStore((s) => s.enterDigit);
  const clearCell = useSudokuStore((s) => s.clearCell);
  const moveSelection = useSudokuStore((s) => s.moveSelection);
  const toggleNoteMode = useSudokuStore((s) => s.toggleNoteMode);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key;
      if (/^[1-9]$/.test(key)) {
        e.preventDefault();
        enterDigit(Number(key));
        return;
      }
      if (key === "Backspace" || key === "Delete" || key === "0") {
        e.preventDefault();
        clearCell();
        return;
      }
      if (key === "ArrowUp") {
        e.preventDefault();
        moveSelection(-1, 0);
        return;
      }
      if (key === "ArrowDown") {
        e.preventDefault();
        moveSelection(1, 0);
        return;
      }
      if (key === "ArrowLeft") {
        e.preventDefault();
        moveSelection(0, -1);
        return;
      }
      if (key === "ArrowRight") {
        e.preventDefault();
        moveSelection(0, 1);
        return;
      }
      if (key === "n" || key === "N") {
        e.preventDefault();
        toggleNoteMode();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enterDigit, clearCell, moveSelection, toggleNoteMode]);
};
