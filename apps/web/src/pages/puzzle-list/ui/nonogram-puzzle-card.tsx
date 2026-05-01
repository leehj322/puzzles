import { type NonogramPuzzle } from "@puzzles/core";

import { Link } from "@/shared/i18n/navigation";
import { Badge } from "@/shared/ui/badge";

export function NonogramPuzzleCard({ puzzle }: { puzzle: NonogramPuzzle }) {
  return (
    <Link
      href={`/play/nonogram/${puzzle.id}`}
      className="group block focus-visible:outline-none"
    >
      <div className="bg-surface border border-border rounded-card shadow-sm overflow-hidden transition-[transform,box-shadow] duration-200 ease-(--ease-bounce) motion-reduce:transition-none group-hover:scale-[1.02] group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:border-border-strong motion-reduce:group-hover:scale-100 motion-reduce:group-hover:translate-y-0">
        <div className="relative aspect-square bg-surface-warm flex items-center justify-center px-4 text-center">
          <span className="font-display text-h3 font-semibold text-fg break-keep">
            {puzzle.label}
          </span>
          <span className="absolute right-3 top-3">
            <Badge tone="neutral">{`${puzzle.cols}×${puzzle.rows}`}</Badge>
          </span>
        </div>
      </div>
    </Link>
  );
}
