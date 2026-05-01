import { setRequestLocale } from "next-intl/server";

import { PuzzleListView } from "@/pages/puzzle-list";

import { redirect } from "@/shared/i18n/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; puzzleType: string }>;
}) {
  const { locale, puzzleType } = await params;
  setRequestLocale(locale);

  if (puzzleType === "2048") {
    redirect({ href: "/play/2048", locale });
  }

  return <PuzzleListView puzzleType={puzzleType} />;
}
