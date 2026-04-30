import { useTranslations } from "next-intl";

import { notFound } from "next/navigation";

import { getPuzzleImages } from "@puzzles/core";

import { Badge } from "@/shared/ui/badge";

import { PuzzleImageCard } from "./puzzle-image-card";

export function PuzzleListView({ puzzleType }: { puzzleType: string }) {
  const t = useTranslations("puzzleList");
  const images = getPuzzleImages(puzzleType);

  if (!images) {
    notFound();
  }

  return (
    <main className="px-6 pt-6 pb-12 sm:pt-8 sm:pb-16">
      <div className="mx-auto max-w-4xl flex flex-col gap-10">
        <header className="flex flex-col gap-4">
          <div>
            <Badge tone="muted">{t("uploadSoon")}</Badge>
          </div>
          <h1 className="font-sans text-h2">{t("title")}</h1>
        </header>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <li key={image.id}>
              <PuzzleImageCard puzzleType={puzzleType} image={image} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
