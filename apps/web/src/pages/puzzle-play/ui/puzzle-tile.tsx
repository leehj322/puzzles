"use client";

import { tileBackgroundPosition, type Tile } from "@puzzles/core";

import { cn } from "@/shared/lib/cn";

export function PuzzleTile({
  tile,
  index,
  imageSrc,
  onActivate,
}: {
  tile: Tile;
  index: number;
  imageSrc: string;
  onActivate: (index: number) => void;
}) {
  if (tile === null) {
    return <div className="aspect-square" aria-hidden />;
  }

  const { x, y } = tileBackgroundPosition(tile);
  const row = Math.floor(index / 4) + 1;
  const col = (index % 4) + 1;

  return (
    <button
      type="button"
      onClick={() => onActivate(index)}
      aria-label={`Tile ${tile} at row ${row}, column ${col}`}
      className={cn(
        "aspect-square rounded-button overflow-hidden",
        "border border-border bg-surface-warm",
        "transition-transform duration-150 ease-[var(--ease-out-puzzle)]",
        "motion-reduce:transition-none",
        "hover:scale-[0.97] active:scale-[0.93]",
        "motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
      )}
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "400% 400%",
        backgroundPosition: `${x} ${y}`,
      }}
    />
  );
}
