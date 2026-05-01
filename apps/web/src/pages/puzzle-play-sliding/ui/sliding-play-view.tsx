"use client";

import { useEffect, useState } from "react";

import { type PuzzleImage } from "@puzzles/core";

import { useSlidingStore } from "../model/sliding-store";

import { SlidingBoard } from "./board";
import { SlidingHud } from "./hud";
import { SlidingWinModal } from "./win-modal";

export function SlidingPlayView({ image }: { image: PuzzleImage }) {
  const init = useSlidingStore((s) => s.init);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    init(image.id, image.size);
  }, [init, image.id, image.size]);

  return (
    <main className="px-4 pt-4 pb-8 sm:pt-6 sm:pb-12">
      <div className="mx-auto flex flex-col items-center gap-6">
        <SlidingHud
          preview={preview}
          onTogglePreview={() => setPreview((p) => !p)}
        />
        <SlidingBoard
          imageSrc={image.src}
          imageAlt={`sliding 퍼즐 ${image.size}×${image.size}`}
          preview={preview}
        />
      </div>
      <SlidingWinModal />
    </main>
  );
}
