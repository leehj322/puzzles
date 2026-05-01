"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/shared/lib/cn";

import { useNonogramStore } from "../model/nonogram-store";

export function NonogramPad() {
  const t = useTranslations("nonogram.pad");
  const tool = useNonogramStore((s) => s.tool);
  const setTool = useNonogramStore((s) => s.setTool);

  return (
    <div className="flex justify-center gap-2">
      <button
        type="button"
        aria-pressed={tool === "fill"}
        onClick={() => setTool("fill")}
        className={cn(
          "h-10 px-5 min-w-24 rounded-button border-2 font-sans text-small font-semibold transition-colors",
          tool === "fill"
            ? "bg-fg text-bg border-fg"
            : "bg-surface text-fg border-border hover:border-fg/60",
        )}
      >
        {t("fill")}
      </button>
      <button
        type="button"
        aria-pressed={tool === "mark"}
        onClick={() => setTool("mark")}
        className={cn(
          "h-10 px-5 min-w-24 rounded-button border-2 font-sans text-small font-semibold transition-colors",
          tool === "mark"
            ? "bg-accent text-accent-fg border-accent"
            : "bg-surface text-fg border-border hover:border-accent",
        )}
      >
        {t("mark")}
      </button>
    </div>
  );
}
