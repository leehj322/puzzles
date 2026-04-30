import { useTranslations } from "next-intl";

import { Link } from "@/shared/i18n/navigation";
import { cn } from "@/shared/lib/cn";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";

import type { PuzzleType } from "@puzzles/core";

export function PuzzleTypeCard({ type }: { type: PuzzleType }) {
  const t = useTranslations();
  const tCommon = useTranslations("common");

  const content = (
    <Card
      className={cn(
        "h-full p-6 flex flex-col gap-3 transition-transform duration-200 ease-[var(--ease-out-puzzle)]",
        "motion-reduce:transition-none",
        type.available
          ? "hover:scale-[1.02] hover:border-border-strong cursor-pointer"
          : "opacity-60",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-sans text-h4">{t(type.nameKey)}</h3>
        {!type.available && <Badge tone="muted">{tCommon("comingSoon")}</Badge>}
      </div>
      <p className="font-sans text-small text-fg-muted">{t(type.descKey)}</p>
    </Card>
  );

  if (!type.available) {
    return (
      <div aria-disabled className="block">
        {content}
      </div>
    );
  }

  return (
    <Link href={`/puzzles/${type.id}`} className="block focus-visible:outline-none">
      {content}
    </Link>
  );
}
