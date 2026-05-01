"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";


import { toast } from "@puzzles/toast";

import { Button } from "@/shared/ui/button";

export function AddPuzzleButton() {
  const t = useTranslations("puzzleList");

  return (
    <Button
      size="sm"
      onClick={() => {
        toast.info(t("addPuzzleSoon"));
      }}
    >
      <Plus className="mr-1 h-4 w-4" aria-hidden />
      {t("addPuzzle")}
    </Button>
  );
}
