"use client";

import { useTranslations } from "next-intl";
import { useCallback, useRef } from "react";

import Image from "next/image";

import { useKeyboard } from "../lib/use-keyboard";
import { useSwipe } from "../lib/use-swipe";
import { useSlidingStore } from "../model/sliding-store";

import { SlidingTile } from "./tile";

export function SlidingBoard({
  imageSrc,
  imageAlt,
  preview,
}: {
  imageSrc: string;
  imageAlt: string;
  preview: boolean;
}) {
  const t = useTranslations("puzzlePlay");
  const board = useSlidingStore((s) => s.board);
  const moveTile = useSlidingStore((s) => s.moveTile);
  const moveDirection = useSlidingStore((s) => s.moveDirection);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDirection = useCallback(
    (dir: Parameters<typeof moveDirection>[0]) => moveDirection(dir),
    [moveDirection],
  );

  useKeyboard(handleDirection);
  useSwipe(containerRef, handleDirection);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[min(90vw,480px)] aspect-square select-none touch-pan-y"
    >
      <div
        role="grid"
        aria-label={t("preview") + ": " + imageAlt}
        className="grid gap-1 p-1 bg-fg/5 dark:bg-fg/10 rounded-card"
        style={{
          gridTemplateColumns: `repeat(${board.size}, minmax(0, 1fr))`,
        }}
      >
        {board.tiles.map((tile, index) => (
          <SlidingTile
            key={index}
            tile={tile}
            index={index}
            size={board.size}
            imageSrc={imageSrc}
            onActivate={moveTile}
          />
        ))}
      </div>
      {preview && (
        <div className="absolute inset-0 rounded-card overflow-hidden border border-border">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 530px) 90vw, 480px"
            className="object-cover"
            unoptimized
          />
        </div>
      )}
    </div>
  );
}
