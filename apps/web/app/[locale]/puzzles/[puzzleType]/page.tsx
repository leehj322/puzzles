import { setRequestLocale } from "next-intl/server";

import { PuzzleListView } from "@/pages/puzzle-list";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; puzzleType: string }>;
}) {
  const { locale, puzzleType } = await params;
  setRequestLocale(locale);
  return <PuzzleListView puzzleType={puzzleType} />;
}
