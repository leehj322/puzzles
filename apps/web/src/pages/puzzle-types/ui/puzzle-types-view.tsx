import { useTranslations } from "next-intl";

import { PUZZLE_TYPES } from "@puzzles/core";

import { PuzzleTypeCard } from "./puzzle-type-card";

export function PuzzleTypesView() {
  const t = useTranslations("puzzleTypes");

  return (
    <main className="px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-[896px] flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <h1 className="font-sans text-h2">{t("title")}</h1>
          <p className="font-sans text-body text-fg-muted">{t("subtitle")}</p>
        </header>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PUZZLE_TYPES.map((type) => (
            <li key={type.id}>
              <PuzzleTypeCard type={type} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
