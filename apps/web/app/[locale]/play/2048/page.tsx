import { setRequestLocale } from "next-intl/server";

import { PuzzlePlayView } from "@/pages/puzzle-play";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PuzzlePlayView puzzleType="2048" />;
}
