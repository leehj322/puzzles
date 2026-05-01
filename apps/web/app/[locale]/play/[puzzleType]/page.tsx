import { setRequestLocale } from "next-intl/server";

import { notFound } from "next/navigation";

import { getPuzzleType, type PuzzleType } from "@puzzles/core";

import { Game2048PlayView } from "@/pages/puzzle-play-2048";

const renderStandalone = (type: PuzzleType) => {
  switch (type.id) {
    case "2048":
      return <Game2048PlayView />;
    case "sliding":
    case "sudoku":
    case "nonogram":
    case "minesweeper":
      // hasEntries === true for all these (or unavailable) → blocked above.
      // Exhaustive branch for type safety.
      notFound();
  }
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; puzzleType: string }>;
}) {
  const { locale, puzzleType } = await params;
  setRequestLocale(locale);

  const type = getPuzzleType(puzzleType);
  if (!type || type.hasEntries) notFound();

  return renderStandalone(type);
}
