"use client";

import { useTranslations } from "next-intl";
import { useCallback, useRef } from "react";

import Image from "next/image";

import { useKeyboard } from "../lib/use-keyboard";
import { useSwipe } from "../lib/use-swipe";
import { usePuzzleStore } from "../model/puzzle-store";

import { PuzzleTile } from "./puzzle-tile";

export function PuzzleBoard({
  imageSrc,
  imageAlt,
  preview,
}: {
  imageSrc: string;
  imageAlt: string;
  preview: boolean;
}) {
  const t = useTranslations("puzzlePlay");
  const board = usePuzzleStore((s) => s.board);
  const moveTile = usePuzzleStore((s) => s.moveTile);
  const moveDirection = usePuzzleStore((s) => s.moveDirection);
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
        className="grid grid-cols-4 gap-1 p-1 bg-fg/5 dark:bg-fg/10 rounded-card"
      >
        {board.map((tile, index) => (
          <PuzzleTile
            key={index}
            tile={tile}
            index={index}
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
