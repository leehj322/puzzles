"use client";

import { tileBackgroundPosition, type Tile } from "@puzzles/core";

import { cn } from "@/shared/lib/cn";

export function SlidingTile({
  tile,
  index,
  size,
  imageSrc,
  onActivate,
}: {
  tile: Tile;
  index: number;
  size: number;
  imageSrc: string;
  onActivate: (index: number) => void;
}) {
  if (tile === null) {
    return <div className="aspect-square" aria-hidden />;
  }

  const { x, y } = tileBackgroundPosition(tile, size);
  const row = Math.floor(index / size) + 1;
  const col = (index % size) + 1;
  const backgroundSize = `${size * 100}% ${size * 100}%`;

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
        backgroundSize,
        backgroundPosition: `${x} ${y}`,
      }}
    />
  );
}
