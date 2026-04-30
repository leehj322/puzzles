import { notFound } from "next/navigation";

import { getPuzzleImage } from "@puzzles/core";

import { PuzzlePlayClient } from "./puzzle-play-client";

export function PuzzlePlayView({
  puzzleType,
  imageId,
}: {
  puzzleType: string;
  imageId: string;
}) {
  const image = getPuzzleImage(puzzleType, imageId);
  if (!image) {
    notFound();
  }

  return <PuzzlePlayClient puzzleType={puzzleType} image={image} />;
}
