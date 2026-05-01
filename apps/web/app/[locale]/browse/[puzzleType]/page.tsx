import { setRequestLocale } from "next-intl/server";

import { notFound } from "next/navigation";

import { getPuzzleType } from "@puzzles/core";

import { PuzzleListView } from "@/pages/puzzle-list";

import { redirect } from "@/shared/i18n/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; puzzleType: string }>;
}) {
  const { locale, puzzleType } = await params;
  setRequestLocale(locale);

  const type = getPuzzleType(puzzleType);
  if (!type) notFound();

  if (!type.hasEntries) {
    redirect({ href: `/play/${type.id}`, locale });
  }

  return <PuzzleListView puzzleType={type.id} />;
}
