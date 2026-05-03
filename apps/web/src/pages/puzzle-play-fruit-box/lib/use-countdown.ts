"use client";

import { useEffect, useState } from "react";

import {
  FRUIT_BOX_DURATION_MS,
  useFruitBoxStore,
} from "../model/fruit-box-store";

/**
 * Returns the milliseconds left in the current run. Returns the full
 * duration before the timer has been started so the HUD can show "2:00"
 * on idle boards. Calls `endGame` when the timer reaches zero.
 */
export const useCountdown = (): number => {
  const startedAt = useFruitBoxStore((s) => s.startedAt);
  const endedAt = useFruitBoxStore((s) => s.endedAt);
  const gameOver = useFruitBoxStore((s) => s.gameOver);
  const endGame = useFruitBoxStore((s) => s.endGame);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!startedAt || gameOver) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 250);
    return () => window.clearInterval(id);
  }, [startedAt, gameOver]);

  if (!startedAt) return FRUIT_BOX_DURATION_MS;
  const now = endedAt ?? Date.now();
  const remaining = FRUIT_BOX_DURATION_MS - (now - startedAt);
  if (remaining <= 0) {
    if (!gameOver) {
      // Defer to avoid setting state during render.
      queueMicrotask(endGame);
    }
    return 0;
  }
  return remaining;
};
