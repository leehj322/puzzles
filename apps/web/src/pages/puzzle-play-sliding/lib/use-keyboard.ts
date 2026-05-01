"use client";

import { useEffect } from "react";

import { type Direction } from "@puzzles/core";

const KEY_MAP: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

export const useKeyboard = (onMove: (dir: Direction) => void): void => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const dir = KEY_MAP[event.key];
      if (!dir) return;
      event.preventDefault();
      onMove(dir);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onMove]);
};
