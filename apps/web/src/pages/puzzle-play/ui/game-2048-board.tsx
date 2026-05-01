"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef } from "react";

import { GAME_2048_SIZE, type Game2048Direction } from "@puzzles/core";

import { cn } from "@/shared/lib/cn";

import { useKeyboard } from "../lib/use-keyboard";
import { useSwipe } from "../lib/use-swipe";
import {
  GAME_2048_SLIDE_MS,
  useGame2048Store,
} from "../model/game-2048-store";

const TILE_STYLES: Record<number, string> = {
  2: "bg-surface-warm text-fg-muted",
  4: "bg-accent-soft text-fg",
  8: "bg-peach text-fg",
  16: "bg-butter text-fg",
  32: "bg-mint text-fg",
  64: "bg-sky text-fg",
  128: "bg-rose text-surface",
  256: "bg-lilac text-surface",
  512: "bg-accent text-accent-fg",
  1024: "bg-fg text-butter",
  2048:
    "bg-gradient-to-br from-lilac to-rose text-surface shadow-(--shadow-md)",
  4096:
    "bg-gradient-to-br from-sky to-lilac text-surface shadow-(--shadow-md)",
  8192:
    "bg-gradient-to-br from-mint to-sky text-surface shadow-(--shadow-md)",
  16384:
    "bg-gradient-to-br from-rose to-butter text-surface shadow-(--shadow-lg) ring-2 ring-accent",
};

const tileStyle = (value: number): string =>
  TILE_STYLES[value] ?? "bg-fg text-surface";

const tileFontSize = (value: number): string => {
  const digits = String(value).length;
  if (digits <= 2) return "text-3xl sm:text-4xl";
  if (digits === 3) return "text-2xl sm:text-3xl";
  if (digits === 4) return "text-xl sm:text-2xl";
  return "text-lg sm:text-xl";
};

const SLIDE_TRANSITION = {
  type: "tween",
  ease: "easeInOut",
  duration: GAME_2048_SLIDE_MS / 1000,
} as const;

export function Game2048Board() {
  const tiles = useGame2048Store((s) => s.state.tiles);
  const moveDirection = useGame2048Store((s) => s.moveDirection);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDirection = useCallback(
    (dir: Game2048Direction) => moveDirection(dir),
    [moveDirection],
  );

  useKeyboard(handleDirection);
  useSwipe(containerRef, handleDirection);

  // Sort so that absorbed tiles render BEHIND survivors at the same cell —
  // the survivor (with mergedFrom != null) should be on top so its doubled
  // value is visible the moment the slide finishes.
  const ordered = [...tiles].sort((a, b) => {
    if (a.mergedFrom === null && b.mergedFrom !== null) return -1;
    if (a.mergedFrom !== null && b.mergedFrom === null) return 1;
    return 0;
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[min(90vw,480px)] aspect-square select-none touch-none"
    >
      <div className="absolute inset-0 grid gap-2 rounded-card bg-fg/5 p-2 dark:bg-fg/10"
        style={{
          gridTemplateColumns: `repeat(${GAME_2048_SIZE}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GAME_2048_SIZE}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: GAME_2048_SIZE * GAME_2048_SIZE }, (_, i) => (
          <div key={i} className="rounded-tile bg-surface-warm/60" />
        ))}
      </div>
      <div className="absolute inset-2">
        <div
          className="relative h-full w-full"
          style={{
            // Each tile is sized as a fraction of this inner area, leaving
            // room for the same gap as the underlying grid (gap-2 = 8px).
            ["--cell" as string]: `calc((100% - ${(GAME_2048_SIZE - 1) * 8}px) / ${GAME_2048_SIZE})`,
            ["--gap" as string]: "8px",
          }}
        >
          <AnimatePresence>
            {ordered.map((t) => {
              const top = `calc(${t.row} * (var(--cell) + var(--gap)))`;
              const left = `calc(${t.col} * (var(--cell) + var(--gap)))`;
              return (
              <motion.div
                key={t.id}
                initial={false}
                animate={{ scale: 1, opacity: 1, top, left }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                transition={{
                  top: SLIDE_TRANSITION,
                  left: SLIDE_TRANSITION,
                  opacity: { duration: 0 },
                  scale: { duration: 0 },
                }}
                className={cn(
                  "absolute flex items-center justify-center rounded-tile font-display font-semibold",
                  "h-(--cell) w-(--cell)",
                  tileStyle(t.value),
                  tileFontSize(t.value),
                )}
              >
                {t.value}
              </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
