"use client";

import { useEffect, useState } from "react";

import { useSudokuStore } from "../model/sudoku-store";

export const useSudokuTimer = (): number => {
  const startedAt = useSudokuStore((s) => s.startedAt);
  const finishedAt = useSudokuStore((s) => s.finishedAt);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!startedAt || finishedAt) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, [startedAt, finishedAt]);

  if (!startedAt) return 0;
  const end = finishedAt ?? Date.now();
  return Math.max(0, end - startedAt);
};
