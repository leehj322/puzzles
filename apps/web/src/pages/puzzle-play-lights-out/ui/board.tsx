"use client";

import { cn } from "@/shared/lib/cn";

import { useLightsOutStore } from "../model/lights-out-store";

export function LightsOutBoard() {
  const board = useLightsOutStore((s) => s.board);
  const press = useLightsOutStore((s) => s.press);
  const solved = useLightsOutStore((s) => s.solved);
  const { size, cells } = board;

  return (
    <div
      className="relative w-full max-w-[min(90vw,520px)] aspect-square select-none"
    >
      <div
        className="absolute inset-0 grid gap-2 rounded-card bg-fg/5 p-2 dark:bg-fg/10"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((on, i) => {
          const row = Math.floor(i / size);
          const col = i % size;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Cell ${row + 1}, ${col + 1}: ${on ? "on" : "off"}`}
              aria-pressed={on}
              disabled={solved}
              onClick={() => press(row, col)}
              className={cn(
                "rounded-tile transition-[transform,box-shadow,background-color] duration-200 ease-(--ease-bounce)",
                "hover:scale-[1.04] active:scale-[0.94] motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                "disabled:cursor-default disabled:hover:scale-100",
                on
                  ? "bg-butter text-fg shadow-(--shadow-md)"
                  : "bg-surface-warm/60 text-fg-muted",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
