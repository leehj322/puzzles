import { setRequestLocale } from "next-intl/server";

import { PuzzlePlayView } from "@/pages/puzzle-play";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; puzzleType: string; id: string }>;
}) {
  const { locale, puzzleType, id } = await params;
  setRequestLocale(locale);
  return <PuzzlePlayView puzzleType={puzzleType} imageId={id} />;
}
