"use client";

import { useEffect, useState } from "react";

import { type PuzzleImage } from "@puzzles/core";

import { usePuzzleStore } from "../model/puzzle-store";

import { PuzzleBoard } from "./puzzle-board";
import { PuzzleHud } from "./puzzle-hud";
import { WinModal } from "./win-modal";

export function PuzzlePlayClient({
  puzzleType,
  image,
}: {
  puzzleType: string;
  image: PuzzleImage;
}) {
  const init = usePuzzleStore((s) => s.init);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    init(image.id, image.size);
  }, [init, image.id, image.size]);

  return (
    <main className="px-4 pt-4 pb-8 sm:pt-6 sm:pb-12">
      <div className="mx-auto flex flex-col items-center gap-6">
        <PuzzleHud
          preview={preview}
          onTogglePreview={() => setPreview((p) => !p)}
        />
        <PuzzleBoard
          imageSrc={image.src}
          imageAlt={`${puzzleType} 퍼즐 ${image.size}×${image.size}`}
          preview={preview}
        />
      </div>
      <WinModal puzzleType={puzzleType} />
    </main>
  );
}
